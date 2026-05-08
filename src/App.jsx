import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ScrollTop from './components/ScrollTop';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import CaseStudies from './pages/CaseStudies';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NdaTemplate from './pages/NdaTemplate';
import Login from './pages/Login';
import Portal from './pages/Portal';
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
    const block = (e) => e.preventDefault();
    document.addEventListener('contextmenu', block);
    const keyBlock = (e) => {
      if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 67 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener('keydown', keyBlock);
    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('keydown', keyBlock);
    };
  }, []);

  return (
    <BrowserRouter>
      <AnimationTrigger />
      
      {/* Global Bot & Scroll Trigger */}
      <Chatbot />
      <ScrollTop />

      <Routes>
        {/* Public Pages with Nav/Footer */}
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/blog" element={<><Navbar /><Blog /><Footer /></>} />
        <Route path="/careers" element={<><Navbar /><Careers /><Footer /></>} />
        <Route path="/case-studies" element={<><Navbar /><CaseStudies /><Footer /></>} />
        <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
        <Route path="/terms-of-service" element={<><Navbar /><TermsOfService /><Footer /></>} />
        <Route path="/nda-template" element={<><Navbar /><NdaTemplate /><Footer /></>} />
        
        {/* Portal Pages (Now with Global Bot) */}
        <Route path="/login" element={<Login />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
    </BrowserRouter>
  );
}
