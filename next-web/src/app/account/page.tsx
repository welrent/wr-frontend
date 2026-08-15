'use client';
import { useEffect, useRef, useState } from 'react';
import {
    onAuthStateChanged,
    updateProfile,
    signOut,
    User,
} from 'firebase/auth';
import {
    ref as storageRef,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';
import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { auth, storage, db, isFirebaseConfigured } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/* ── Types ─────────────────────────────────────────────────────── */
interface Rental {
    booking_ref: string;
    car_name: string;
    car_image: string;
    start_date: string;
    end_date: string;
    days: number;
    price: number;
    status: 'upcoming' | 'active' | 'completed' | 'cancelled';
    location: string;
}

/* ── Status Badge ───────────────────────────────────────────────── */
function StatusBadge({ status }: { status: Rental['status'] }) {
    const map: Record<string, [string, string]> = {
        completed: ['acct-badge--completed', 'Completed'],
        active:    ['acct-badge--active',    'Active'],
        upcoming:  ['acct-badge--upcoming',  'Upcoming'],
        cancelled: ['acct-badge--cancelled', 'Cancelled'],
    };
    const [cls, label] = map[status] ?? ['', status];
    return <span className={`acct-badge ${cls}`}>{label}</span>;
}

/* ── Main Page ──────────────────────────────────────────────────── */
export default function AccountPage() {
    const router   = useRouter();
    const fileRef  = useRef<HTMLInputElement>(null);

    const [user,        setUser]        = useState<User | null>(null);
    const [loading,     setLoading]     = useState(true);
    const [rentals,     setRentals]     = useState<Rental[]>([]);
    const [rentalsLoad, setRentalsLoad] = useState(false);

    // bio
    const [bio,       setBio]       = useState('');
    const [editBio,   setEditBio]   = useState(false);
    const [bioInput,  setBioInput]  = useState('');
    const [savingBio, setSavingBio] = useState(false);

    // name
    const [editName,   setEditName]   = useState(false);
    const [nameInput,  setNameInput]  = useState('');
    const [savingName, setSavingName] = useState(false);

    // photo upload
    const [uploadPct,    setUploadPct]    = useState<number | null>(null);
    const [uploadError,  setUploadError]  = useState('');
    const [localPhotoURL, setLocalPhotoURL] = useState('');

    // sign-out
    const [signingOut, setSigningOut] = useState(false);

    /* ── Load user + Firestore profile ─────────────────────────── */
    useEffect(() => {
        if (!isFirebaseConfigured || !auth) {
            setLoading(false);
            router.push('/login');
            return;
        }
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (!u) { router.push('/login'); return; }
            setUser(u);
            setNameInput(u.displayName || '');
            setLocalPhotoURL(u.photoURL || '');

            // Load bio from Firestore
            if (db) {
                try {
                    const snap = await getDoc(doc(db, 'users', u.uid));
                    if (snap.exists()) {
                        setBio(snap.data().bio || '');
                    } else {
                        setBio('');
                    }
                } catch { /* offline / rules */ }
            }

            setLoading(false);
        });
        return () => unsub();
    }, [router]);

    /* ── Load rentals from PHP API ──────────────────────────────── */
    useEffect(() => {
        if (!user) return;
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!apiBase) return;
        setRentalsLoad(true);
        fetch(`${apiBase}/api/rentals?uid=${encodeURIComponent(user.uid)}`)
            .then(r => r.ok ? r.json() : { rentals: [] })
            .then(data => setRentals(data.rentals || []))
            .catch(() => setRentals([]))
            .finally(() => setRentalsLoad(false));
    }, [user]);

    /* ── Photo upload ───────────────────────────────────────────── */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user || !storage) return;
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('Photo must be under 5 MB.');
            return;
        }
        setUploadError('');
        setUploadPct(0);

        const sRef = storageRef(storage, `avatars/${user.uid}`);
        const task = uploadBytesResumable(sRef, file, { contentType: file.type });

        task.on(
            'state_changed',
            snap => setUploadPct(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
            () => { setUploadError('Upload failed. Try again.'); setUploadPct(null); },
            async () => {
                const url = await getDownloadURL(task.snapshot.ref);
                await updateProfile(user, { photoURL: url });
                setLocalPhotoURL(url);
                setUser(prev => prev ? { ...prev, photoURL: url } as User : prev);
                setUploadPct(null);
            }
        );
    };

    /* ── Save name ──────────────────────────────────────────────── */
    const handleSaveName = async () => {
        if (!user || !nameInput.trim()) return;
        setSavingName(true);
        await updateProfile(user, { displayName: nameInput.trim() });
        setUser(prev => prev ? { ...prev, displayName: nameInput.trim() } as User : prev);
        setSavingName(false);
        setEditName(false);
    };

    /* ── Save bio (Firestore) ───────────────────────────────────── */
    const handleSaveBio = async () => {
        if (!user || !db) return;
        setSavingBio(true);
        await setDoc(doc(db, 'users', user.uid), {
            bio: bioInput,
            updatedAt: serverTimestamp(),
        }, { merge: true });
        setBio(bioInput);
        setEditBio(false);
        setSavingBio(false);
    };

    /* ── Sign out ───────────────────────────────────────────────── */
    const handleSignOut = async () => {
        if (!auth) return;
        setSigningOut(true);
        await signOut(auth);
        router.push('/');
    };

    /* ── Loading / guard ────────────────────────────────────────── */
    if (loading) {
        return (
            <div className="page-wrapper acct-loading-wrap">
                <span className="auth-spinner" style={{ width: 32, height: 32, borderColor: 'rgba(92,170,246,0.25)', borderTopColor: 'var(--accent-blue)' }} />
            </div>
        );
    }
    if (!user) return null;

    const displayName = user.displayName || user.email?.split('@')[0] || 'Member';
    const initials    = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    const totalSpent  = rentals.reduce((s, r) => s + Number(r.price), 0);
    const photoURL    = localPhotoURL || user.photoURL || '';

    return (
        <div className="page-wrapper acct-page">
            <div className="container">

                {/* ── Profile Card ── */}
                <div className="acct-profile-card">
                    <div className="acct-profile-hero" />
                    <div className="acct-profile-body">

                        {/* Avatar + hidden file input */}
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <div
                            className="acct-avatar-wrap"
                            onClick={() => fileRef.current?.click()}
                            title="Click to change photo"
                        >
                            {photoURL ? (
                                <img src={photoURL} alt={displayName} className="acct-avatar-img" />
                            ) : (
                                <div className="acct-avatar-initials">{initials}</div>
                            )}
                            <div className="acct-avatar-overlay">
                                {uploadPct !== null ? (
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>{uploadPct}%</span>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                        <circle cx="12" cy="13" r="4"/>
                                    </svg>
                                )}
                            </div>
                            {uploadPct !== null && (
                                <div className="acct-avatar-progress" style={{ '--pct': `${uploadPct}%` } as React.CSSProperties} />
                            )}
                        </div>

                        <div className="acct-profile-info">
                            {uploadError && <p className="acct-upload-error">{uploadError}</p>}

                            {/* Name */}
                            {editName ? (
                                <div className="acct-edit-row">
                                    <input
                                        className="acct-edit-input"
                                        value={nameInput}
                                        onChange={e => setNameInput(e.target.value)}
                                        placeholder="Your full name"
                                        autoFocus
                                        onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                                    />
                                    <button className="acct-save-btn" onClick={handleSaveName} disabled={savingName}>
                                        {savingName ? <span className="auth-spinner" style={{ width: 14, height: 14 }} /> : 'Save'}
                                    </button>
                                    <button className="acct-cancel-btn" onClick={() => setEditName(false)}>Cancel</button>
                                </div>
                            ) : (
                                <div className="acct-name-row">
                                    <h1 className="acct-name">{displayName}</h1>
                                    <button className="acct-edit-icon-btn" onClick={() => { setEditName(true); setNameInput(user.displayName || ''); }} title="Edit name">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                    </button>
                                </div>
                            )}

                            <p className="acct-email">{user.email}</p>

                            {/* Bio */}
                            {editBio ? (
                                <div className="acct-bio-edit">
                                    <textarea
                                        className="acct-bio-textarea"
                                        value={bioInput}
                                        onChange={e => setBioInput(e.target.value)}
                                        rows={3}
                                        placeholder="Write a short bio..."
                                        autoFocus
                                    />
                                    <div className="acct-edit-actions">
                                        <button className="acct-save-btn" onClick={handleSaveBio} disabled={savingBio}>
                                            {savingBio ? <span className="auth-spinner" style={{ width: 14, height: 14 }} /> : 'Save bio'}
                                        </button>
                                        <button className="acct-cancel-btn" onClick={() => setEditBio(false)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="acct-bio-row">
                                    <p className="acct-bio">
                                        {bio || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No bio yet — click ✏️ to add one</span>}
                                    </p>
                                    <button className="acct-edit-icon-btn" onClick={() => { setEditBio(true); setBioInput(bio); }} title="Edit bio">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="acct-stats">
                            <div className="acct-stat">
                                <span className="acct-stat-value">{rentals.length}</span>
                                <span className="acct-stat-label">Rentals</span>
                            </div>
                            <div className="acct-stat-divider" />
                            <div className="acct-stat">
                                <span className="acct-stat-value">€{totalSpent.toLocaleString()}</span>
                                <span className="acct-stat-label">Total spent</span>
                            </div>
                            <div className="acct-stat-divider" />
                            <div className="acct-stat">
                                <span className="acct-stat-value">{rentals.filter(r => r.status === 'completed').length}</span>
                                <span className="acct-stat-label">Completed</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Sign-out row inside the card ── */}
                    <div className="acct-signout-row">
                        <button
                            className="acct-signout-btn"
                            onClick={handleSignOut}
                            disabled={signingOut}
                        >
                            {signingOut ? (
                                <span className="auth-spinner" style={{ width: 16, height: 16, borderColor: 'rgba(239,68,68,0.3)', borderTopColor: '#EF4444' }} />
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                    <polyline points="16 17 21 12 16 7"/>
                                    <line x1="21" y1="12" x2="9" y2="12"/>
                                </svg>
                            )}
                            Sign out
                        </button>
                    </div>
                </div>

                {/* ── Rental History ── */}
                <section className="acct-history-section">
                    <div className="acct-section-header">
                        <h2 className="acct-section-title">Rental History</h2>
                        <Link href="/offerlist" className="acct-rent-again-btn">Browse vehicles</Link>
                    </div>

                    {rentalsLoad ? (
                        <div className="acct-rentals-loading">
                            <span className="auth-spinner" style={{ width: 24, height: 24, borderColor: 'rgba(92,170,246,0.2)', borderTopColor: 'var(--accent-blue)' }} />
                            <span>Loading your rentals…</span>
                        </div>
                    ) : rentals.length === 0 ? (
                        <div className="acct-empty-state">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                                <rect x="3" y="10" width="18" height="9" rx="2"/>
                                <path d="M4 10L6.5 5h11l2.5 5"/>
                                <circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/>
                            </svg>
                            <p>No rentals yet. Start your first adventure!</p>
                            <Link href="/offerlist" className="acct-rent-again-btn">Explore vehicles</Link>
                        </div>
                    ) : (
                        <div className="acct-rental-list">
                            {rentals.map(rental => (
                                <div key={rental.booking_ref} className="acct-rental-card">
                                    <div className="acct-rental-img-wrap">
                                        <img
                                            src={rental.car_image ? `/${rental.car_image}` : '/assets/WLR_CAR_RS6.png'}
                                            alt={rental.car_name}
                                            className="acct-rental-img"
                                            onError={e => { (e.target as HTMLImageElement).src = '/assets/WLR_CAR_RS6.png'; }}
                                        />
                                    </div>
                                    <div className="acct-rental-details">
                                        <div className="acct-rental-top">
                                            <span className="acct-rental-id">{rental.booking_ref}</span>
                                            <StatusBadge status={rental.status} />
                                        </div>
                                        <h3 className="acct-rental-car">{rental.car_name}</h3>
                                        <div className="acct-rental-meta">
                                            <span>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                                                </svg>
                                                {rental.start_date} → {rental.end_date}
                                            </span>
                                            {rental.location && (
                                                <span>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                                                    </svg>
                                                    {rental.location}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="acct-rental-price">
                                        <span className="acct-rental-price-amount">€{Number(rental.price).toFixed(0)}</span>
                                        <span className="acct-rental-price-days">{rental.days} {rental.days === 1 ? 'day' : 'days'}</span>
                                        <Link href="/offerlist" className="acct-rebook-btn">Rebook</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}
