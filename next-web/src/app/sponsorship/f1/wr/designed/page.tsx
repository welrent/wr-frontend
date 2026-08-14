'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function F1SponsorshipPage() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Scroll interpolation hook (Apple style)
    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement, 
                  b = document.body,
                  st = 'scrollTop',
                  sh = 'scrollHeight';
            const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
            setScrollProgress(percent);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper for range mapping (like Framer Motion's useTransform)
    const transformRange = (value: number, input: [number, number], output: [number, number]) => {
        const [inMin, inMax] = input;
        const [outMin, outMax] = output;
        if (value <= inMin) return outMin;
        if (value >= inMax) return outMax;
        return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
    };

    return (
        <div className={`f1-dark-theme ${isVisible ? 'fade-in' : ''}`} style={{ background: '#000' }}>
            <main className="page-wrapper" style={{ paddingTop: 0 }}>
                
                {/* ── Section 1: Hero Reveal ── */}
                <div className="sticky-container" style={{ height: '300vh' }}>
                    <div className="sticky-section">
                        <div className="hero-zoom-wrap" style={{ 
                            transform: `scale(${transformRange(scrollProgress, [0, 0.3], [1, 1.5])})`,
                            opacity: transformRange(scrollProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]),
                            filter: `blur(${transformRange(scrollProgress, [0.25, 0.35], [0, 20])}px)`
                        }}>
                            <h1 className="f1-hero-title">
                                Engineering<br />
                                <span className="f1-gradient-text">Excellence</span>
                            </h1>
                        </div>
                        
                        <div className="car-hero-wrap" style={{
                            position: 'absolute',
                            width: '100%',
                            maxWidth: '1200px',
                            zIndex: 2,
                            transform: `translateY(${transformRange(scrollProgress, [0, 0.3], [100, 0])}px) scale(${transformRange(scrollProgress, [0.3, 0.6], [1, 0.6])})`,
                            opacity: transformRange(scrollProgress, [0.1, 0.2, 0.7, 0.9], [0, 1, 1, 0])
                        }}>
                            <img 
                                src="/assets/sponsorship/f1/f1_hero_full.png" 
                                alt="Welrent F1 Championship Car" 
                                className="f1-car-image"
                            />
                        </div>
                    </div>
                </div>

                {/* ── Section 2: Sidepod Branding ── */}
                <div className="sticky-container" style={{ height: '200vh' }}>
                    <div className="sticky-section" style={{ background: '#000' }}>
                        <div className="sidepod-detail-wrap" style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            <img 
                                src="/assets/sponsorship/f1/f1_side_detail.png" 
                                alt="Welrent Sidepod Detail" 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: transformRange(scrollProgress, [0.4, 0.5, 0.9, 1.0], [0, 1, 1, 0]),
                                    transform: `scale(${transformRange(scrollProgress, [0.4, 1.0], [1.2, 1])})`
                                }}
                            />
                            
                            <div className="floating-text-box" style={{
                                position: 'absolute',
                                left: '10%',
                                maxWidth: '400px',
                                opacity: transformRange(scrollProgress, [0.55, 0.65], [0, 1]),
                                transform: `translateX(${transformRange(scrollProgress, [0.55, 0.65], [-50, 0])}px)`
                            }}>
                                <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '20px' }}>Partnership Driven By Speed.</h2>
                                <p style={{ fontSize: '1.2rem', color: '#A0A4AB', lineHeight: 1.6 }}>
                                    Welrent joins forces with the pinnacle of motorsport to push the boundaries of automotive performance and smart logistic solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Section 3: Performance Stats ── */}
                <div className="stats-section" style={{ padding: '100px 0', background: '#000' }}>
                    <div className="container">
                        <div className="stats-header" style={{ marginBottom: '60px', textAlign: 'center' }}>
                            <span className="f1-stat-label">Performance Data</span>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Limitless Potential.</h2>
                        </div>
                        
                        <div className="review-grid">
                            <div className="f1-stat-card">
                                <div className="f1-stat-value">370.4</div>
                                <div className="f1-stat-label">Top Speed (KM/H)</div>
                            </div>
                            <div className="f1-stat-card">
                                <div className="f1-stat-value">2.1s</div>
                                <div className="f1-stat-label">0-100 Acceleration</div>
                            </div>
                            <div className="f1-stat-card">
                                <div className="f1-stat-value">4.5G</div>
                                <div className="f1-stat-label">Cornering Force</div>
                            </div>
                        </div>
                        
                        <div style={{ textAlign: 'center', marginTop: '80px' }}>
                            <Link href="/offerlist" className="btn-primary" style={{ padding: '16px 40px', borderRadius: '12px' }}>
                                Drive The Legacy
                            </Link>
                        </div>
                    </div>
                </div>

            </main>

            <style>{`
                .sticky-container {
                    position: relative;
                    width: 100%;
                }
                .sticky-section {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background: #000;
                }
                .fade-in { animation: fadeIn 1s ease forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
}
