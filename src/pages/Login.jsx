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
  const [captchaEmojiTarget, setCaptchaEmojiTarget] = useState(null);
  const [captchaEmojiSelected, setCaptchaEmojiSelected] = useState(null);
  const [captchaEmojiGrid, setCaptchaEmojiGrid] = useState([]);
  const navigate = useNavigate();

  const EMOJI_DB = [
    { icon: '🚗', name: 'Car' },
    { icon: '🍎', name: 'Apple' },
    { icon: '🐱', name: 'Cat' },
    { icon: '🔒', name: 'Lock' },
    { icon: '✈️', name: 'Airplane' },
    { icon: '⚽', name: 'Soccer Ball' },
    { icon: '🎸', name: 'Guitar' },
    { icon: '🚀', name: 'Rocket' }
  ];

  const generateCaptcha = () => {
    const shuffled = [...EMOJI_DB].sort(() => 0.5 - Math.random());
    const selectedGrid = shuffled.slice(0, 4);
    setCaptchaEmojiGrid(selectedGrid);
    setCaptchaEmojiTarget(selectedGrid[Math.floor(Math.random() * 4)]);
    setCaptchaEmojiSelected(null);
  };

  useEffect(() => {
    generateCaptcha();
    setError(''); // Clear any errors when switching tabs
  }, [role]);

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

    // 🛡️ SECURITY FIX 4: Image CAPTCHA Verification
    if (!captchaEmojiTarget || captchaEmojiSelected !== captchaEmojiTarget.name) {
      setError('Incorrect image selected. Please try again.');
      generateCaptcha();
      setAttempts(prev => prev + 1);
      return;
    }

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
      generateCaptcha();
      return;
    }

    const { user: sbUser } = data;
    
    // Check role from user metadata
    const userRole = sbUser.user_metadata?.role || 'employee';
    const fullName = sbUser.user_metadata?.full_name || sbUser.email.split('@')[0];

    // ROLE PROTECTION: 
    // If the user selected 'Admin' tab but their account is 'employee', block them.
    // If the user selected 'Employee' tab but their account is 'admin', block them.
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
    <div className={`login-page ${role}-mode`}>
      <div className="login-card fade-in visible">
        <div className="login-header">
          <div className="login-animation">
            <img 
              src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f512/512.gif" 
              alt="🔒" 
              className="lock-gif" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.insertAdjacentHTML('afterend', '<span style="font-size: 2.5rem;">🔒</span>');
              }}
            />
          </div>
          <h1>{role === 'admin' ? 'Admin' : 'Employee'} Login</h1>
          <p className="login-sub">Secure authentication for Varsaka Labs Team</p>
        </div>

        <div className="login-tabs">
          <button className={role === 'employee' ? 'active' : ''} onClick={() => setRole('employee')}>Employee</button>
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
          <div className="login-group">
            <label>Security Check: Select the {captchaEmojiTarget?.name}</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              {captchaEmojiGrid.map(item => (
                <div 
                  key={item.name} 
                  onClick={() => setCaptchaEmojiSelected(item.name)}
                  style={{ 
                    fontSize: '1.8rem', 
                    flex: 1,
                    textAlign: 'center',
                    padding: '8px', 
                    border: captchaEmojiSelected === item.name ? '2px solid #2563eb' : '2px solid #e2e8f0',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: captchaEmojiSelected === item.name ? '#eff6ff' : '#f8fafc',
                    transition: 'all 0.2s',
                    userSelect: 'none'
                  }}
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </div>
          
          <button type="submit" className="login-btn" disabled={isLocked}>
            {isLocked ? 'Access Locked' : <>{'Secure Login'} <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i></>}
          </button>
        </form>

        <div className="login-footer">
          <p>🛡️ End-to-End Encrypted Session</p>
          <span>Authorized Personnel Only</span>
          <div className="login-home-link">
            <button onClick={() => navigate('/')} className="btn-home-back">🏠 Back to Website</button>
          </div>
        </div>
      </div>
    </div>
  );
}
