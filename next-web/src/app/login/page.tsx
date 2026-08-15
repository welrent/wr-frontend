'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!isFirebaseConfigured || !auth) {
            setError('Auth is not configured. Add Firebase env keys to enable login.');
            return;
        }
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Login failed.';
            if (msg.includes('user-not-found') || msg.includes('wrong-password') || msg.includes('invalid-credential')) {
                setError('Invalid email or password.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    {/* Brand */}
                    <div className="auth-brand">
                        <img src="/assets/WLR_LOGO_APP.svg" alt="Welrent" className="auth-logo" />
                    </div>

                    <h1 className="auth-title">Welcome back</h1>
                    <p className="auth-subtitle">Sign in to your Welrent account</p>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleLogin} className="auth-form">
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
                            <label htmlFor="password">
                                Password
                                <Link href="/forgot" className="auth-forgot-link">Forgot password?</Link>
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? <span className="auth-spinner" /> : 'Sign in'}
                        </button>
                    </form>

                    <div className="auth-divider"><span>or</span></div>

                    <p className="auth-switch">
                        Don&apos;t have an account?{' '}
                        <Link href="/register">Create one free</Link>
                    </p>
                </div>

                <p className="auth-legal">
                    By signing in you agree to our{' '}
                    <Link href="/terms">Terms of Service</Link> and{' '}
                    <Link href="/privacy">Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
}
