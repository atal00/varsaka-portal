import { useEffect } from 'react';

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="page-wrapper">
      <div className="prose-block">
        <div className="section-tag">🏢 About Us</div>
        <h1>About Varsaka Labs</h1>
        <p className="meta">Headquartered in Hyderabad, India · Serving clients globally</p>

        <h2>Who We Are</h2>
        <p>Varsaka Labs is a progressive technology firm with deep expertise in Software Testing, Quality Engineering, and End-to-End Development Solutions. Founded by a team of passionate engineers, we exist to make software better - one test at a time.</p>

        <h2>Our Mission</h2>
        <p>To be the most trusted QA partner for technology teams across India and beyond - delivering honest, thorough, and friendly quality engineering that helps products ship with confidence.</p>

        <h2>What We Do</h2>
        <p>We cover the full spectrum of software quality:</p>
        <ul>
          <li>Functional &amp; Regression Testing</li>
          <li>Test Automation (Selenium, Playwright, Cypress)</li>
          <li>Performance &amp; Load Testing (JMeter, k6)</li>
          <li>Security &amp; Penetration Testing (OWASP, VAPT)</li>
          <li>AI-Powered &amp; Smart Testing</li>
          <li>Mobile Testing (iOS &amp; Android)</li>
        </ul>

        <h2>Our Values</h2>
        <p><strong>Transparency:</strong> You always know what we're testing, why, and what we found. No jargon, no mystery.</p>
        <p><strong>Partnership:</strong> We think of ourselves as an extension of your team - not a vendor.</p>
        <p><strong>Speed with Quality:</strong> Fast doesn't mean careless. We're known for rapid onboarding without ever cutting corners.</p>

        <h2>Get In Touch</h2>
        <p>Ready to chat? <a href="/#contact">Drop us a message</a> and we'll get back to you within 4 business hours.</p>
      </div>
    </div>
  );
}
