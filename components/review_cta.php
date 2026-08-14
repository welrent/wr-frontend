<section class="app-about-section">
    <div class="container">
        <div class="app-about-grid">

            <!-- Left: Text + CTA -->
            <div class="app-about-text">
                <div class="app-about-badge">Welrent App</div>
                <h2 class="app-about-title">Your car, <br>whenever you need it.</h2>
                <p class="app-about-desc">
                    Experience the smartest way to rent premium vehicles. Instant booking, digital keys, full insurance — all managed from one sleek app. Available across the Netherlands and Belgium.
                </p>
                <ul class="app-feature-list">
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Contactless pickup with digital key
                    </li>
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Full insurance &amp; 24/7 roadside support
                    </li>
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Free cancellation up to 24h before
                    </li>
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Real-time availability &amp; instant confirmation
                    </li>
                </ul>
                <div class="app-store-btns">
                    <a href="#" class="app-dl-btn app-dl-dark">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74.7 0 1.95-.88 3.55-.74 1.48.06 2.76.62 3.55 1.77-3.05 1.9-2.58 5.4 0 6.64-.7 1.55-1.5 2.56-2.18 4.56zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.3 2.4-2.06 4.38-3.74 4.25z"/></svg>
                        <div>
                            <span class="app-dl-sub">Download on the</span>
                            <span class="app-dl-main">App Store</span>
                        </div>
                    </a>
                    <a href="#" class="app-dl-btn app-dl-outline">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M3 20.5v-17c0-.5.5-.8 1-.5l15 8a.9.9 0 0 1 0 1.4l-15 8c-.5.3-1 0-1-.5zm2-14.7v12.4l11-6.2-11-6.2z"/></svg>
                        <div>
                            <span class="app-dl-sub">Get it on</span>
                            <span class="app-dl-main">Google Play</span>
                        </div>
                    </a>
                </div>
            </div>

            <!-- Right: Stats cards -->
            <div class="app-about-cards">
                <div class="app-stat-card app-stat-dark">
                    <div class="app-stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div class="app-stat-num">24/7</div>
                    <div class="app-stat-label">Available around the clock</div>
                </div>
                <div class="app-stat-card">
                    <div class="app-stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <div class="app-stat-num">5,000+</div>
                    <div class="app-stat-label">Happy drivers</div>
                </div>
                <div class="app-stat-card">
                    <div class="app-stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                    <div class="app-stat-num">4.9 ★</div>
                    <div class="app-stat-label">Average user rating</div>
                </div>
                <div class="app-stat-card app-stat-accent">
                    <div class="app-stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div class="app-stat-num">12</div>
                    <div class="app-stat-label">Cities covered</div>
                </div>
            </div>

        </div>
    </div>
</section>

<style>
.app-about-section {
    background: #F4F5F7;
    padding: 80px 0;
}
.app-about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}
@media (max-width: 768px) {
    .app-about-grid { grid-template-columns: 1fr; gap: 40px; }
}

/* Text side */
.app-about-badge {
    display: inline-block;
    background: rgba(28,38,58,0.08);
    color: #1C263A;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 5px 12px;
    border-radius: 100px;
    margin-bottom: 18px;
}
.app-about-title {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.15;
    color: #1C263A;
    margin-bottom: 18px;
    letter-spacing: -0.03em;
}
.app-about-desc {
    font-size: 0.95rem;
    color: #6B7280;
    line-height: 1.7;
    margin-bottom: 24px;
    max-width: 420px;
}
.app-feature-list {
    list-style: none;
    padding: 0;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.app-feature-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    color: #374151;
    font-weight: 500;
}
.app-feature-list li svg {
    width: 16px;
    height: 16px;
    color: #16a34a;
    flex-shrink: 0;
}
.app-store-btns {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}
.app-dl-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 18px;
    border-radius: 10px;
    text-decoration: none;
    transition: transform 0.15s, box-shadow 0.15s;
}
.app-dl-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
.app-dl-dark { background: #1C263A; color: white; }
.app-dl-outline { background: #fff; color: #1C263A; border: 1.5px solid #E5E9F0; }
.app-dl-sub { display: block; font-size: 0.62rem; opacity: 0.65; line-height: 1; margin-bottom: 2px; }
.app-dl-main { display: block; font-size: 0.9rem; font-weight: 700; line-height: 1; }

/* Stat cards grid */
.app-about-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
}
.app-stat-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #E8EAF0;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
}
.app-stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
.app-stat-dark { background: #1C263A; color: white; border-color: #1C263A; }
.app-stat-accent { background: linear-gradient(135deg, #1C263A 0%, #2D3F5E 100%); color: white; border-color: transparent; }
.app-stat-icon svg {
    width: 22px;
    height: 22px;
    color: #6B7280;
}
.app-stat-dark .app-stat-icon svg,
.app-stat-accent .app-stat-icon svg { color: rgba(255,255,255,0.5); }
.app-stat-num {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #1C263A;
}
.app-stat-dark .app-stat-num,
.app-stat-accent .app-stat-num { color: white; }
.app-stat-label {
    font-size: 0.78rem;
    color: #9CA3AF;
    line-height: 1.3;
}
.app-stat-dark .app-stat-label,
.app-stat-accent .app-stat-label { color: rgba(255,255,255,0.5); }
</style>
