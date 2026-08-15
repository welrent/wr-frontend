import Link from 'next/link';

const ACT_LINKS = [
    {
        title: 'Partner with Act',
        body: 'Bring Welrent Act branding to events, fleets, and hospitality partners.',
        href: '/act#partner',
        cta: 'Become a partner',
    },
    {
        title: 'F1 designed programme',
        body: 'Explore the motorsport collaboration and limited WR designed drops.',
        href: '/sponsorship/f1/wr/designed',
        cta: 'View F1 page',
    },
    {
        title: 'Book a performance car',
        body: 'Jump straight into the live offer list and reserve an RS6, EVO, or yacht.',
        href: '/offerlist',
        cta: 'Browse vehicles',
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
                        The lifestyle and partnership layer of Welrent — events, sponsorships,
                        and curated drives connected directly to the rental marketplace.
                    </p>
                    <div className="act-hero-ctas">
                        <Link href="/offerlist" className="btn-primary">
                            Explore rentals
                        </Link>
                        <a href="#mission" className="btn-secondary-outline">
                            Our mission
                        </a>
                    </div>
                </div>
            </section>

            <section className="act-section" id="mission">
                <div className="container">
                    <h2>Mission</h2>
                    <p>
                        Welrent Act connects premium mobility with culture. From city launches to
                        motorsport collaborations, Act pages feed riders and partners back into the
                        Welrent App booking flow.
                    </p>
                </div>
            </section>

            <section className="act-section" id="partner">
                <div className="container">
                    <h2>Connected experiences</h2>
                    <div className="act-grid">
                        {ACT_LINKS.map((item) => (
                            <article key={item.title} className="act-card">
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                                <Link href={item.href}>{item.cta} →</Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="act-section act-section--dark">
                <div className="container act-cta-band">
                    <div>
                        <h2>Ready to drive?</h2>
                        <p>Continue to the Welrent App marketplace and reserve your next vehicle.</p>
                    </div>
                    <Link href="/" className="btn-primary">
                        Back to Welrent App
                    </Link>
                </div>
            </section>
        </div>
    );
}
