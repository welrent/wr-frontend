<?php
require_once __DIR__ . '/../lib/db.php';
require_once __DIR__ . '/../lib/assets.php';

$db = new Database();
// Slug comes from the router (e.g. /vehicle/an-RS6)
$slug = $_GET['slug'] ?? 'an-RS6';
$car = $db->getVehicleBySlug($slug);

if (!$car) {
    http_response_code(404);
    include __DIR__ . '/error.php';
    exit;
}

$carName  = htmlspecialchars($car['name']);
$price    = (int)($car['price'] ?? 120);
$location = htmlspecialchars($_GET['location'] ?? 'Long Beach, California');
$photo    = asset(strpos($car['name'], 'RS6') !== false ? 'WLR_CAR_RS6' : 'WLR_CAR_EVO');
$start    = htmlspecialchars($_GET['start']    ?? '2026-12-16T22:30');
$end      = htmlspecialchars($_GET['end']      ?? '2026-12-18T08:30');

function fmtDate(string $iso): string {
    $ts = strtotime($iso);
    return $ts ? date('M j, g:i A', $ts) : $iso;
}
$startFmt = fmtDate($start);
$endFmt   = fmtDate($end);

$days = max(1, (int)ceil((strtotime($end) - strtotime($start)) / 86400));
$subtotal = $price * $days;
$taxes    = round($subtotal * 0.21, 2);
$total    = $subtotal + $taxes;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audi <?= $carName ?> | Welrent</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/index.css">
    <style>
        * { box-sizing: border-box; }
        body { padding-top: 65px; background: #fff; font-family: 'Outfit', sans-serif; color: #222; }

        .gallery {
            width: 100%; height: 55vh;
            background: #F3F4F6;
            display: flex; align-items: center; justify-content: center;
            overflow: hidden;
        }
        .gallery img {
            max-width: 70%; max-height: 95%;
            filter: drop-shadow(0 25px 40px rgba(0,0,0,0.12));
            object-fit: contain;
        }

        .page-content {
            max-width: 1120px;
            margin: 0 auto;
            padding: 48px 40px 80px;
        }
        .content-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 340px;
            gap: 80px;
        }

        .detail-left h1 { font-size: 2rem; font-weight: 700; margin: 0 0 8px; line-height: 1.2; }
        .detail-left .location-line { color: #717171; font-size: 1rem; margin-bottom: 24px; }
        .divider { border: none; border-top: 1px solid #EBEBEB; margin: 24px 0; }

        .specs-bar { display: flex; gap: 24px; flex-wrap: wrap; font-size: 0.95rem; color: #222; }
        .specs-bar .spec-item { display: flex; align-items: center; gap: 8px; }
        .specs-bar svg { width: 20px; height: 20px; color: #222; flex-shrink: 0; }

        .host-row { display: flex; align-items: center; gap: 16px; }
        .host-avatar {
            width: 56px; height: 56px;
            border-radius: 50%;
            background: #EBEBEB;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .host-info h3 { margin: 0; font-size: 1.05rem; font-weight: 600; }
        .host-info p  { margin: 4px 0 0; color: #717171; font-size: 0.9rem; }

        .description-block p { line-height: 1.75; color: #484848; font-size: 1rem; margin: 0 0 16px; }

        .amenities { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 8px; }
        .amenity { display: flex; align-items: center; gap: 12px; font-size: 0.95rem; color: #222; }
        .amenity svg { width: 22px; height: 22px; color: #484848; }

        .booking-widget {
            position: sticky; top: 85px;
            background: #fff; border-radius: 16px; padding: 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.09);
            overflow: hidden;
        }
        .widget-header { background: #1C263A; padding: 20px 22px; color: white; }
        .widget-header .price-display { display: flex; align-items: baseline; gap: 5px; white-space: nowrap; }
        .price-amount { font-size: 1.75rem; font-weight: 700; line-height: 1; letter-spacing: -0.03em; }
        .price-unit { font-size: 0.85rem; color: rgba(255,255,255,0.6); white-space: nowrap; }
        .widget-header .rating { margin-top: 7px; font-size: 0.78rem; color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 4px; white-space: nowrap; }
        .widget-header .rating svg { width: 11px; fill: #FFC947; stroke: none; flex-shrink: 0; }

        .widget-body { padding: 20px 22px; }
        .date-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
        .date-input-wrap { background: #F6F7F9; border-radius: 8px; padding: 9px 11px; border: 1.5px solid transparent; transition: border-color 0.15s; cursor: pointer; overflow: hidden; position: relative; }
        .date-input-wrap:focus-within { border-color: #1C263A; background: #fff; }
        .date-input-wrap label { display: block; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: #9CA3AF; margin-bottom: 3px; pointer-events: none; }
        .date-input-wrap input[type="datetime-local"] { position: absolute; opacity: 0; pointer-events: none; width: 0; height: 0; }
        .date-input-wrap .date-display { font-size: 0.82rem; font-family: 'Outfit', sans-serif; color: #1C263A; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; }
        .date-input-wrap .date-trigger { display: flex; align-items: center; gap: 5px; cursor: pointer; }
        .date-input-wrap .date-trigger svg { width: 12px; color: #9CA3AF; flex-shrink: 0; }

        .passengers-wrap { background: #F6F7F9; border-radius: 10px; padding: 10px 13px; margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between; }
        .passengers-wrap label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA3AF; display: block; margin-bottom: 3px;}
        .passengers-wrap .guest-count { font-size: 0.88rem; color: #1C263A; font-weight: 500; }
        .passengers-wrap .guest-stepper { display: flex; gap: 10px; align-items: center; }
        .guest-btn { width: 26px; height: 26px; border-radius: 50%; border: 1.5px solid #CBD5E1; background: #fff; cursor: pointer; font-size: 1rem; line-height: 1; color: #1C263A; display: flex; align-items: center; justify-content: center; font-weight: 500; transition: 0.15s; }
        .guest-btn:hover { border-color: #1C263A; }
        #guestCount { font-size: 0.95rem; font-weight: 600; color: #1C263A; min-width: 14px; text-align: center; }

        .btn-reserve { background: #1C263A; color: white; display: block; width: 100%; padding: 15px; border-radius: 10px; text-align: center; text-decoration: none; font-weight: 700; font-size: 1rem; border: none; cursor: pointer; letter-spacing: 0.02em; transition: background 0.2s, transform 0.1s; margin-bottom: 12px; }
        .btn-reserve:hover { background: #111827; transform: translateY(-1px); }
        .no-charge { text-align: center; font-size: 0.82rem; color: #9CA3AF; margin: 0 0 20px; }

        .price-breakdown { border-top: 1px solid #F0F0F0; padding-top: 16px; }
        .price-row { display: flex; justify-content: space-between; font-size: 0.95rem; color: #484848; margin-bottom: 10px; }
        .price-row.total { border-top: 1px solid #EBEBEB; margin-top: 16px; padding-top: 16px; font-weight: 700; color: #222; font-size: 1rem; }
    </style>
</head>
<body>
<?php include __DIR__ . '/../components/header.php'; ?>

<div class="gallery">
    <img src="<?= $photo ?>" alt="Audi <?= $carName ?>">
</div>

<div class="page-content">
    <div class="content-grid">
        <div class="detail-left">
            <h1>Audi <?= $carName ?></h1>
            <p class="location-line"><?= $location ?></p>
            <hr class="divider">
            <div class="specs-bar">
                <div class="spec-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> 5 passengers</div>
                <div class="spec-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="10" width="18" height="9" rx="2"></rect><path d="M4 10L6.5 5h11l2.5 5"></path><circle cx="7" cy="19" r="2"></circle><circle cx="17" cy="19" r="2"></circle></svg> 5 doors</div>
                <div class="spec-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Automatic</div>
                <div class="spec-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 15a4 4 0 0 0 4 4h9a5 5 0 0 0 1.8-9.7 3 3 0 0 0-3.6-3.5A5 5 0 0 0 3 10z"></path></svg> Premium fuel</div>
            </div>
            <hr class="divider">
            <div class="host-row">
                <div class="host-avatar"><svg viewBox="0 0 24 24" width="26" fill="none" stroke="#484848" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
                <div class="host-info"><h3>Hosted by Welrent Enterprise</h3><p>Superhost &middot; 1,234 reviews &middot; Since 2019</p></div>
            </div>
            <hr class="divider">
            <div class="description-block">
                <p>Experience the sheer power and refined elegance of the Audi <?= $carName ?>. This luxury vehicle is meticulously maintained and features state-of-the-art technological amenities.</p>
                <p>Perfect for long weekends, business trips, or cruising the coast. Full-coverage insurance included.</p>
            </div>
            <hr class="divider">
            <h3 style="font-size:1.1rem; margin-bottom:16px;">What's included</h3>
            <div class="amenities">
                <div class="amenity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Full insurance</div>
                <div class="amenity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg> Unlimited mileage</div>
                <div class="amenity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2"></path></svg> 24/7 support</div>
                <div class="amenity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path></svg> Contactless pickup</div>
            </div>
        </div>

        <div class="detail-right">
            <div class="booking-widget">
                <div class="widget-header">
                    <div class="price-display"><span class="price-amount">&euro;<span id="wPrice"><?= $price ?></span></span><span class="price-unit">/ day</span></div>
                    <div class="rating"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> 4.92 &middot; 1,234 reviews</div>
                </div>
                <div class="widget-body">
                    <div class="date-inputs">
                        <div class="date-input-wrap" onclick="document.getElementById('startDate').showPicker ? document.getElementById('startDate').showPicker() : document.getElementById('startDate').click()">
                            <label>Pick-up</label><div class="date-trigger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"></rect></svg><span class="date-display" id="startDisplay"></span></div>
                            <input type="datetime-local" id="startDate" value="<?= htmlspecialchars($start) ?>" onchange="recalc()">
                        </div>
                        <div class="date-input-wrap" onclick="document.getElementById('endDate').showPicker ? document.getElementById('endDate').showPicker() : document.getElementById('endDate').click()">
                            <label>Return</label><div class="date-trigger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"></rect></svg><span class="date-display" id="endDisplay"></span></div>
                            <input type="datetime-local" id="endDate" value="<?= htmlspecialchars($end) ?>" onchange="recalc()">
                        </div>
                    </div>
                    <div class="passengers-wrap">
                        <div><label>Passengers</label><span class="guest-count"><span id="guestCount">1</span> guest</span></div>
                        <div class="guest-stepper"><button class="guest-btn" onclick="changeGuests(-1)">−</button><button class="guest-btn" onclick="changeGuests(1)">+</button></div>
                    </div>
                    <a id="reserveBtn" href="/checkout?car=<?= urlencode($carName) ?>&price=<?= $price ?>&location=<?= urlencode($location) ?>&photo=<?= urlencode($photo) ?>&days=<?= $days ?>" class="btn-reserve">Reserve &rarr;</a>
                    <p class="no-charge">You won't be charged yet</p>
                    <div class="price-breakdown">
                        <div class="price-row"><span id="lineLabel">&euro;<?= $price ?> &times; <?= $days ?> day<?= $days > 1 ? 's' : '' ?></span><span id="lineSubtotal">&euro;<?= number_format($subtotal, 2) ?></span></div>
                        <div class="price-row"><span>Taxes &amp; fees (21%)</span><span id="lineTax">&euro;<?= number_format($taxes, 2) ?></span></div>
                        <div class="price-row total"><span>Total</span><span id="lineTotal">&euro;<?= number_format($total, 2) ?></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../components/footer.php'; ?>

<script>
const PRICE_PER_DAY = <?= (int)$price ?>;
let guests = 1;
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function fmtDateNice(isoStr) {
    if (!isoStr) return '—';
    const d = new Date(isoStr);
    const h = d.getHours();
    const m = d.getMinutes().toString().padStart(2,'0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${h12}:${m} ${ampm}`;
}

function recalc() {
    const s = document.getElementById('startDate').value;
    const e = document.getElementById('endDate').value;
    document.getElementById('startDisplay').textContent = fmtDateNice(s);
    document.getElementById('endDisplay').textContent   = fmtDateNice(e);
    if (!s || !e) return;
    const days = Math.max(1, Math.ceil((new Date(e) - new Date(s)) / 86400000));
    const sub = PRICE_PER_DAY * days;
    const tax = sub * 0.21;
    const tot = sub + tax;
    document.getElementById('lineLabel').innerHTML = `\u20AC${PRICE_PER_DAY} &times; ${days} day${days > 1 ? 's' : ''}`;
    document.getElementById('lineSubtotal').textContent = `\u20AC${sub.toFixed(2)}`;
    document.getElementById('lineTax').textContent = `\u20AC${tax.toFixed(2)}`;
    document.getElementById('lineTotal').textContent = `\u20AC${tot.toFixed(2)}`;
    const btn = document.getElementById('reserveBtn');
    if (btn) {
        const url = new URL(btn.href, location.origin);
        url.searchParams.set('days', days);
        url.searchParams.set('start', s);
        url.searchParams.set('end', e);
        btn.href = url.toString();
    }
}

function changeGuests(delta) {
    guests = Math.max(1, Math.min(6, guests + delta));
    document.getElementById('guestCount').textContent = guests;
}
recalc();
</script>
</body>
</html>
