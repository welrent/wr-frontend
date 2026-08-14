export default async function Vehicle({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let vehicle = null;
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    try {
        if (apiBase) {
            const res = await fetch(`${apiBase}/api/vehicle/${slug}`, { cache: "no-store" });
            if (res.ok) {
                vehicle = await res.json();
            }
        }
    } catch (e) {}

    if (!vehicle) {
        return (
            <div className="container" style={{ padding: '150px 0', textAlign: 'center' }}>
                <h1>Vehicle Not Found</h1>
                <p style={{ marginTop: '20px', color: '#8C929A' }}>
                    This vehicle is not available or the listing could not be loaded.
                </p>
                <a href="/offerlist" style={{ display: 'inline-block', marginTop: '30px', background: '#1C263A', color: '#fff', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>
                    Browse Vehicles
                </a>
            </div>
        );
    }

    return (
        <div className="page-wrapper" style={{ background: vehicle.is_dark_mode ? '#1C263A' : '#F4F5F7', color: vehicle.is_dark_mode ? '#fff' : '#1C263A', minHeight: '100vh', padding: '120px 0' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '10px' }}>{vehicle.subtitle}</div>
                        <h1 style={{ fontSize: '4rem', fontWeight: 800, margin: '0 0 30px', lineHeight: 1 }}>{vehicle.name}</h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '40px', lineHeight: 1.6 }}>Experience the unmatched capabilities of {vehicle.name}. The perfect companion for your journey starts here.</p>
                        <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
                            ${vehicle.price || 150} <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.6 }}>/ day</span>
                        </div>
                        <button style={{ background: '#FF4D4D', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                            Book Now
                        </button>
                    </div>
                    <div>
                        <img src={`/${vehicle.photo_url}`} alt={vehicle.name} style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.2))' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
