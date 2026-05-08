import { useEffect } from 'react';

const jobs = [
  { title: 'Senior QA Automation Engineer', location: 'Hyderabad (Hybrid)', type: 'Full-Time', desc: 'Lead the design and implementation of automation frameworks using Selenium, Playwright, or Cypress. 3+ years experience required.' },
  { title: 'Performance Test Engineer', location: 'Remote', type: 'Full-Time', desc: 'Develop and execute performance tests using JMeter and k6. Experience with CI/CD pipelines and cloud environments is a plus.' },
  { title: 'Security Testing Analyst', location: 'Hyderabad', type: 'Full-Time', desc: 'Conduct penetration testing, OWASP audits, and vulnerability assessments. CEH or OSCP certification preferred.' },
  { title: 'QA Engineer (Manual)', location: 'Hyderabad', type: 'Full-Time / Intern', desc: 'Join our QA team to design test cases, perform exploratory testing, and help maintain quality across multiple client projects.' },
];

export default function Careers() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="page-wrapper">
      <section className="bg-white" style={{ paddingTop: 80 }}>
        <div className="section-head fade-in">
          <div className="section-tag">💼 Careers</div>
          <h2 className="section-title">Join the Varsaka Labs Team</h2>
          <p className="section-sub">We're always looking for passionate engineers who love building quality software. Here's what's open right now.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {jobs.map(j => (
            <div key={j.title} className="why-card fade-in" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: '1.08rem', color: 'var(--text)' }}>{j.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="svc-pill">{j.type}</span>
                  <span className="svc-pill" style={{ background: 'var(--bg-soft)' }}>📍 {j.location}</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.75 }}>{j.desc}</p>
              <a href="/#contact" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>Apply Now →</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
