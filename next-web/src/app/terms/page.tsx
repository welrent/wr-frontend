import Link from 'next/link';

export const metadata = { title: 'Terms of Service – Welrent', description: 'The terms governing your use of the Welrent platform.' };

export default function TermsPage() {
    return (
        <div className="page-wrapper" style={{ paddingBottom: '80px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ paddingTop: '40px', paddingBottom: '60px', borderBottom: '1px solid #F0F2F5', marginBottom: '40px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Legal</span>
                    <h1 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", fontWeight: 400, marginTop: '12px', lineHeight: 1.2 }}>Terms of Service</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '16px', fontSize: '0.95rem' }}>Last updated: April 8, 2025</p>
                </div>

                {[
                    {
                        title: '1. Acceptance of Terms',
                        body: 'By creating a Welrent account or using our platform you agree to these Terms of Service and our Privacy Policy. If you do not agree, you may not use the service. These terms constitute a binding legal agreement between you and Welrent B.V.'
                    },
                    {
                        title: '2. Eligibility',
                        body: 'You must be at least 21 years old, hold a valid driving licence recognised in the country of rental, and have held that licence for a minimum of 2 years. Corporate accounts may set additional eligibility criteria.'
                    },
                    {
                        title: '3. Booking & Payment',
                        body: 'Bookings are confirmed upon successful payment authorisation. Prices are inclusive of VAT and the standard insurance package. Optional extras (GPS, child seat, additional driver) are itemised at checkout. We reserve the right to cancel bookings in cases of suspected fraud.'
                    },
                    {
                        title: '4. Vehicle Use',
                        body: 'Vehicles must be used only by authorised drivers listed on the booking. Smoking, pets (unless specifically permitted) and off-road use are prohibited. You are responsible for traffic violations, tolls and parking fines incurred during your booking period.'
                    },
                    {
                        title: '5. Cancellation Policy',
                        body: 'Cancellations made more than 24 hours before the scheduled pick-up time receive a full refund. Cancellations within 24 hours forfeit 50% of the booking value. No-shows forfeit the full booking amount.'
                    },
                    {
                        title: '6. Insurance & Liability',
                        body: 'A basic Collision Damage Waiver (CDW) and Theft Protection (TP) are included in every booking. The excess (own risk) is stated on the booking confirmation. You may purchase excess waiver to reduce your liability to €0. Wilful damage and DUI incidents void all cover.'
                    },
                    {
                        title: '7. Damage Reporting',
                        body: 'Any damage discovered at pick-up must be documented in the Welrent app before departing. Damage reported after return that is not pre-documented will be charged to the driver. A damage assessment report will be provided within 5 business days.'
                    },
                    {
                        title: '8. Platform Rules',
                        body: 'You may not scrape, reverse-engineer or commercially resell access to the Welrent platform. Accounts found to list fraudulent vehicles or submit false reviews will be permanently banned and may face legal action.'
                    },
                    {
                        title: '9. Governing Law',
                        body: 'These Terms are governed by Dutch law. Disputes shall be submitted to the competent court in Amsterdam, the Netherlands, unless mandatory consumer-protection rules in your country of residence require otherwise.'
                    },
                    {
                        title: '10. Changes to Terms',
                        body: 'We may update these Terms at any time. We will notify you via email and in-app notification at least 30 days before material changes take effect. Continued use after that date constitutes acceptance.'
                    },
                ].map((s) => (
                    <div key={s.title} style={{ marginBottom: '36px' }}>
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px' }}>{s.title}</h2>
                        <p style={{ color: '#6B7280', lineHeight: 1.75, fontSize: '0.95rem' }}>{s.body}</p>
                    </div>
                ))}

                <div style={{ marginTop: '60px', padding: '24px', background: '#F4F5F7', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Questions? Contact us at{' '}
                        <a href="mailto:legal@welrent.com" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>legal@welrent.com</a>
                        . Also read our{' '}
                        <Link href="/privacy" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
