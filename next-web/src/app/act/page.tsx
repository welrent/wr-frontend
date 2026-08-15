import Link from 'next/link';
import { ACT_BASE_URL, ACT_PAGES, ACT_REPO_URL, actUrl } from '@/lib/act';

const LOCAL_LINKS = [
  {
    title: 'Book a performance car',
    body: 'Jump into the Welrent App marketplace and reserve an RS6, EVO, or yacht.',
    href: '/offerlist',
    cta: 'Browse vehicles',
    external: false,
  },
  {
    title: 'F1 designed programme',
    body: 'Explore the motorsport collaboration inside the marketplace app.',
    href: '/sponsorship/f1/wr/designed',
    cta: 'View F1 page',
    external: false,
  },
  {
    title: 'Act source repository',
    body: 'Public GitHub project that powers Act pages and the WelrentAuth SDK.',
    href: ACT_REPO_URL,
    cta: 'Open github.com/welrent/Act',
    external: true,
  },
];

export default function ActPage() {
  return (
    <div className="page-wrapper act-page">
      <section className="act-hero">
        <div className="container act-hero-inner">
          <img
            src="/assets/WLR_LOGO_ACT.svg"
            alt="Welrent Act"
            className="act-logo"
          />
          <h1>Welrent Act</h1>
          <p>
            Connected to the public Act project for smart agreements, legal pages,
            and SSO. Live Act base: <code>{ACT_BASE_URL}</code>
          </p>
          <div className="act-hero-ctas">
            <a href={actUrl('/')} className="btn-primary" target="_blank" rel="noopener noreferrer">
              Open Act home
            </a>
            <a href={ACT_REPO_URL} className="btn-secondary-outline" target="_blank" rel="noopener noreferrer">
              View Act on GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="act-section" id="mission">
        <div className="container">
          <h2>Connected Act pages</h2>
          <p>
            These routes come from{' '}
            <a href={ACT_REPO_URL} target="_blank" rel="noopener noreferrer">
              github.com/welrent/Act
            </a>{' '}
            (`next-app/src/app/pages/[slug]` and agreements hub). The marketplace
            deep-links into that catalog so rentals and legal flows stay in sync.
          </p>
          <div className="act-grid" style={{ marginTop: 32 }}>
            {ACT_PAGES.map((item) => (
              <article key={item.path} className="act-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a href={actUrl(item.path)} target="_blank" rel="noopener noreferrer">
                  {item.path} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="act-section" id="partner">
        <div className="container">
          <h2>Also in this app</h2>
          <div className="act-grid">
            {LOCAL_LINKS.map((item) => (
              <article key={item.title} className="act-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.cta} →
                  </a>
                ) : (
                  <Link href={item.href}>{item.cta} →</Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="act-section act-section--dark">
        <div className="container act-cta-band">
          <div>
            <h2>Ready to drive?</h2>
            <p>Return to the Welrent App marketplace or jump into Act agreements.</p>
          </div>
          <div className="act-hero-ctas">
            <Link href="/" className="btn-primary">
              Back to Welrent App
            </Link>
            <a href={actUrl('/agreements')} className="btn-secondary-outline" target="_blank" rel="noopener noreferrer">
              Act agreements
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
