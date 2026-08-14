'use client';
import { useState } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirm) { setError('Passwords do not match.'); return; }
        if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
        setLoading(true);
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(cred.user, { displayName: name });
            router.push('/');
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : '';
            if (msg.includes('email-already-in-use')) {
                setError('An account with this email already exists.');
            } else {
                setError('Registration failed. Please try again.');
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

                    <h1 className="auth-title">Create your account</h1>
                    <p className="auth-subtitle">Join thousands of drivers across the Netherlands and Belgium</p>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleRegister} className="auth-form">
                        <div className="auth-field">
                            <label htmlFor="name">Full name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Jan de Vries"
                                required
                                autoComplete="name"
                            />
                        </div>

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

                        <div className="auth-field">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Min. 8 characters"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="confirm">Confirm password</label>
                            <input
                                id="confirm"
                                type="password"
                                value={confirm}
                                onChange={e => setConfirm(e.target.value)}
                                placeholder="Repeat password"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? <span className="auth-spinner" /> : 'Create account'}
                        </button>
                    </form>

                    <div className="auth-divider"><span>or</span></div>

                    <p className="auth-switch">
                        Already have an account?{' '}
                        <Link href="/login">Sign in</Link>
                    </p>
                </div>

                <p className="auth-legal">
                    By creating an account you agree to our{' '}
                    <Link href="/terms">Terms of Service</Link> and{' '}
                    <Link href="/privacy">Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
}
