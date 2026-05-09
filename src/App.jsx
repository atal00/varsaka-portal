import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ScrollTop from './components/ScrollTop';
import Home from './pages/Home';

// 🚀 Performance: Lazy Load non-critical pages
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Careers = lazy(() => import('./pages/Careers'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const NdaTemplate = lazy(() => import('./pages/NdaTemplate'));
const Login = lazy(() => import('./pages/Login'));
const Portal = lazy(() => import('./pages/Portal'));
import './index.css';

function AnimationTrigger() {
  const location = useLocation();
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 40);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.01 });

    const timer = setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    }, 100);

    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, [location]);
  return null;
}

export default function App() {
  useEffect(() => {
    // 🛡️ THE GREAT WALL: Anti-Hacker Protection
    const block = (e) => e.preventDefault();
    document.addEventListener('contextmenu', block);

    const keyBlock = (e) => {
      // Block F12, Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+U (Source), Ctrl+S (Save)
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || 
        (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83))
      ) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener('keydown', keyBlock);

    // Disable Drag & Drop (prevents people from stealing assets easily)
    document.addEventListener('dragstart', block);

    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('keydown', keyBlock);
      document.removeEventListener('dragstart', block);
    };
  }, []);

  return (
    <BrowserRouter>
      <AnimationTrigger />
      
      {/* Global Scroll Trigger */}
      <ScrollTop />

      <Suspense fallback={<div style={{height: '100vh', background: 'var(--bg-white)'}} />}>
        <Routes>
          {/* Public Pages with Nav/Footer */}
          <Route path="/" element={<><Navbar /><Home /><Chatbot /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/blog" element={<><Navbar /><Blog /><Footer /></>} />
          <Route path="/careers" element={<><Navbar /><Careers /><Footer /></>} />
          <Route path="/case-studies" element={<><Navbar /><CaseStudies /><Footer /></>} />
          <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
          <Route path="/terms-of-service" element={<><Navbar /><TermsOfService /><Footer /></>} />
          <Route path="/nda-template" element={<><Navbar /><NdaTemplate /><Footer /></>} />
          
          {/* Portal Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/portal" element={<Portal />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
