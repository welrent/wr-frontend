import Link from 'next/link';

export default function Footer({ footerLinks = {}, content = {} }: { footerLinks: any, content: any }) {
    return (
        <footer>
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <img src="/assets/WLR_LOGO_APP.svg" alt="Welrent App Logo" style={{ height: '30px' }} />
                        <p>{content.footer_brand_desc || 'Welcome to Welrent, the smartest auto sharing and rental app. We guarantee the perfect car for every moment.'}</p>
                        <div className="app-badges">
                            <a href="#" className="app-badge">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74.7 0 1.95-.88 3.55-.74 1.48.06 2.76.62 3.55 1.77-3.05 1.9-2.58 5.4 0 6.64-.7 1.55-1.5 2.56-2.18 4.56zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.3 2.4-2.06 4.38-3.74 4.25z"></path></svg>
                                App Store
                            </a>
                            <a href="#" className="app-badge">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 20.5v-17c0-.5.5-.8 1-.5l15 8c.5.3.5 1.1 0 1.4l-15 8c-.5.3-1 0-1-.5zm2-14.7v12.4l11-6.2-11-6.2z"></path></svg>
                                Google Play
                            </a>
                        </div>
                    </div>
                    <div className="footer-trust">
                        <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-black.svg" alt="Trustpilot" style={{ height: '25px' }} />
                        <p style={{ marginTop: '10px', fontWeight: 600, fontSize: '0.9rem' }}>Excellent <span style={{ color: '#00B67A' }}>★★★★★</span></p>
                    </div>
                </div>

                <div className="footer-grid">
                    {Object.keys(footerLinks).map((category) => (
                        <div key={category} className="footer-col">
                            <h4>{category}</h4>
                            <ul>
                                {footerLinks[category].map((link: any, i: number) => (
                                    <li key={i}><a href={link.url}>{link.title}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="footer-bottom">
                    <p>{content.footer_copyright || '© 2026 Welrent App. Smart Agreements.'}</p>
                    <div className="footer-bottom-links">
                        <Link href="/privacy">Privacy</Link>
                        <Link href="/terms">Terms</Link>
                        <div className="language-switch" style={{ marginLeft: '20px', paddingLeft: '20px', borderLeft: '1px solid var(--border-light)' }}>
                            <a href="#" className="active">EN</a>
                            <a href="#">NL</a>
                            <a href="#">FR</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
