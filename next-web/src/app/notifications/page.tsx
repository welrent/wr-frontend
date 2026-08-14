'use client';

import React from 'react';

const mockNotifications = [
    { 
        id: 1, 
        type: 'booking', 
        title: 'Booking Confirmed!', 
        desc: 'Your request for the Audi RS6 in Monaco has been confirmed by the owner.', 
        time: '2 hours ago', 
        unread: true 
    },
    { 
        id: 2, 
        type: 'system', 
        title: 'Promotion: Summer in Dubai', 
        desc: 'Get 15% off all yacht rentals in Dubai Marina for the month of June.', 
        time: '1 day ago', 
        unread: false 
    },
    { 
        id: 3, 
        type: 'alert', 
        title: 'Identity Verified', 
        desc: 'Great news! Your driver\'s license has been successfully verified.', 
        time: '3 days ago', 
        unread: false 
    },
     { 
        id: 4, 
        type: 'booking', 
        title: 'Review your trip', 
        desc: 'How was your experience in Monaco? Share your feedback now.', 
        time: '1 week ago', 
        unread: false 
    }
];

export default function NotificationsPage() {
    return (
        <div className="notifications-page">
            <div className="container narrow-container">
                <header className="page-header">
                    <div className="header-top">
                        <h1>Notifications</h1>
                        <button className="mark-read">Mark all as read</button>
                    </div>
                    <p>Stay updated with your latest bookings and system alerts.</p>
                </header>

                <div className="notifications-list">
                    {(mockNotifications || []).map(notif => (
                        <div key={notif?.id || Math.random()} className={`notif-card ${(notif?.unread ?? false) ? 'unread' : ''}`}>
                            <div className={`notif-icon ${notif.type}`}>
                                {notif.type === 'booking' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
                                {notif.type === 'system' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>}
                                {notif.type === 'alert' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
                            </div>
                            <div className="notif-content">
                                <div className="notif-header">
                                    <h3>{notif.title}</h3>
                                    <span className="notif-time">{notif.time}</span>
                                </div>
                                <p>{notif.desc}</p>
                            </div>
                            {notif.unread && <div className="unread-dot"></div>}
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .notifications-page { padding: 100px 0 80px 0; background: #F8F9FB; min-height: 90vh; }
                .narrow-container { max-width: 800px; }
                .page-header { margin-bottom: 40px; }
                .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
                .page-header h1 { font-family: 'Playfair Display', serif; font-size: 3rem; color: var(--text-primary); margin: 0; }
                .mark-read { 
                    background: transparent; border: none; color: var(--accent-blue); 
                    font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; cursor: pointer; transition: 0.2s;
                }
                .mark-read:hover { color: var(--text-primary); }
                .page-header p { color: #6B7280; font-size: 1.15rem; margin-top: 5px; }

                .notifications-list { display: flex; flex-direction: column; gap: 20px; }
                .notif-card {
                    background: white;
                    padding: 30px;
                    border-radius: 20px;
                    display: flex;
                    gap: 25px;
                    align-items: flex-start;
                    position: relative;
                    border: 1px solid #F0F2F5;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.02);
                }
                .notif-card:hover { border-color: var(--accent-blue); transform: translateY(-3px); box-shadow: 0 15px 45px rgba(0,0,0,0.06); }
                .notif-card.unread { background: #F0F7FF; border-color: #D6E9FF; }

                .notif-icon {
                    width: 44px; height: 44px;
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .notif-icon svg { width: 22px; height: 22px; }
                .notif-icon.booking { background: #E6F7F0; color: #00B67A; }
                .notif-icon.system { background: #FFF7E6; color: #FAAD14; }
                .notif-icon.alert { background: #E6F4FF; color: var(--accent-blue); }

                .notif-content { flex: 1; }
                .notif-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
                .notif-header h3 { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0; }
                .notif-time { font-size: 0.8rem; color: #8C929A; font-weight: 500; }
                .notif-content p { font-size: 0.9rem; color: #6B7280; line-height: 1.5; margin: 0; }

                .unread-dot {
                    position: absolute;
                    top: 15px; right: 15px;
                    width: 8px; height: 8px;
                    background: #FF4D4F;
                    border-radius: 50%;
                }

                @media (max-width: 600px) {
                    .notif-card { padding: 16px; }
                    .notif-header { flex-direction: column; align-items: flex-start; gap: 4px; }
                    .notif-time { align-self: flex-end; }
                }
            `}</style>
        </div>
    );
}
