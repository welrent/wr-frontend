'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [vType, setVType] = useState('car');
    const [location, setLocation] = useState('Long Beach, California');

    const detectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    setLocation('Amsterdam Central');
                    alert("Location detected: Amsterdam Central");
                },
                () => alert("Please allow location access to automatically detect.")
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="page-wrapper">
            <div className="container">
                <section className="hero-rs6">
                    <div className="hero-content">
                        <div className="hero-text-container huge-text">
                            <span className="rent">Rent...</span><br/>
                            <span className="car-name">an RS6</span>
                        </div>
                        
                        <div className="car-display">
                            <img src="/assets/WLR_CAR_RS6.png" alt="Audi RS6" />
                            <div className="arrows">
                                <button className="arrow-btn active">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                                <button className="arrow-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="search-widget" style={{ marginTop: '180px' }}>
                        <div className="tabs">
                            <div className={`tab ${vType === 'car' ? 'active' : ''}`} onClick={() => setVType('car')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="10" width="18" height="9" rx="2"></rect>
                                    <path d="M4 10L6.5 5h11l2.5 5"></path><circle cx="7" cy="19" r="2"></circle><circle cx="17" cy="19" r="2"></circle>
                                </svg>
                                Car
                            </div>
                            <div className={`tab ${vType === 'motorcycle' ? 'active' : ''}`} onClick={() => setVType('motorcycle')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="5.5" cy="15.5" r="3.5"></circle><circle cx="18.5" cy="15.5" r="3.5"></circle>
                                    <path d="M15 6a3.5 3.5 0 1 0-7 0"></path><path d="M12 9v6"></path><path d="M7 12h10"></path>
                                </svg>
                                Motorcycle
                            </div>
                        </div>
                        <form action="/offerlist" method="GET" className="search-fields">
                            <input type="hidden" name="type" value={vType} />
                            <div className="field" style={{ position: 'relative' }}>
                                <label>Location</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <select name="location" value={location} onChange={e => setLocation(e.target.value)} style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', color: '#8C929A', fontWeight: 400, width: '100%', WebkitAppearance: 'none', cursor: 'pointer' }}>
                                        <option value="Long Beach, California">Long Beach, California</option>
                                        <option value="Amsterdam Central">Amsterdam Central</option>
                                        <option value="Rotterdam Airport">Rotterdam Airport</option>
                                        <option value="Brussels Center">Brussels Center</option>
                                    </select>
                                    <button type="button" onClick={detectLocation} title="Detect Location" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#AAB4BF' }}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="field">
                                <label>Start</label>
                                <input type="datetime-local" name="start" defaultValue="2026-12-16T22:30" style={{ width: '100%', fontFamily: 'Outfit', border: 'none', color: '#8C929A', background: 'transparent' }} />
                            </div>
                            <div className="field">
                                <label>End</label>
                                <input type="datetime-local" name="end" defaultValue="2026-12-16T22:30" style={{ width: '100%', fontFamily: 'Outfit', border: 'none', color: '#8C929A', background: 'transparent' }} />
                            </div>
                            <div className="field" style={{ flex: '0 0 auto', padding: '0 0 0 20px' }}>
                                <button type="submit" className="btn-search">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>

            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Explore Our Car Categories</h2>
                        <div className="nav-controls">
                            <button className="nav-btn prev">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                            <button className="nav-btn next">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </div>
                    </div>
                    <div className="categories-scroll">
                        {[
                            { name: 'Hatchback', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'Minivan', img: 'https://images.unsplash.com/photo-1570733577524-73d84f09fd33?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'Sports Car', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'Pickup Truck', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'SUV', img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2070&auto=format&fit=crop' }
                        ].map((cat, i) => (
                            <div key={i} className="category-card">
                                <span className="category-badge">{cat.name}</span>
                                <div className="category-img">
                                    <img src={cat.img} alt={cat.name} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="hero-evo">
                <div className="container">
                    <div className="evo-car">
                        <img src="/assets/WLR_cr5m8ccr5m8ccr5.png" alt="Luxury Yacht" style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <div className="evo-text" style={{ marginLeft: 'auto' }}>
                        <div className="huge-text">
                            <span className="rent">Rent...</span><br/>
                            <span className="car-name">a Yacht</span>
                        </div>
                        <button className="btn-primary">Request assistance</button>
                    </div>
                </div>
            </section>

            <section className="destinations-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Top Rental Destinations</h2>
                    </div>
                    <div className="destination-grid">
                        {[
                            { city: 'Monaco', slug: 'monaco', price: 'from €1,200+', img: '/assets/4ip15b4ip15b4ip1.png' },
                            { city: 'Malta', slug: 'malta', price: 'from €450+', img: '/assets/1y9lb61y9lb61y9l.png' },
                            { city: 'Marbella, Spain', slug: 'marbella', price: 'from €850+', img: '/assets/g2btng2btng2btng.png' },
                            { city: 'Dubai Marina', slug: 'dubai-marina', price: 'from €1,100+', img: '/assets/laqs3ulaqs3ulaqs.png' }
                        ].map((dest, i) => (
                            <Link key={i} href={`/locations/${dest.slug}`} className="destination-card" style={{ textDecoration: 'none' }}>
                                <div className="destination-img">
                                    <img src={dest.img} alt={dest.city} />
                                </div>
                                <div className="destination-info">
                                    <h3>{dest.city}</h3>
                                    <p>Vehicles {dest.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
