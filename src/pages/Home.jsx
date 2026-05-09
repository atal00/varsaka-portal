import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';
import './Home.css';

const ALL_COUNTRIES = [
  { name: 'Afghanistan', code: '+93', flag: '🇦🇫' }, { name: 'Albania', code: '+355', flag: '🇦🇱' }, { name: 'Algeria', code: '+213', flag: '🇩🇿' },
  { name: 'Andorra', code: '+376', flag: '🇦🇩' }, { name: 'Angola', code: '+244', flag: '🇦🇴' }, { name: 'Argentina', code: '+54', flag: '🇦🇷' },
  { name: 'Armenia', code: '+374', flag: '🇦🇲' }, { name: 'Australia', code: '+61', flag: '🇦🇺' }, { name: 'Austria', code: '+43', flag: '🇦🇹' },
  { name: 'Azerbaijan', code: '+994', flag: '🇦🇿' }, { name: 'Bahamas', code: '+1', flag: '🇧🇸' }, { name: 'Bahrain', code: '+973', flag: '🇧🇭' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩' }, { name: 'Barbados', code: '+1', flag: '🇧🇧' }, { name: 'Belarus', code: '+375', flag: '🇧🇾' },
  { name: 'Belgium', code: '+32', flag: '🇧🇪' }, { name: 'Belize', code: '+501', flag: '🇧🇿' }, { name: 'Benin', code: '+229', flag: '🇧🇯' },
  { name: 'Bhutan', code: '+975', flag: '🇧🇹' }, { name: 'Bolivia', code: '+591', flag: '🇧🇴' }, { name: 'Bosnia', code: '+387', flag: '🇧🇦' },
  { name: 'Botswana', code: '+267', flag: '🇧🇼' }, { name: 'Brazil', code: '+55', flag: '🇧🇷' }, { name: 'Brunei', code: '+673', flag: '🇧🇳' },
  { name: 'Bulgaria', code: '+359', flag: '🇧🇬' }, { name: 'Burkina Faso', code: '+226', flag: '🇧🇫' }, { name: 'Burundi', code: '+257', flag: '🇧🇮' },
  { name: 'Cambodia', code: '+855', flag: '🇰🇭' }, { name: 'Cameroon', code: '+237', flag: '🇨🇲' }, { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Cape Verde', code: '+238', flag: '🇨🇻' }, { name: 'Central African Republic', code: '+236', flag: '🇨🇫' }, { name: 'Chad', code: '+235', flag: '🇹🇩' },
  { name: 'Chile', code: '+56', flag: '🇨🇱' }, { name: 'China', code: '+86', flag: '🇨🇳' }, { name: 'Colombia', code: '+57', flag: '🇨🇴' },
  { name: 'Comoros', code: '+269', flag: '🇰🇲' }, { name: 'Congo', code: '+242', flag: '🇨🇬' }, { name: 'Costa Rica', code: '+506', flag: '🇨🇷' },
  { name: 'Croatia', code: '+385', flag: '🇭🇷' }, { name: 'Cuba', code: '+53', flag: '🇨🇺' }, { name: 'Cyprus', code: '+357', flag: '🇨🇾' },
  { name: 'Czech Republic', code: '+420', flag: '🇨🇿' }, { name: 'Denmark', code: '+45', flag: '🇩🇰' }, { name: 'Djibouti', code: '+253', flag: '🇩🇯' },
  { name: 'Dominica', code: '+1', flag: '🇩🇲' }, { name: 'Dominican Republic', code: '+1', flag: '🇩🇴' }, { name: 'Ecuador', code: '+593', flag: '🇪🇨' },
  { name: 'Egypt', code: '+20', flag: '🇪🇬' }, { name: 'El Salvador', code: '+503', flag: '🇸🇻' }, { name: 'Equatorial Guinea', code: '+240', flag: '🇬🇶' },
  { name: 'Eritrea', code: '+291', flag: '🇪🇷' }, { name: 'Estonia', code: '+372', flag: '🇪🇪' }, { name: 'Ethiopia', code: '+251', flag: '🇪🇹' },
  { name: 'Fiji', code: '+679', flag: '🇫🇯' }, { name: 'Finland', code: '+358', flag: '🇫🇮' }, { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Gabon', code: '+241', flag: '🇬🇦' }, { name: 'Gambia', code: '+220', flag: '🇬🇲' }, { name: 'Georgia', code: '+995', flag: '🇬🇪' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' }, { name: 'Ghana', code: '+233', flag: '🇬🇭' }, { name: 'Greece', code: '+30', flag: '🇬🇷' },
  { name: 'Grenada', code: '+1', flag: '🇬🇩' }, { name: 'Guatemala', code: '+502', flag: '🇬🇹' }, { name: 'Guinea', code: '+224', flag: '🇬🇳' },
  { name: 'Guyana', code: '+592', flag: '🇬🇾' }, { name: 'Haiti', code: '+509', flag: '🇭🇹' }, { name: 'Honduras', code: '+504', flag: '🇭🇳' },
  { name: 'Hong Kong', code: '+852', flag: '🇭🇰' }, { name: 'Hungary', code: '+36', flag: '🇭🇺' }, { name: 'Iceland', code: '+354', flag: '🇮🇸' },
  { name: 'India', code: '+91', flag: '🇮🇳' }, { name: 'Indonesia', code: '+62', flag: '🇮🇩' }, { name: 'Iran', code: '+98', flag: '🇮🇷' },
  { name: 'Iraq', code: '+964', flag: '🇮🇶' }, { name: 'Ireland', code: '+353', flag: '🇮🇪' }, { name: 'Israel', code: '+972', flag: '🇮🇱' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' }, { name: 'Jamaica', code: '+1', flag: '🇯🇲' }, { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'Jordan', code: '+962', flag: '🇯🇴' }, { name: 'Kazakhstan', code: '+7', flag: '🇰🇿' }, { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'Kiribati', code: '+686', flag: '🇰🇮' }, { name: 'Kuwait', code: '+965', flag: '🇰🇼' }, { name: 'Kyrgyzstan', code: '+996', flag: '🇰🇬' },
  { name: 'Laos', code: '+856', flag: '🇱🇦' }, { name: 'Latvia', code: '+371', flag: '🇱🇻' }, { name: 'Lebanon', code: '+961', flag: '🇱🇧' },
  { name: 'Lesotho', code: '+266', flag: '🇱🇸' }, { name: 'Liberia', code: '+231', flag: '🇱🇷' }, { name: 'Libya', code: '+218', flag: '🇱🇾' },
  { name: 'Liechtenstein', code: '+423', flag: '🇱🇮' }, { name: 'Lithuania', code: '+370', flag: '🇱🇹' }, { name: 'Luxembourg', code: '+352', flag: '🇱🇺' },
  { name: 'Macao', code: '+853', flag: '🇲🇴' }, { name: 'Macedonia', code: '+389', flag: '🇲🇰' }, { name: 'Madagascar', code: '+261', flag: '🇲🇬' },
  { name: 'Malawi', code: '+265', flag: '🇲🇼' }, { name: 'Malaysia', code: '+60', flag: '🇲🇾' }, { name: 'Maldives', code: '+960', flag: '🇲🇻' },
  { name: 'Mali', code: '+223', flag: '🇲🇱' }, { name: 'Malta', code: '+356', flag: '🇲🇹' }, { name: 'Mauritania', code: '+222', flag: '🇲🇷' },
  { name: 'Mauritius', code: '+230', flag: '🇲🇺' }, { name: 'Mexico', code: '+52', flag: '🇲🇽' }, { name: 'Moldova', code: '+373', flag: '🇲🇩' },
  { name: 'Monaco', code: '+377', flag: '🇲🇨' }, { name: 'Mongolia', code: '+976', flag: '🇲🇳' }, { name: 'Montenegro', code: '+382', flag: '🇲🇪' },
  { name: 'Morocco', code: '+212', flag: '🇲🇦' }, { name: 'Mozambique', code: '+258', flag: '🇲🇿' }, { name: 'Myanmar', code: '+95', flag: '🇲🇲' },
  { name: 'Namibia', code: '+264', flag: '🇳🇦' }, { name: 'Nepal', code: '+977', flag: '🇳🇵' }, { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿' }, { name: 'Nicaragua', code: '+505', flag: '🇳🇮' }, { name: 'Niger', code: '+227', flag: '🇳🇪' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' }, { name: 'Norway', code: '+47', flag: '🇳🇴' }, { name: 'Oman', code: '+968', flag: '🇴🇲' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰' }, { name: 'Panama', code: '+507', flag: '🇵🇦' }, { name: 'Paraguay', code: '+595', flag: '🇵🇾' },
  { name: 'Peru', code: '+51', flag: '🇵🇪' }, { name: 'Philippines', code: '+63', flag: '🇵🇭' }, { name: 'Poland', code: '+48', flag: '🇵🇱' },
  { name: 'Portugal', code: '+351', flag: '🇵🇹' }, { name: 'Qatar', code: '+974', flag: '🇶🇦' }, { name: 'Romania', code: '+40', flag: '🇷🇴' },
  { name: 'Russia', code: '+7', flag: '🇷🇺' }, { name: 'Rwanda', code: '+250', flag: '🇷🇼' }, { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'Senegal', code: '+221', flag: '🇸🇳' }, { name: 'Serbia', code: '+381', flag: '🇷🇸' }, { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'Slovakia', code: '+421', flag: '🇸🇰' }, { name: 'Slovenia', code: '+386', flag: '🇸🇮' }, { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' }, { name: 'Spain', code: '+34', flag: '🇪🇸' }, { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
  { name: 'Sudan', code: '+249', flag: '🇸🇩' }, { name: 'Sweden', code: '+46', flag: '🇸🇪' }, { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { name: 'Taiwan', code: '+886', flag: '🇹🇼' }, { name: 'Tanzania', code: '+255', flag: '🇹🇿' }, { name: 'Thailand', code: '+66', flag: '🇹🇭' },
  { name: 'Tunisia', code: '+216', flag: '🇹🇳' }, { name: 'Turkey', code: '+90', flag: '🇹🇷' }, { name: 'Uganda', code: '+256', flag: '🇺🇬' },
  { name: 'Ukraine', code: '+380', flag: '🇺🇦' }, { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' }, { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'United States', code: '+1', flag: '🇺🇸' }, { name: 'Uruguay', code: '+598', flag: '🇺🇾' }, { name: 'Uzbekistan', code: '+998', flag: '🇺🇿' },
  { name: 'Venezuela', code: '+58', flag: '🇻🇪' }, { name: 'Vietnam', code: '+84', flag: '🇻🇳' }, { name: 'Yemen', code: '+967', flag: '🇾🇪' },
  { name: 'Zambia', code: '+260', flag: '🇿🇲' }, { name: 'Zimbabwe', code: '+263', flag: '🇿🇼' }
];

const FS_TARGET = import.meta.env.VITE_FORMSUBMIT_URL;
const GS_TARGET = import.meta.env.VITE_GS_SYNC_URL;

function useFadeIn() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 90);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const TOOLS = ['🔵 Selenium','⚫ Playwright','🟢 Cypress','🔴 JMeter','🟡 Postman','🟣 Appium','🔵 JIRA','⚫ Jenkins','🟢 GitHub Actions','🔴 Burp Suite','🟡 k6','🟣 TestRail'];

export default function Home() {
  useFadeIn();

  // 🛡️ Smooth Scroll Guardian (Fixes cross-page #hash links)
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const [formState, setFormState] = useState({ 
    name: '', email: '', phone: '', countryCode: '+91', service: 'Functional Testing', message: '' 
  });
  const [btnTxt, setBtnTxt] = useState('Send Message →');
  const [btnColor, setBtnColor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryList, setShowCountryList] = useState(false);

  // CAPTCHA System
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, op: '+' });
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const generateCaptcha = () => {
    const ops = ['+', '-'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 90) + 10;
    let b = Math.floor(Math.random() * 90) + 10;
    
    // Ensure subtraction doesn't result in negative numbers for better UX
    if (op === '-' && b > a) {
      [a, b] = [b, a]; 
    }

    setCaptcha({ a, b, op });
    setUserCaptcha('');
    setCaptchaError(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const [faqOpen, setFaqOpen] = useState(null);
  const faqs = [
    { q: 'How long does it take to start a project?', a: 'We can typically onboard and begin work within 3-5 business days after the initial consultation and agreement signing. We prioritize fast turnarounds without compromising on quality.' },
    { q: 'Do you provide daily test reports?', a: 'Yes! Transparency is one of our core values. We provide daily status reports, and you will have real-time access to our live testing dashboards and bug tracking systems.' },
    { q: 'Can you work with our existing tools (Jira, GitHub, etc.)?', a: 'Absolutely. We seamlessly integrate into your existing CI/CD pipelines and use your preferred project management tools. We adapt to your workflow, not the other way around.' },
  ];

  const handleChange = e => setFormState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    // 🛡️ BOT CHECK 0: Rate Limit (1 submission every 30 seconds)
    const lastSub = localStorage.getItem('varsaka_last_sub');
    const now = Date.now();
    if (lastSub && (now - parseInt(lastSub)) < 30000) {
      setBtnTxt('🛡️ Please wait 30s');
      setTimeout(() => setBtnTxt('Send Message →'), 2000);
      return;
    }

    // 🛡️ BOT CHECK 1: Honeypot
    if (e.target._honey.value) return; 

    // 🛡️ BOT CHECK 2: Hardened Math CAPTCHA
    const expected = captcha.op === '+' ? (captcha.a + captcha.b) : (captcha.a - captcha.b);
    if (parseInt(userCaptcha) !== expected) {
      setCaptchaError(true);
      setBtnTxt('❌ Incorrect Math!');
      setTimeout(() => {
        setBtnTxt('Send Message →');
        setCaptchaError(false);
      }, 2000);
      return;
    }

    setSubmitting(true);
    setBtnTxt('Sending...');
    setBtnColor('');
    try {
      // 1. Send Email Notification
      await fetch(FS_TARGET, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formState)
      });

      // 2. Save to Supabase Secure Database
      const { error: sbError } = await supabase
        .from('leads')
        .insert([{
          name: formState.name,
          email: formState.email,
          phone: `${formState.countryCode} ${formState.phone}`,
          service: formState.service,
          message: formState.message,
          source: 'Website' // 🌐 Source Tag
        }]);

      if (sbError) throw sbError;
      
      // 🛡️ Log submission time for security
      localStorage.setItem('varsaka_last_sub', Date.now().toString());

      // 3. Sync to Google Sheet (Live Mirror)
      const gsUrl = import.meta.env.VITE_GS_SYNC_URL;
      if (gsUrl) {
        fetch(gsUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({ action: 'add', ...formState })
        }).catch(err => console.error('GS Sync Error:', err));
      }


      setBtnTxt("✅ Message Sent! We'll reply soon 😊"); 
      setBtnColor('#16a34a');
      setTimeout(() => { 
        setBtnTxt('Send Message →'); 
        setBtnColor(''); 
        setSubmitting(false); 
        setFormState({ name:'', email:'', phone:'', countryCode: '+91', service:'Functional Testing', message:'' }); 
        generateCaptcha(); // Reset CAPTCHA for next use
      }, 3500);
    } catch (err) {
      console.error('Submit Error:', err);
      setBtnTxt('❌ Error sending. Try again.'); 
      setBtnColor('#dc2626');
      setTimeout(() => { 
        setBtnTxt('Send Message →'); 
        setBtnColor(''); 
        setSubmitting(false); 
      }, 3500);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="blob blob1" /><div className="blob blob2" /><div className="blob blob3" />
        <div className="hero-dots" />
        <div className="hero-badge"><div className="badge-dot" />🏆 India's Trusted QA Partner</div>
        <h1>Varsaka Labs <span className="h1-blue h1-underline">Precision</span> in Testing<br />Excellence in Development</h1>
        <p className="hero-sub">Varsaka Labs delivers friendly, thorough software testing - functional, automation, performance, security and AI-powered - so your team ships with total confidence.</p>
        <div className="hero-btns">
          <a href="#contact" className="btn-primary">Start Free Consultation 🚀</a>
          <a href="#services" className="btn-ghost">See All Services ↓</a>
        </div>
        <div className="hero-proof">
          <div className="proof-avs">
            {[['#2563eb','RS'],['#1d4ed8','PK'],['#3b82f6','AM'],['#1e40af','SK']].map(([bg,init]) => (
              <div key={init} className="proof-av" style={{background:bg}}>{init}</div>
            ))}
          </div>
          <div className="proof-copy">
            <span className="proof-stars">★★★★★</span>
            <strong>150+ projects delivered</strong>
            loved by 100+ teams across India
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        {[['🚀','150+','Projects Tested'],['😊','99%','Client Satisfaction'],['👩‍💻','50+','Expert Testers'],['⚡','5x','Faster Bug Detection']].map(([icon,num,label]) => (
          <div key={label} className="stat">
            <span className="stat-icon">{icon}</span>
            <span className="stat-num">{num}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <section id="services" className="bg-white">
        <div className="section-head fade-in">
          <div className="section-tag">✨ Our Services</div>
          <h2 className="section-title">Everything Your Software Needs to Succeed</h2>
          <p className="section-sub">From manual checks to AI-driven automation - we cover every layer of your application with care and precision.</p>
        </div>
        <div className="services-grid">
          {[
            {icon:'🧪',title:'Functional Testing',desc:'We verify every feature works exactly as your users expect - across browsers, devices, and all those sneaky edge cases.',pill:'Manual & Scripted'},
            {icon:'🤖',title:'Automation Testing',desc:'Build it once, run it forever. We design solid automation frameworks with Selenium, Playwright and Cypress - cutting your regression time by up to 80%.',pill:'Selenium · Cypress · Playwright'},
            {icon:'⚡',title:'Performance Testing',desc:'We simulate thousands of users hitting your app at once - finding bottlenecks before they find your customers.',pill:'JMeter · k6 · Gatling'},
            {icon:'🔐',title:'Security Testing',desc:'Your users trust you with their data. We run penetration tests, OWASP audits and vulnerability assessments so that trust is never broken.',pill:'OWASP · VAPT · Pen Testing'},
            {icon:'🧠',title:'AI-Powered Testing',desc:'We use machine learning to auto-generate smart test cases, detect anomalies early, and keep test scripts self-healing.',pill:'ML · Smart Automation · AI QA'},
            {icon:'📱',title:'Mobile Testing',desc:'Native, hybrid or cross-platform - we test on 100+ real devices. iOS and Android, every screen size, pixel-perfect quality guaranteed.',pill:'iOS · Android · Cross-Platform'},
          ].map(s => (
            <div key={s.title} className="svc-card fade-in">
              <div className="svc-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="svc-pill">{s.pill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS MARQUEE */}
      <div className="tools-belt">
        <p className="tools-label">Tools & Technologies We Work With</p>
        <div style={{overflow:'hidden'}}>
          <div className="marquee">
            {[...TOOLS,...TOOLS].map((t,i) => <div key={i} className="tool-chip">{t}</div>)}
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <section id="process" className="bg-soft">
        <div className="section-head center fade-in">
          <div className="section-tag">🗺️ Our Process</div>
          <h2 className="section-title">Simple, Transparent & Friendly</h2>
          <p className="section-sub">No jargon, no surprises. Here's exactly how we partner with you from day one to delivery.</p>
        </div>
        <div className="process-grid">
          {[
            {n:'01',icon:'🔍',title:'Discovery & Planning',desc:'We sit down with you, understand your app, and define a tailored testing strategy that fits your goals, tech stack, and timeline perfectly.'},
            {n:'02',icon:'📋',title:'Test Design',desc:'Our team writes clear test cases and builds automation frameworks - everything documented so you always know exactly what\'s being tested and why.'},
            {n:'03',icon:'🚀',title:'Execution & Reporting',desc:'We run tests, catch bugs early, and share live dashboards with plain-English insights. No confusing reports - just clear, actionable information.'},
            {n:'04',icon:'✅',title:'Sign-off & Support',desc:'Quality confirmed, final report delivered - and we stick around after go-live too. We\'re your long-term quality partner, not just a one-time vendor.'},
          ].map(p => (
            <div key={p.n} className="process-card fade-in">
              <div className="process-num">{p.n}</div>
              <span className="process-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY VARSAKA */}
      <section id="why" className="bg-white">
        <div className="section-head fade-in">
          <div className="section-tag">💙 Why Varsaka Labs</div>
          <h2 className="section-title">Quality You Trust, People You'll Love Working With</h2>
          <p className="section-sub">We're not just testers - we're friendly partners who genuinely care about your product's success.</p>
        </div>
        <div className="why-grid">
          {[
            {icon:'⚡',title:'Fast Turnaround',desc:'Quick onboarding and accelerated cycles - ship faster without ever cutting corners on quality.'},
            {icon:'🎯',title:'Domain Expertise',desc:'Deep experience in fintech, healthcare, ecommerce, SaaS, and enterprise applications.'},
            {icon:'🔄',title:'CI/CD Ready',desc:'Seamless fit into your DevOps pipeline - automated tests trigger on every single commit.'},
            {icon:'📊',title:'Live Dashboards',desc:'Real-time test progress and bug tracking - complete visibility with zero mystery.'},
            {icon:'🔒',title:'NDA & Data Safe',desc:'Your IP is protected with strict NDAs, secure environments, and ISO-aligned processes.'},
            {icon:'💰',title:'Honest Pricing',desc:'Enterprise quality at startup-friendly rates. Flexible project or retainer - no surprise bills.'},
          ].map(w => (
            <div key={w.title} className="why-card fade-in">
              <div className="why-icon">{w.icon}</div>
              <div><h4>{w.title}</h4><p>{w.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-soft">
        <div className="section-head center fade-in">
          <div className="section-tag">💬 Client Stories</div>
          <h2 className="section-title">Teams Love Working with Varsaka Labs</h2>
          <p className="section-sub">Don't just take our word for it - here's what our happy clients have to say.</p>
        </div>
        <div className="testi-grid">
          {[
            {stars:'★★★★★',text:'"Varsaka found critical security vulnerabilities before our product launch. Their attention to detail literally saved us. Super friendly team - felt like working with colleagues, not contractors!"',name:'Rahul Sharma',role:'CTO, Ourfab Technologies',bg:'#2563eb',init:'RS'},
            {stars:'★★★★★',text:'"Our regression went from 2 days to 4 hours after Varsaka\'s automation suite. ROI was visible in the first sprint. They explained everything clearly - zero jargon, 100% transparent."',name:'Priya Kapoor',role:'VP Engineering, Techtd',bg:'#1d4ed8',init:'PK'},
            {stars:'★★★★★',text:'"Their AI testing caught edge cases we\'d missed for months! Warm, communicative and genuinely invested in our success. Would recommend Varsaka to anyone building serious software."',name:'Arjun Mehta',role:'Product Lead, TakeCare360',bg:'#3b82f6',init:'AM'},
          ].map(t => (
            <div key={t.name} className="testi-card fade-in">
              <div className="stars">{t.stars}</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="author-av" style={{background:t.bg}}>{t.init}</div>
                <div><div className="author-name">{t.name}</div><div className="author-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white">
        <div className="section-head center fade-in">
          <div className="section-tag">🤔 FAQs</div>
          <h2 className="section-title">Common Questions</h2>
          <p className="section-sub">Have questions? We have answers. Here's what people usually ask us.</p>
        </div>
        <div className="faq-container fade-in">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item${faqOpen === i ? ' open' : ''}`} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
              <button className="faq-btn">
                {f.q}
                <span className="faq-icon">{faqOpen === i ? '−' : '+'}</span>
              </button>
              <div className="faq-content" style={{maxHeight: faqOpen === i ? '200px' : '0'}}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <h2>Ready to Ship with Total Confidence? 🚀</h2>
        <p>Book a free, no-pressure 30-minute chat. We'll review your app and suggest the best approach - completely free, no strings attached.</p>
        <div className="cta-btns">
          <a href="#contact" className="btn-white">Get Free Consultation</a>
          <a href="#services" className="btn-outline-white">Explore Services</a>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" className="bg-white">
        <div className="contact-grid">
          <div className="fade-in">
            <div className="section-tag">👋 Get In Touch</div>
            <h2 className="section-title">Let's Talk About Your Project!</h2>
            <p className="section-sub" style={{marginBottom:'2.5rem'}}>We're friendly people - no pressure, no sales pitch. Just an honest conversation about how we can help your team ship better software.</p>
            {[{icon:'📧',label:'Email',val:'info@varsaka.com'},{icon:'💬',label:'WhatsApp',val:<a href="https://wa.me/917396106271" style={{color:'inherit', textDecoration:'none'}}>+91 73961 06271</a>},{icon:'📍',label:'Location',val:'Hyderabad, Telangana, India'},{icon:'⏰',label:'Response Time',val:'Within 4 business hours 😊'}].map(c => (
              <div key={c.label} className="contact-info-item">
                <div className="contact-icon">{c.icon}</div>
                <div><div className="contact-info-label">{c.label}</div><div className="contact-info-val">{c.val}</div></div>
              </div>
            ))}
          </div>
          <div className="form-wrap fade-in">
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label>Your Name *</label><input type="text" name="name" placeholder="Abhishek Sharma" required value={formState.name} onChange={handleChange} /></div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="Your work email" value={formState.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <div style={{display:'flex', gap:'5px', position:'relative'}}>
                  <div 
                    style={{
                      width:'100px', padding:'0.75rem', borderRadius:'8px', border:'1.5px solid var(--border)', 
                      background:'var(--bg-white)', color:'var(--text)', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center',
                      fontSize: '0.9rem', fontWeight: '600'
                    }}
                    onClick={() => setShowCountryList(!showCountryList)}
                  >
                    <span>{formState.countryCode}</span>
                    <span>▾</span>
                  </div>

                  {showCountryList && (
                    <div className="country-dropdown-list" style={{
                      position:'absolute', top:'100%', left:0, width:'250px', maxHeight:'250px', 
                      overflowY:'auto', background:'var(--bg-white)', border:'1.5px solid var(--border)', 
                      borderRadius:'12px', boxShadow:'var(--shadow-md)', zIndex:1000, marginTop:'5px'
                    }}>
                      <input 
                        type="text" 
                        placeholder="Search country..." 
                        style={{width:'100%', padding:'10px', border:'none', borderBottom:'1px solid var(--border)', position:'sticky', top:0, background:'var(--bg-white)', color:'var(--text)'}}
                        value={countrySearch}
                        onChange={e => setCountrySearch(e.target.value)}
                        autoFocus
                        onClick={e => e.stopPropagation()}
                      />
                      {ALL_COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.includes(countrySearch)).map(c => (
                        <div 
                          key={c.name}
                          style={{padding:'12px', cursor:'pointer', fontSize:'0.85rem', borderBottom:'1px solid var(--border)', display:'flex', gap:'10px', color:'var(--text)'}}
                          onClick={() => {
                            setFormState({...formState, countryCode: c.code});
                            setShowCountryList(false);
                            setCountrySearch('');
                          }}
                          onMouseOver={e => e.currentTarget.style.background = 'var(--blue-light)'}
                          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <span>{c.flag}</span>
                          <strong>{c.code}</strong> 
                          <span style={{color:'#64748b'}}>{c.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <input 
                    style={{flex:1}}
                    type="tel" 
                    name="phone"
                    placeholder="Your contact number" 
                    value={formState.phone} 
                    onChange={(e) => setFormState({...formState, phone: e.target.value.replace(/\D/g, '')})} 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Service Needed</label>
                <select name="service" value={formState.service} onChange={handleChange}>
                  {['Functional Testing','Automation Testing','Performance Testing','Security Testing','AI-Powered Testing','Mobile Testing','Full QA Partnership'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Tell Us About Your Project</label><textarea name="message" placeholder="Just a brief about your project" value={formState.message} onChange={handleChange} /></div>
              
              {/* 🛡️ Math CAPTCHA UI */}
              <div className="form-group captcha-group">
                <label>Security Verification</label>
                <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                  <div className="captcha-box" style={{
                    padding: '0.75rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px',
                    fontWeight: '700', color: '#1e293b', fontSize: '1rem', minWidth: '100px', textAlign: 'center'
                  }}>
                    {captcha.a} {captcha.op} {captcha.b} = 
                  </div>
                  <input 
                    type="number" 
                    placeholder="?" 
                    value={userCaptcha} 
                    onChange={e => {setUserCaptcha(e.target.value); setCaptchaError(false);}}
                    style={{width: '80px', borderColor: captchaError ? '#ef4444' : '#e2e8f0'}}
                    required
                  />
                  <button type="button" onClick={generateCaptcha} style={{
                    background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem'
                  }} title="Refresh Question">↻</button>
                </div>
                {captchaError && <p style={{color: '#ef4444', fontSize: '0.75rem', marginTop: '5px'}}>Incorrect answer. Please try again.</p>}
              </div>

              <input type="text" name="_honey" style={{display:'none'}} />
              <button type="submit" className="submit-btn" id="submitBtn" disabled={submitting} style={btnColor ? {background:btnColor} : {}}>
                {btnTxt}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
