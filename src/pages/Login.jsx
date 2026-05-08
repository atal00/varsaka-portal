import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { supabase } from '../supabaseClient';
import './Login.css';

export default function Login() {
  const [role, setRole] = useState('employee');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (sessionStorage.getItem('varsaka_user')) navigate('/portal');
  }, [navigate]);

  useEffect(() => {
    if (attempts >= 3) {
      setIsLocked(true);
      setError('Too many failed attempts. Locked for 30 seconds.');
      const timer = setTimeout(() => {
        setIsLocked(false);
        setAttempts(0);
        setError('');
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [attempts]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLocked) return;
    setError('');

    // In Supabase, we use email for login. 
    // If the user enters 'atal', we can assume 'atal@varsaka.com' or just require email.
    // For now, let's assume they enter their email.
    const loginEmail = user.includes('@') ? user.trim() : `${user.trim()}@varsaka.com`;

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: pass.trim(),
    });

    if (authError) {
      setError(authError.message);
      setAttempts(prev => prev + 1);
      return;
    }

    const { user: sbUser } = data;
    
    // Check role from user metadata
    const userRole = sbUser.user_metadata?.role || 'employee';
    const fullName = sbUser.user_metadata?.full_name || sbUser.email.split('@')[0];

    // ROLE PROTECTION: 
    // If the user selected 'Admin' tab but their account is 'employee', block them.
    // If the user selected 'Staff' tab but their account is 'admin', block them.
    if (role === 'admin' && userRole !== 'admin') {
      await supabase.auth.signOut();
      setError('This account does not have Admin privileges.');
      return;
    }
    if (role === 'employee' && userRole === 'admin') {
      await supabase.auth.signOut();
      setError('Admins must log in through the Admin tab.');
      return;
    }

    sessionStorage.setItem('varsaka_user', JSON.stringify({ 
      name: fullName, 
      role: userRole, 
      id: sbUser.id 
    }));

    // Log activity (Optional: Move this to Supabase later)
    const logs = JSON.parse(localStorage.getItem('varsaka_activity') || '[]');
    logs.push({ id: sbUser.id, name: fullName, type: 'login', time: Date.now() });
    localStorage.setItem('varsaka_activity', JSON.stringify(logs.slice(-500)));

    navigate('/portal');
  };

  return (
    <div className="login-page">
      <div className="login-card fade-in visible">
        <div className="login-header">
          <img src={logo} alt="Varsaka" className="login-logo" />
          <h1>Portal Access</h1>
          <p className="login-sub">Secure authentication for Varsaka Labs Team</p>
        </div>

        <div className="login-tabs">
          <button className={role === 'employee' ? 'active' : ''} onClick={() => setRole('employee')}>Staff</button>
          <button className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}>Admin</button>
        </div>

        {error && <div className="login-error">⚠️ {error}</div>}

        <form onSubmit={handleLogin}>
          <div className="login-group">
            <label>Username</label>
            <div className="input-wrap">
              <span className="input-icon">👤</span>
              <input 
                type="text" 
                placeholder="Enter your ID" 
                value={user} 
                onChange={e => setUser(e.target.value)} 
                required 
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="login-group">
            <label>Password</label>
            <div className="input-wrap">
              <span className="input-icon">🔒</span>
              <input 
                type={showPass ? "text" : "password"} 
                placeholder="••••••••" 
                value={pass} 
                onChange={e => setPass(e.target.value)} 
                required 
                autoComplete="off"
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? '👁️' : '🕶️'}
              </button>
            </div>
          </div>
          <button type="submit" className="login-btn" disabled={isLocked}>
            {isLocked ? 'Access Locked' : 'Secure Login →'}
          </button>
        </form>

        <div className="login-footer">
          <p>🛡️ End-to-End Encrypted Session</p>
          <span>Authorized Personnel Only</span>
          <div className="login-home-link">
            <button onClick={() => navigate('/')} className="btn-home-back">← Back to Website</button>
          </div>
        </div>
      </div>
    </div>
  );
}
