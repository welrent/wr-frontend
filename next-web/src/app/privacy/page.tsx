import Link from 'next/link';

export const metadata = { title: 'Privacy Policy – Welrent', description: 'How Welrent collects, uses and protects your personal data.' };

export default function PrivacyPage() {
    return (
        <div className="page-wrapper" style={{ paddingBottom: '80px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ paddingTop: '40px', paddingBottom: '60px', borderBottom: '1px solid #F0F2F5', marginBottom: '40px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Legal</span>
                    <h1 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", fontWeight: 400, marginTop: '12px', lineHeight: 1.2 }}>Privacy Policy</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '16px', fontSize: '0.95rem' }}>Last updated: April 8, 2025</p>
                </div>

                {[
                    {
                        title: '1. Who We Are',
                        body: 'Welrent B.V. ("Welrent", "we", "our") operates a premium car-sharing and rental marketplace available via welrent.com and the Welrent mobile application. We are headquartered in Amsterdam, the Netherlands, and registered with the Dutch Chamber of Commerce.'
                    },
                    {
                        title: '2. Data We Collect',
                        body: 'We collect information you provide directly (name, email, phone number, driving licence, payment details) and data generated automatically when you use our services (IP address, device identifiers, location data when you unlock a vehicle, booking history and in-app behaviour).'
                    },
                    {
                        title: '3. How We Use Your Data',
                        body: 'Your personal data is used to fulfil bookings, process payments, provide customer support, improve our platform, send transactional communications, comply with legal obligations and prevent fraud. We do not sell your personal data to third parties.'
                    },
                    {
                        title: '4. Legal Basis (GDPR)',
                        body: 'Processing is based on: (a) performance of a contract when you book a vehicle; (b) your consent for marketing communications; (c) legitimate interests for fraud prevention and service improvement; and (d) compliance with legal obligations.'
                    },
                    {
                        title: '5. Data Sharing',
                        body: 'We share data with vehicle partners to facilitate pick-up, payment processors (Stripe, Adyen), identity verification providers and, when legally required, public authorities. All processors are bound by data processing agreements compliant with GDPR.'
                    },
                    {
                        title: '6. Cookies',
                        body: 'We use essential cookies required for the site to function and, with your consent, analytics and marketing cookies. You can manage your cookie preferences at any time via our Cookie Settings panel.'
                    },
                    {
                        title: '7. Data Retention',
                        body: 'We retain personal data for as long as your account is active or as needed to provide services. Booking records are kept for 7 years to comply with Dutch tax law. Driver-licence scans are deleted 30 days after a booking concludes.'
                    },
                    {
                        title: '8. Your Rights',
                        body: 'Under the GDPR you have the right to access, rectify, erase, restrict processing of, and port your data, as well as the right to object. Submit requests to privacy@welrent.com. You may also lodge a complaint with the Autoriteit Persoonsgegevens (AP).'
                    },
                    {
                        title: '9. Security',
                        body: 'We protect your data using TLS encryption in transit, AES-256 encryption at rest, access controls, regular penetration testing and SOC 2-aligned security practices.'
                    },
                    {
                        title: '10. Contact',
                        body: 'Welrent B.V. · Keizersgracht 123, 1015 CW Amsterdam, Netherlands · privacy@welrent.com'
                    },
                ].map((s) => (
                    <div key={s.title} style={{ marginBottom: '36px' }}>
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px' }}>{s.title}</h2>
                        <p style={{ color: '#6B7280', lineHeight: 1.75, fontSize: '0.95rem' }}>{s.body}</p>
                    </div>
                ))}

                <div style={{ marginTop: '60px', padding: '24px', background: '#F4F5F7', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Also read our{' '}
                        <Link href="/terms" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>Terms of Service</Link>
                        {' '}and{' '}
                        <Link href="/locations" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>find a Welrent location near you</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
