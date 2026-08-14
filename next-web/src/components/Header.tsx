'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Header({ navbarLinks = [] }: { navbarLinks: any[] }) {
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthLoading(false);
        });
        return () => unsub();
    }, []);

    const getDisplayName = () => {
        if (!user) return null;
        return user.displayName || user.email?.split('@')[0] || 'Account';
    };

    const handleSignOut = async () => {
        await signOut(auth);
    };

    return (
        <>
        <header className={scrolled ? 'header-scrolled' : ''}>
            <div className="container header-content">
                <div className="header-left">
                    <Link href="/" className="logo">
                        <img src="/assets/WLR_LOGO_APP.svg" alt="Welrent App Logo" />
                    </Link>
                    <div className="search-container">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" placeholder="Search..." />
                        <span className="search-kbd">⌘ K</span>
                    </div>
                </div>
                <div className="header-right">
                    {(navbarLinks || []).filter(l => {
                        const t = l?.title?.toLowerCase() || '';
                        return !t.includes('booking') && !t.includes('notification') && !t.includes('chat');
                    }).map((link, idx) => (
                        <a key={idx} href={link.url}>{link.title}</a>
                    ))}

                    <div className="header-shortcuts">
                        <Link href="/offerlist?type=motorbike" className="utility-icon" title="Motorbikes">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle><path d="M12 18V9c0-1.1.9-2 2-2h3l2 2v2"></path><path d="M16 9h4"></path><path d="M7 18h10"></path><path d="M9 10l-2 2"></path></svg>
                        </Link>
                        <Link href="/offerlist?type=car" className="utility-icon" title="Cars">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11 1 11.7 1 12.5V16c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg>
                        </Link>
                        <Link href="/offerlist?type=boat" className="utility-icon" title="Boats">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c.6 0 1.2.2 1.6.6l3.8 3.8a2 2 0 0 0 2.8 0l3.8-3.8c.4-.4 1-.6 1.6-.6h6.2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H2v-6z"></path><path d="M11 12V3"></path><path d="M15 7l-4-4-4 4"></path></svg>
                        </Link>
                    </div>

                    <div className="header-divider"></div>

                    {user && (
                        <div className="header-utility-icons">
                            <Link href="/chat" className="utility-icon" title="Chat">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </Link>
                            <Link href="/bookings" className="utility-icon" title="My Bookings">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </Link>
                            <Link href="/notifications" className="utility-icon" title="Notifications">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                <span className="notification-dot"></span>
                            </Link>
                        </div>
                    )}

                    {authLoading ? (
                        <span className="auth-loading-dot" />
                    ) : user ? (
                        <Link href="/account" className="header-username">{getDisplayName()}</Link>
                    ) : (
                        <Link href="/login" className="header-login-link">You are not logged in</Link>
                    )}

                    <Link href={user ? '/account' : '/login'} className="user-avatar">
                        {user && user.photoURL ? (
                            <img src={user.photoURL} alt={getDisplayName() || 'User'} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        )}
                    </Link>
                </div>
            </div>
            {/* Mobile-only auth row */}
            <div className="mobile-auth-strip">
                <a href="https://act.welrent.com" className="mobile-auth-act">Welrent Act</a>
                <span className="mobile-auth-sep">·</span>
                {authLoading ? (
                    <span className="mobile-auth-status">...</span>
                ) : user ? (
                    <Link href="/account" className="mobile-auth-status" style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>
                        {getDisplayName()}
                    </Link>
                ) : (
                    <Link href="/login" className="mobile-auth-status">You are not logged in</Link>
                )}
            </div>
        </header>

        <div className="mobile-app-nav-bar">
            <Link href="/" className="bottom-nav-item active">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <span>Home</span>
            </Link>
            {(navbarLinks || []).filter(l => {
                const t = l?.title?.toLowerCase() || '';
                return !t.includes('booking') && !t.includes('notification') && !t.includes('chat');
            }).map((link, idx) => (
                <a key={idx} href={link.url} className="bottom-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>{link.title}</span>
                </a>
            ))}
            <Link href={user ? '/account' : '/login'} className="bottom-nav-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>{user ? 'Account' : 'Login'}</span>
            </Link>
        </div>
        </>
    );
}
