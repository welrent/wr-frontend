import Link from 'next/link';

export const metadata = { title: 'Locations – Welrent', description: 'Find a Welrent in your city across the Netherlands and Belgium.' };

const regions = [
    {
        country: 'Nederland',
        flag: '🇳🇱',
        cities: [
            { name: 'Amsterdam', slug: 'amsterdam' },
            { name: 'Rotterdam', slug: 'rotterdam' },
            { name: 'Utrecht', slug: 'utrecht' },
            { name: 'Den Haag', slug: 'den-haag' },
            { name: 'Eindhoven', slug: 'eindhoven' },
        ],
    },
    {
        country: 'België',
        flag: '🇧🇪',
        cities: [
            { name: 'Brussel', slug: 'brussels' },
            { name: 'Antwerpen', slug: 'antwerp' },
            { name: 'Gent', slug: 'gent' },
            { name: 'Brugge', slug: 'brugge' },
            { name: 'Luik', slug: 'luik' },
        ],
    },
];

export default function LocationsPage() {
    return (
        <div className="page-wrapper" style={{ paddingBottom: '80px' }}>
            <div className="container">
                {/* Hero */}
                <div style={{ paddingTop: '40px', paddingBottom: '50px', borderBottom: '1px solid #F0F2F5', marginBottom: '60px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Where we drive</span>
                    <h1 style={{ fontSize: '3.5rem', fontFamily: "'Playfair Display', serif", fontWeight: 400, marginTop: '12px', lineHeight: 1.2 }}>Our Locations</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '16px', fontSize: '1.05rem', maxWidth: '560px', lineHeight: 1.7 }}>
                        Welrent is active across the Netherlands and Belgium. Choose a city below to explore available vehicles and learn about local pickup.
                    </p>
                </div>

                {/* Country Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                    {regions.map((region) => (
                        <div key={region.country}>
                            {/* Country Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                                <span style={{ fontSize: '2.2rem' }}>{region.flag}</span>
                                <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>{region.country}</h2>
                            </div>

                            {/* City Links */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
                                {region.cities.map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={`/locations/${city.slug}`}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '18px 22px',
                                            background: '#FAFBFC',
                                            border: '1px solid #EBEBEB',
                                            borderRadius: '10px',
                                            textDecoration: 'none',
                                            color: 'var(--text-primary)',
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            transition: 'all 0.2s',
                                        }}
                                        className="location-link"
                                    >
                                        <span>Huur in {city.name}</span>
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div style={{ marginTop: '80px', padding: '40px', background: 'var(--accent-blue)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>Don't see your city?</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>We're expanding fast. Check back soon or browse all available vehicles.</p>
                    </div>
                    <Link href="/offerlist" style={{ background: 'white', color: 'var(--accent-blue)', padding: '14px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', fontSize: '0.95rem' }}>
                        View All Cars →
                    </Link>
                </div>
            </div>
        </div>
    );
}
