import { useEffect } from 'react';

const posts = [
  { title: 'Why AI-Powered Testing is the Future of QA', date: 'April 28, 2026', tag: 'AI Testing', summary: 'Machine learning models are changing the game for test generation and anomaly detection. Here\'s how Varsaka Labs is staying ahead of the curve.' },
  { title: '5 Signs Your Regression Suite Needs a Makeover', date: 'April 15, 2026', tag: 'Automation', summary: 'If your nightly regression run takes 6+ hours, it\'s time to rethink. We break down the red flags and how to fix them fast.' },
  { title: 'OWASP Top 10 — What Every Dev Team Must Know in 2026', date: 'March 30, 2026', tag: 'Security', summary: 'Security vulnerabilities are as common as ever. We walk through the OWASP Top 10 and what each one means for your application.' },
  { title: 'Performance Testing: Load vs. Stress vs. Soak — Explained Simply', date: 'March 12, 2026', tag: 'Performance', summary: 'These three test types sound similar but serve very different purposes. Let\'s demystify them with real-world examples.' },
];

export default function Blog() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="page-wrapper">
      <section className="bg-white" style={{ paddingTop: 80 }}>
        <div className="section-head center fade-in">
          <div className="section-tag">✍️ Blog</div>
          <h2 className="section-title">Insights from the QA Trenches</h2>
          <p className="section-sub">Tips, trends, and honest takes on software quality — written by engineers, for engineers.</p>
        </div>
        <div className="services-grid">
          {posts.map(p => (
            <div key={p.title} className="svc-card fade-in" style={{ cursor: 'default' }}>
              <span className="svc-pill" style={{ marginBottom: '1rem', marginTop: 0 }}>{p.tag}</span>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{p.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: '0.6rem' }}>{p.date}</p>
              <p>{p.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
