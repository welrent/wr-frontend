import { fetchCars } from '@/lib/api';

export default async function Offerlist({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await searchParams;
    const cars = await fetchCars();
    const locationParam = resolvedParams.location;
    const location = Array.isArray(locationParam)
        ? locationParam[0]
        : locationParam || 'Anywhere';

    return (
        <div className="page-wrapper">
            <div className="container" style={{ padding: '120px 0 60px 0' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '40px', fontWeight: 600 }}>Available Vehicles</h1>
                
                <div style={{ marginBottom: '40px', display: 'flex', gap: '20px' }}>
                    <div className="field" style={{ flex: 1, background: '#fff', padding: '15px', borderRadius: '12px' }}>
                        <span style={{ color: '#8C929A', fontSize: '0.85rem' }}>Location</span>
                        <div style={{ fontWeight: 500 }}>{location}</div>
                    </div>
                </div>

                {cars.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: '#8C929A' }}>
                        <p style={{ fontSize: '1.1rem' }}>No vehicles available at the moment. Check back soon!</p>
                    </div>
                ) : (
                    <div className="listings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                        {cars.map((car) => (
                            <div key={car.id} style={{ background: car.is_dark_mode ? '#1C263A' : '#fff', color: car.is_dark_mode ? '#fff' : '#1C263A', borderRadius: '16px', padding: '30px 20px', position: 'relative' }}>
                                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{car.subtitle}</div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '5px 0 20px' }}>{car.name}</h3>
                                <img src={`/${car.photo_url}`} alt={car.name} style={{ width: '100%', height: '180px', objectFit: 'contain', margin: '0 auto' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>${car.price || 150} <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>/ day</span></div>
                                    <a href={`/vehicle/${car.slug}`} style={{ background: car.is_dark_mode ? '#fff' : '#000', color: car.is_dark_mode ? '#000' : '#fff', padding: '10px 20px', borderRadius: '100px', fontWeight: 500, textDecoration: 'none' }}>View Deal</a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
