import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
const FunctionalTesting = lazy(() => import('./pages/FunctionalTesting'));
const AutomationTesting = lazy(() => import('./pages/AutomationTesting'));
const PerformanceTesting = lazy(() => import('./pages/PerformanceTesting'));
const SecurityTesting = lazy(() => import('./pages/SecurityTesting'));
const AIPoweredTesting = lazy(() => import('./pages/AIPoweredTesting'));
const MobileTesting = lazy(() => import('./pages/MobileTesting'));
const Apply = lazy(() => import('./pages/Apply'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
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
      // Block F12, Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+U (Source), Ctrl+S (Save), Ctrl+Shift+C (Inspect Element)
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || 
        (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83 || e.keyCode === 70)) || // F is find
        (e.metaKey && e.shiftKey && e.keyCode === 73) // Mac support
      ) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener('keydown', keyBlock);

    // Disable Drag & Drop (prevents people from stealing assets easily)
    document.addEventListener('dragstart', block);
    
    // 🛡️ Prevent Console Logging in Production
    if (import.meta.env.PROD) {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
      console.info = () => {};
    }

    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('keydown', keyBlock);
      document.removeEventListener('dragstart', block);
    };
  }, []);

  return (
    <HelmetProvider>
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
            <Route path="/blog/:id" element={<><Navbar /><BlogDetail /><Footer /></>} />
            <Route path="/careers" element={<><Navbar /><Careers /><Footer /></>} />
            <Route path="/apply" element={<><Navbar /><Apply /><Footer /></>} />
            <Route path="/case-studies" element={<><Navbar /><CaseStudies /><Footer /></>} />
            <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
            <Route path="/terms-of-service" element={<><Navbar /><TermsOfService /><Footer /></>} />
            <Route path="/nda-template" element={<><Navbar /><NdaTemplate /><Footer /></>} />
            
            {/* Portal Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/portal" element={<Portal />} />

            {/* Service Detail Pages */}
            <Route path="/services/functional-testing" element={<><Navbar /><FunctionalTesting /><Footer /></>} />
            <Route path="/services/automation-testing" element={<><Navbar /><AutomationTesting /><Footer /></>} />
            <Route path="/services/performance-testing" element={<><Navbar /><PerformanceTesting /><Footer /></>} />
            <Route path="/services/security-testing" element={<><Navbar /><SecurityTesting /><Footer /></>} />
            <Route path="/services/ai-powered-testing" element={<><Navbar /><AIPoweredTesting /><Footer /></>} />
            <Route path="/services/mobile-testing" element={<><Navbar /><MobileTesting /><Footer /></>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
