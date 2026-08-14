'use client';
import { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ForgotPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setSent(true);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : '';
            if (msg.includes('user-not-found')) {
                setError('No account found with this email address.');
            } else {
                setError('Failed to send reset email. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-brand">
                        <img src="/assets/WLR_LOGO_APP.svg" alt="Welrent" className="auth-logo" />
                    </div>

                    {sent ? (
                        <div className="auth-success-state">
                            <div className="auth-success-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.7c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.34 6.34l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <h1 className="auth-title">Check your email</h1>
                            <p className="auth-subtitle" style={{ textAlign: 'center', maxWidth: '320px', margin: '8px auto 0' }}>
                                We&apos;ve sent a password reset link to <strong>{email}</strong>. Check your inbox and spam folder.
                            </p>
                            <Link href="/login" className="auth-btn" style={{ display: 'block', textAlign: 'center', marginTop: '28px', textDecoration: 'none' }}>
                                Back to sign in
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h1 className="auth-title">Forgot password?</h1>
                            <p className="auth-subtitle">Enter your email and we&apos;ll send you a reset link.</p>

                            {error && <div className="auth-error">{error}</div>}

                            <form onSubmit={handleReset} className="auth-form">
                                <div className="auth-field">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                <button type="submit" className="auth-btn" disabled={loading}>
                                    {loading ? <span className="auth-spinner" /> : 'Send reset link'}
                                </button>
                            </form>

                            <p className="auth-switch" style={{ marginTop: '24px' }}>
                                Remember your password?{' '}
                                <Link href="/login">Sign in</Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
