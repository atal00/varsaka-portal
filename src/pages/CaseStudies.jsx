import { useEffect } from 'react';

const studies = [
  { client: 'Ourfab Technologies', tag: 'Security Testing', outcome: '12 Critical Vulnerabilities Fixed Before Launch', desc: 'Conducted a full OWASP security audit and penetration test on their fintech platform. Identified and helped remediate 12 critical and 34 medium-risk vulnerabilities - all before go-live.' },
  { client: 'Techtd Platform', tag: 'Automation', outcome: '2-Day Regression Cut to 4 Hours', desc: 'Designed and implemented a full Cypress automation suite integrated with GitHub Actions. Regression cycle reduced by 83%, freeing up the team for feature work.' },
  { client: 'TakeCare360', tag: 'AI-Powered Testing', outcome: '97% Test Coverage Achieved', desc: 'Used AI-assisted test generation to expand test coverage from 61% to 97% across their healthcare SaaS platform, catching 8 previously unknown edge-case defects.' },
  { client: 'RetailEdge India', tag: 'Performance Testing', outcome: 'App Handles 10x Traffic Load', desc: 'Ran JMeter and k6 load tests simulating peak-season traffic. Identified 3 bottlenecks in their checkout flow, remediation of which increased throughput by 10x.' },
];

export default function CaseStudies() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="page-wrapper">
      <section className="bg-white" style={{ paddingTop: 80 }}>
        <div className="section-head fade-in">
          <div className="section-tag">📊 Case Studies</div>
          <h2 className="section-title">Real Results for Real Clients</h2>
          <p className="section-sub">Numbers don't lie. Here's what Varsaka Labs has delivered for teams across industries.</p>
        </div>
        <div className="services-grid">
          {studies.map(s => (
            <div key={s.client} className="svc-card fade-in">
              <span className="svc-pill" style={{ marginBottom: '1rem', marginTop: 0 }}>{s.tag}</span>
              <h3>{s.client}</h3>
              <p style={{ fontWeight: 700, color: 'var(--blue-mid)', fontSize: '0.95rem', marginBottom: '0.6rem' }}>✅ {s.outcome}</p>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
