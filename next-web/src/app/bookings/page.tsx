'use client';

import React, { useState } from 'react';

const mockBookings = [
    {
        id: 'WLR-8829',
        type: 'car',
        name: 'Audi RS6 Avant',
        img: '/assets/WLR_CAR_RS6.png',
        status: 'Confirmed',
        dates: 'Apr 24 - Apr 27, 2026',
        location: 'Monaco Harbor',
        total: '€2,850',
        active: true
    },
    {
        id: 'WLR-7712',
        type: 'boat',
        name: 'Mangusta 108',
        img: 'https://images.unsplash.com/photo-1567899103394-47306264515b?q=80&w=800&auto=format&fit=crop',
        status: 'Completed',
        dates: 'Mar 15 - Mar 16, 2026',
        location: 'Dubai Marina',
        total: '€12,500',
        active: false
    }
];

export default function BookingsPage() {
    const [tab, setTab] = useState('active');

    const filtered = mockBookings.filter(b => tab === 'active' ? b.active : !b.active);

    return (
        <div className="bookings-page">
            <div className="container">
                <header className="page-header">
                    <h1>My Bookings</h1>
                    <p>Manage your active rentals and view your transaction history.</p>
                </header>

                <div className="tabs">
                    <button 
                        className={`tab-btn ${tab === 'active' ? 'active' : ''}`}
                        onClick={() => setTab('active')}
                    >
                        Upcoming & Active
                    </button>
                    <button 
                        className={`tab-btn ${tab === 'history' ? 'active' : ''}`}
                        onClick={() => setTab('history')}
                    >
                        History
                    </button>
                </div>

                <div className="bookings-list">
                    {(filtered || []).length > 0 ? (
                        (filtered || []).map(b => (
                            <div key={b?.id || Math.random()} className="booking-card">
                                <div className="booking-img">
                                    <img src={b.img} alt={b.name} />
                                    <span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                                </div>
                                <div className="booking-details">
                                    <div className="details-header">
                                        <div>
                                            <span className="booking-id">ID: {b.id}</span>
                                            <h3>{b.name}</h3>
                                        </div>
                                        <div className="price-tag">{b.total}</div>
                                    </div>
                                    
                                    <div className="details-grid">
                                        <div className="data-item">
                                            <label>Dates</label>
                                            <span>{b.dates}</span>
                                        </div>
                                        <div className="data-item">
                                            <label>Location</label>
                                            <span>{b.location}</span>
                                        </div>
                                    </div>

                                    <div className="booking-actions">
                                        <button className="btn-manage">Manage Booking</button>
                                        <button className="btn-contact">Contact Owner</button>
                                        {b.active && <button className="btn-cancel">Cancel</button>}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <p>No {tab} bookings found.</p>
                            <button className="btn-primary" style={{ marginTop: '15px' }}>Rent something new</button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .bookings-page { padding: 100px 0 60px 0; background: #F8F9FB; min-height: 90vh; }
                .page-header { margin-bottom: 40px; }
                .page-header h1 { font-family: 'Playfair Display', serif; font-size: 3rem; color: var(--text-primary); margin-bottom: 12px; }
                .page-header p { color: #6B7280; font-size: 1.15rem; max-width: 600px; line-height: 1.6; }

                .tabs { display: flex; gap: 40px; border-bottom: 1px solid #E5E7EB; margin-bottom: 50px; }
                .tab-btn {
                    padding: 20px 0;
                    background: transparent;
                    border: none;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 0.85rem;
                    color: #8C929A;
                    cursor: pointer;
                    position: relative;
                    transition: 0.2s;
                }
                .tab-btn:hover { color: var(--text-primary); }
                .tab-btn.active { color: var(--accent-blue); }
                .tab-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: -1px; left: 0; width: 100%; height: 3px;
                    background: var(--accent-blue);
                    border-radius: 3px;
                }

                .bookings-list { display: flex; flex-direction: column; gap: 30px; }
                .booking-card {
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.04);
                    border: 1px solid #F0F2F5;
                    transition: transform 0.3s ease;
                }
                .booking-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.06); }
                .booking-img { position: relative; height: 100%; min-height: 200px; }
                .booking-img img { width: 100%; height: 100%; object-fit: cover; }
                .status-badge {
                    position: absolute;
                    top: 15px; left: 15px;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    background: white;
                }
                .status-badge.confirmed { color: #00B67A; }
                .status-badge.completed { color: #8C929A; }

                .booking-details { padding: 30px; display: flex; flex-direction: column; }
                .details-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; }
                .booking-id { font-size: 0.75rem; color: #8C929A; font-weight: 700; margin-bottom: 4px; display: block; }
                .details-header h3 { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); }
                .price-tag { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); }

                .details-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-bottom: 30px; }
                .data-item label { display: block; font-size: 0.75rem; text-transform: uppercase; color: #8C929A; font-weight: 700; margin-bottom: 6px; }
                .data-item span { font-size: 1rem; color: var(--text-primary); font-weight: 600; }

                .booking-actions { display: flex; gap: 12px; border-top: 1px solid #F0F2F5; padding-top: 25px; margin-top: auto; }
                .btn-manage, .btn-contact, .btn-cancel {
                    padding: 10px 20px;
                    border-radius: 6px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .btn-manage { background: var(--text-primary); color: white; border: none; }
                .btn-manage:hover { opacity: 0.9; }
                .btn-contact { background: #F3F4F6; color: var(--text-primary); border: none; }
                .btn-contact:hover { background: #E5E7EB; }
                .btn-cancel { background: transparent; color: #EF4444; border: 1px solid #FEE2E2; }
                .btn-cancel:hover { background: #FEF2F2; }

                .empty-state {
                    text-align: center;
                    padding: 100px 0;
                    color: #8C929A;
                }
                .empty-state svg { width: 60px; height: 60px; margin-bottom: 20px; opacity: 0.4; }

                @media (max-width: 900px) {
                    .booking-card { grid-template-columns: 1fr; }
                    .details-grid { grid-template-columns: 1fr; gap: 15px; }
                    .booking-actions { flex-direction: column; }
                }
            `}</style>
        </div>
    );
}
