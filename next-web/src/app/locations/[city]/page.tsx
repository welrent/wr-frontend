'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const destinationData: Record<string, any> = {
    'monaco': {
        name: 'Monaco',
        fullName: 'Monaco (Monte Carlo)',
        price: 'from €1,200+',
        img: '/assets/4ip15b4ip15b4ip1.png',
        about: 'Experience the pinnacle of Mediterranean luxury in Monaco. From the legendary Casino de Monte-Carlo to the world-famous Grand Prix circuit, Monaco is a playground for the elite. Our fleet in the Principality features only the finest hypercars and superyachts, ensuring you move through its glamorous streets and turquoise waters with unparalleled prestige.',
        cars: [
            { name: 'Ferrari F8 Spider', price: '€1,800/day', specs: '710 HP | 2.9s 0-100', img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop' },
            { name: 'Lamborghini Huracán EVO', price: '€1,650/day', specs: '640 HP | AWD', img: 'https://images.unsplash.com/photo-1511919884226-c90a15321685?q=80&w=800&auto=format&fit=crop' }
        ],
        boats: [
            { name: 'Mangusta 108', price: '€12,500/day', specs: '33m | 12 Guests', img: 'https://images.unsplash.com/photo-1567899103394-47306264515b?q=80&w=800&auto=format&fit=crop' },
            { name: 'Pershing 82', price: '€9,800/day', specs: '25m | 35 knots', img: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop' }
        ]
    },
    'malta': {
        name: 'Malta',
        fullName: 'Valletta & The Islands',
        price: 'from €450+',
        img: '/assets/1y9lb61y9lb61y9l.png',
        about: 'Malta combines 7,000 years of history with a vibrant, modern island lifestyle. Navigate the honey-colored streets of Valletta or sail to the crystal-clear Blue Lagoon of Comino. Our Malta selection balances historic charm with modern performance, offering versatile SUVs for inland exploration and elegant sailing vessels for the archipelago.',
        cars: [
            { name: 'Range Rover Sport', price: '€450/day', specs: 'Luxury SUV | AWD', img: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=800&auto=format&fit=crop' },
            { name: 'Mercedes-Benz G-Class', price: '€650/day', specs: 'Off-road King', img: 'https://images.unsplash.com/photo-1520031441870-4c041ad35613?q=80&w=800&auto=format&fit=crop' }
        ],
        boats: [
            { name: 'Bavaria C45', price: '€1,200/day', specs: '14m | Sailing Yacht', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop' },
            { name: 'Princess V55', price: '€3,500/day', specs: '17m | Motor Yacht', img: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=800&auto=format&fit=crop' }
        ]
    },
    'marbella': {
        name: 'Marbella',
        fullName: 'Marbella & Puerto Banús',
        price: 'from €850+',
        img: '/assets/g2btng2btng2btng.png',
        about: 'From the exclusive Golden Mile to the high-end boutiques of Puerto Banús, Marbella is the crown jewel of the Costa del Sol. Enjoy year-round sunshine in a convertible supercar or host an unforgettable afternoon on a luxury catamaran. Welrent Marbella puts the keys to the Mediterranean lifestyle in the palm of your hand.',
        cars: [
            { name: 'Porsche 911 Carrera S', price: '€850/day', specs: 'Convertible | 450 HP', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop' },
            { name: 'Aston Martin Vantage', price: '€1,100/day', specs: 'V8 | British Elegance', img: 'https://images.unsplash.com/photo-1593452093510-019685ed199d?q=80&w=800&auto=format&fit=crop' }
        ],
        boats: [
            { name: 'Sunseeker Predator 68', price: '€5,500/day', specs: '21m | 6 Guests', img: 'https://images.unsplash.com/photo-1567899103394-47306264515b?q=80&w=800&auto=format&fit=crop' },
            { name: 'Lagoon 450 F', price: '€1,800/day', specs: '14m | Luxury Catamaran', img: 'https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=800&auto=format&fit=crop' }
        ]
    },
    'dubai-marina': {
        name: 'Dubai Marina',
        fullName: 'Dubai Marina & The Palm',
        price: 'from €1,100+',
        img: '/assets/laqs3ulaqs3ulaqs.png',
        about: 'Dubai Marina is where futuristic architecture meets the Arabian Gulf. Drive through a canyon of skyscrapers in a McLaren or cruise around the Palm Jumeirah on a triple-deck yacht. In a city where everything is bigger and better, Welrent providing the ultimate fleet to match its world-class standards.',
        cars: [
            { name: 'McLaren 720S', price: '€1,200/day', specs: '720 HP | Carbon Fiber', img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop' },
            { name: 'Rolls-Royce Cullinan', price: '€2,500/day', specs: 'Ultra Luxury SUV', img: 'https://images.unsplash.com/photo-1631214499558-75e1823eb91e?q=80&w=800&auto=format&fit=crop' }
        ],
        boats: [
            { name: 'Azimut 80', price: '€4,500/hour', specs: '24m | Italian Style', img: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=800&auto=format&fit=crop' },
            { name: 'Sanlorenzo SL102', price: '€18,000/day', specs: '31m | Asymmetric Design', img: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop' }
        ]
    }
};

const FleetCard = ({ item }: { item: any }) => (
    <div className="fleet-card">
        <div className="fleet-img">
            <img src={item.img} alt={item.name} />
            <div className="fleet-badge">Available</div>
        </div>
        <div className="fleet-info">
            <div className="fleet-header">
                <h3>{item.name}</h3>
                <span className="fleet-price">{item.price.split('/')[0]}<span>/{item.price.split('/')[1] || 'day'}</span></span>
            </div>
            <p className="fleet-specs">{item.specs}</p>
            <button className="btn-fleet">Reserve now</button>
        </div>
    </div>
);

export default function LocationPage() {
    const params = useParams();
    const city = params?.city as string;
    const data = destinationData[city.toLowerCase()] || destinationData['monaco']; // Fallback for demo

    return (
        <div className="page-wrapper" style={{ paddingBottom: '0' }}>
            <div className="dest-hero">
                <img src={data.img} alt={data.name} className="dest-hero-bg" />
                <div className="dest-hero-overlay" />
                <div className="container">
                    <div className="dest-hero-content">
                        <span className="dest-label">Top Destination</span>
                        <h1>{data.fullName}</h1>
                        <p className="dest-price">Fleet starting {data.price}</p>
                        <div className="dest-hero-actions">
                            <button className="btn-primary">Explore Fleet</button>
                            <button className="btn-secondary">Request Concierge</button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="dest-about">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-text">
                            <h2>About the City</h2>
                            <p>{data.about}</p>
                        </div>
                        <div className="about-stats">
                            <div className="stat-card">
                                <h3>250+</h3>
                                <p>Vehicles Available</p>
                            </div>
                            <div className="stat-card">
                                <h3>24/7</h3>
                                <p>On-site Support</p>
                            </div>
                            <div className="stat-card">
                                <h3>100%</h3>
                                <p>Digital Access</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="fleet-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Curated Car Fleet</h2>
                        <Link href="/offerlist" className="view-all">View All Cars</Link>
                    </div>
                    <div className="fleet-grid">
                        {data.cars.map((car: any, i: number) => (
                            <FleetCard key={i} item={car} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="fleet-section" style={{ background: '#F8F9FB' }}>
                <div className="container">
                    <div className="section-header">
                        <h2>Luxury Vessel Collection</h2>
                        <Link href="/offerlist" className="view-all">View All Boats</Link>
                    </div>
                    <div className="fleet-scroll-container">
                        <div className="fleet-grid horizontal-swipe">
                            {data.boats.map((boat: any, i: number) => (
                                <FleetCard key={i} item={boat} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                .dest-hero {
                    position: relative;
                    height: 70vh;
                    min-height: 550px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }
                .dest-hero-bg {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    object-fit: cover;
                    z-index: 1;
                }
                .dest-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to right, rgba(28, 38, 58, 0.8) 0%, rgba(28, 38, 58, 0.4) 50%, transparent 100%);
                    z-index: 2;
                }
                .dest-hero-content {
                    position: relative;
                    z-index: 3;
                    max-width: 600px;
                    color: white;
                }
                .dest-label {
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--accent-blue);
                    display: block;
                    margin-bottom: 15px;
                }
                .dest-hero-content h1 {
                    font-family: 'Playfair Display', serif;
                    font-size: 4.5rem;
                    line-height: 1.1;
                    margin-bottom: 20px;
                }
                .dest-price {
                    font-size: 1.25rem;
                    opacity: 0.9;
                    margin-bottom: 35px;
                }
                .dest-hero-actions {
                    display: flex;
                    gap: 15px;
                }
                .btn-secondary {
                    background: rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(12px) saturate(180%);
                    -webkit-backdrop-filter: blur(12px) saturate(180%);
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    padding: 0 28px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    text-transform: none;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }
                .btn-primary { 
                    height: 48px; 
                    margin-top: 0; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    padding: 0 28px; 
                }
                .btn-secondary:hover { 
                    background: rgba(255, 255, 255, 0.15);
                    border-color: rgba(255, 255, 255, 0.5);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                }
                .btn-secondary:active {
                    transform: translateY(0);
                }

                .dest-about { padding: 100px 0; }
                .about-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 80px;
                    align-items: center;
                }
                .about-text h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 25px;
                    color: var(--text-primary);
                }
                .about-text p {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #6B7280;
                }
                .about-stats {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
                .stat-card {
                    background: #F8F9FB;
                    padding: 24px;
                    border-radius: 12px;
                    text-align: center;
                }
                .stat-card h3 { font-size: 1.5rem; font-weight: 700; color: var(--accent-blue); }
                .stat-card p { font-size: 0.85rem; color: #8C929A; margin-top: 5px; }

                .fleet-section { padding: 80px 0; }
                .fleet-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 30px;
                }
                .fleet-card {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.04);
                    transition: transform 0.3s ease;
                }
                .fleet-card:hover { transform: translateY(-5px); }
                .fleet-img {
                    height: 240px;
                    position: relative;
                }
                .fleet-img img { width: 100%; height: 100%; object-fit: cover; }
                .fleet-badge {
                    position: absolute;
                    top: 15px; right: 15px;
                    background: rgba(255,255,255,0.9);
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #00B67A;
                }
                .fleet-info { padding: 25px; }
                .fleet-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 10px;
                }
                .fleet-header h3 { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
                .fleet-price { font-size: 1.15rem; font-weight: 700; color: var(--text-primary); }
                .fleet-price span { font-size: 0.85rem; color: #8C929A; font-weight: 400; }
                .fleet-specs { font-size: 0.9rem; color: #6B7280; margin-bottom: 25px; }
                .btn-fleet {
                    width: 100%;
                    padding: 12px;
                    background: var(--accent-blue);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.2s;
                    box-shadow: 0 4px 12px rgba(92,170,246,0.2);
                }
                .btn-fleet:hover { background: #4a98e0; transform: translateY(-1px); }

                .fleet-scroll-container {
                    margin: 0 -20px;
                    padding: 0 20px;
                    overflow-x: auto;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .fleet-scroll-container::-webkit-scrollbar { display: none; }
                
                .horizontal-swipe {
                    display: flex !important;
                    flex-wrap: nowrap;
                    gap: 20px;
                    padding-bottom: 20px;
                }
                .horizontal-swipe .fleet-card {
                    min-width: 320px;
                    flex: 0 0 320px;
                }
                .view-all { color: var(--accent-blue); text-decoration: none; font-weight: 600; font-size: 0.9rem; }

                @media (max-width: 900px) {
                    .dest-hero-content h1 { font-size: 3rem; }
                    .about-grid { grid-template-columns: 1fr; gap: 40px; }
                    .fleet-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
