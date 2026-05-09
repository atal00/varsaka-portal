import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="Varsaka Labs Logo" style={{ height: 44, borderRadius: 6 }} />
          </Link>
          <p>Varsaka Labs is a progressive technology firm with expertise in Software Testing, Quality Engineering, and End-to-End Development Solutions.</p>
        </div>

        <div className="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="/#services">Functional Testing</a></li>
            <li><a href="/#services">Automation Testing</a></li>
            <li><a href="/#services">Performance Testing</a></li>
            <li><a href="/#services">Security Testing</a></li>
            <li><a href="/#services">AI-Powered Testing</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/case-studies">Case Studies</Link></li>
            <li><Link to="/login" style={{ color: 'var(--blue-bright)', fontWeight: 600 }}>Employee Login</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Legal</h5>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/nda-template">NDA Template</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© January 2026 Varsaka Labs. All rights reserved. Made with ❤️ in Hyderabad, India.</p>
        <div className="social-links">
          <a href="https://wa.me/917396106271" className="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="https://www.linkedin.com/company/varsaka-labs-llp/posts/?feedView=all" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="https://www.instagram.com/varsakalabs/?hl=en" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
