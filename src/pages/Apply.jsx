import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Apply.css';
import { sanitize, validateEmail } from '../utils/security';

const GS_APPLY_TARGET = import.meta.env.VITE_GS_APPLY_URL;

function useFadeIn() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    const timer = setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    }, 100);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);
}

export default function Apply() {
  useFadeIn();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') || 'General Application';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    role: initialRole,
    experience: 'Fresher',
    linkedin: '',
    notice: 'Immediate',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [btnTxt, setBtnTxt] = useState(<>{'Submit Application'} <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i></>);
  const [btnColor, setBtnColor] = useState('');

  // Math CAPTCHA
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, op: '+' });
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const generateCaptcha = () => {
    const ops = ['+', '-'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 90) + 10;
    let b = Math.floor(Math.random() * 90) + 10;
    
    if (op === '-' && b > a) [a, b] = [b, a];

    setCaptcha({ a, b, op });
    setUserCaptcha('');
    setCaptchaError(false);
  };

  useEffect(() => { generateCaptcha(); }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check Captcha
    const expected = captcha.op === '+' ? (captcha.a + captcha.b) : (captcha.a - captcha.b);
    if (parseInt(userCaptcha) !== expected) {
      setCaptchaError(true);
      generateCaptcha();
      setCaptchaError(true); 
      return;
    }

    setSubmitting(true);
    setBtnTxt('Uploading Application...');

    try {
      // 🛡️ Data Sanitization
      const cleanData = {
        name: sanitize(formState.name),
        email: sanitize(formState.email),
        phone: sanitize(formState.phone),
        role: formState.role,
        experience: formState.experience,
        linkedin: sanitize(formState.linkedin),
        notice: formState.notice,
        message: sanitize(formState.message),
        timestamp: new Date().toLocaleString()
      };

      if (!validateEmail(cleanData.email)) {
        setBtnTxt('❌ Invalid Email');
        setSubmitting(false);
        return;
      }

      // 🚀 Sync ONLY to the dedicated Careers Google Sheet
      if (GS_APPLY_TARGET) {
        await fetch(GS_APPLY_TARGET, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cleanData)
        });
      }

      // 2. Success UI
      setBtnTxt('Application Received! 🎉');
      setBtnColor('#22c55e');
      setTimeout(() => {
        navigate('/careers');
      }, 3000);

    } catch (err) {
      console.error(err);
      setBtnTxt('Error! Please Try Again');
      setBtnColor('#ef4444');
      setSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <section className="apply-section">
        <div className="apply-container">
          
          <div className="apply-header fade-in">
            <div className="section-tag">📝 Join the Team</div>
            <h1 className="apply-title">Application Form</h1>
            <p className="apply-sub">Applying for: <span className="apply-role-highlight">{formState.role}</span></p>
          </div>

          <div className="apply-form-card fade-in">
            <form onSubmit={handleSubmit}>
              <div className="apply-form-grid">
                
                <div className="form-group">
                  <label>Full Name <span className="req">*</span></label>
                  <input type="text" name="name" placeholder="e.g. Rahul Sharma" required value={formState.name} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Email Address <span className="req">*</span></label>
                  <input type="email" name="email" placeholder="rahul@example.com" required value={formState.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Phone Number <span className="req">*</span></label>
                  <input type="tel" name="phone" placeholder="e.g. +91 98765 43210" required value={formState.phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Role <span className="req">*</span></label>
                  <select name="role" value={formState.role} onChange={handleChange}>
                    <option>Senior QA Automation Engineer</option>
                    <option>Performance Test Engineer</option>
                    <option>HR Generalist / Talent Acquisition</option>
                    <option>QA Engineer - Manual & Exploratory</option>
                    <option>General Application</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Experience Level</label>
                  <select name="experience" value={formState.experience} onChange={handleChange}>
                    <option>Fresher</option>
                    <option>1-2 Years</option>
                    <option>3-5 Years</option>
                    <option>5+ Years</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Notice Period</label>
                  <select name="notice" value={formState.notice} onChange={handleChange}>
                    <option>Immediate</option>
                    <option>15 Days</option>
                    <option>30 Days</option>
                    <option>60+ Days</option>
                  </select>
                </div>

              </div>

              <div className="form-group" style={{marginTop: '1.2rem'}}>
                <label>LinkedIn / Portfolio / Resume Link <span className="req">*</span></label>
                <input type="url" name="linkedin" placeholder="https://linkedin.com/in/username" required value={formState.linkedin} onChange={handleChange} />
              </div>

              <div className="form-group" style={{marginTop: '1.2rem'}}>
                <label>Why do you want to join Varsaka Labs?</label>
                <textarea name="message" placeholder="Briefly tell us about your background and interest..." value={formState.message} onChange={handleChange} />
              </div>

              {/* 🛡️ Math CAPTCHA */}
              <div className="form-group captcha-group" style={{marginTop: '1.5rem'}}>
                <label>Quick Security Check 🛡️</label>
                <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                  <div style={{padding:'0.75rem 1.1rem', background:'var(--blue-light)', border:'1.5px solid var(--blue-pale)', borderRadius:'10px', fontWeight:'800', color:'var(--blue-mid)', fontSize:'1rem', minWidth:'110px', textAlign:'center'}}>
                    {captcha.a} {captcha.op} {captcha.b} =
                  </div>
                  <input type="number" placeholder="?" value={userCaptcha} onChange={e => { setUserCaptcha(e.target.value); setCaptchaError(false); }} style={{width:'80px', borderColor: captchaError ? '#ef4444' : 'var(--border)'}} required />
                  <button type="button" onClick={generateCaptcha} style={{background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:'8px', color:'var(--text-muted)', cursor:'pointer', fontSize:'1.1rem', padding:'0.55rem 0.7rem'}} title="New question">↻</button>
                </div>
                {captchaError && <p style={{color:'#ef4444', fontSize:'0.75rem', marginTop:'6px'}}>❌ Incorrect. Please try again.</p>}
              </div>

              <button type="submit" className="submit-btn" disabled={submitting} style={btnColor ? {background:btnColor} : {}}>
                {btnTxt}
              </button>
              
              <p className="form-privacy-note">🔒 Your data is secure and will only be used for recruitment purposes.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
