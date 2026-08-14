<?php
require_once __DIR__ . '/../lib/assets.php';
$carName  = htmlspecialchars($_GET['car']      ?? 'an RS6');
$price    = (int)($_GET['price'] ?? 120);
$location = htmlspecialchars($_GET['location'] ?? 'Rotterdam Alexander');
$photo    = htmlspecialchars($_GET['photo']    ?? asset('WLR_CAR_RS6'));
$days     = max(1, (int)($_GET['days'] ?? 2));
$start    = htmlspecialchars($_GET['start']    ?? '2026-12-16T22:30');
$end      = htmlspecialchars($_GET['end']      ?? '2026-12-18T08:30');
$subtotal = $price * $days;
$taxes    = round($subtotal * 0.21, 2);
$total    = $subtotal + $taxes;

function fmtDate(string $iso): string {
    $ts = strtotime($iso);
    return $ts ? date('M j, g:i A', $ts) : $iso;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout &middot; Welrent</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/index.css">
    <style>
        *, *::before, *::after { box-sizing: border-box; }
        body { background: #F4F5F7; margin-top: 72px; font-family: 'Outfit', sans-serif; color: #1C263A; }
        .co-page { max-width: 1080px; margin: 0 auto; padding: 36px 24px 64px; display: grid; grid-template-columns: 1fr 340px; gap: 28px; align-items: start; }
        .steps { display: flex; flex-direction: column; gap: 14px; }
        .step-card { background: #fff; border-radius: 12px; border: 1px solid #E8EAF0; overflow: hidden; }
        .step-head { display: flex; align-items: center; gap: 14px; padding: 18px 22px; cursor: pointer; user-select: none; }
        .step-num { width: 32px; height: 32px; border-radius: 50%; background: #1C263A; color: #fff; font-size: 0.82rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .step-num.done { background: #16a34a; }
        .step-num.done::after { content: ''; display: block; width: 10px; height: 6px; border-left: 2px solid white; border-bottom: 2px solid white; transform: rotate(-45deg) translate(1px, -1px); }
        .step-num.done span { display: none; }
        .step-title { font-size: 0.82rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #1C263A; flex: 1; }
        .step-edit { font-size: 0.8rem; color: #1C263A; text-decoration: underline; cursor: pointer; }
        .step-body { padding: 0 22px 22px; border-top: 1px solid #F0F2F5; }
        .step-summary { padding: 10px 22px 14px; font-size: 0.85rem; color: #6B7280; border-top: 1px solid #F0F2F5; }
        .step-summary span { color: #1C263A; font-weight: 500; }
        .field { margin-bottom: 12px; }
        .field label { display: block; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA3AF; margin-bottom: 5px; }
        .field input, .field select { width: 100%; padding: 11px 14px; border: 1.5px solid #E5E9F0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; color: #1C263A; background: #fff; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
        .field input:focus { border-color: #1C263A; box-shadow: 0 0 0 3px rgba(28,38,58,0.07); }
        .field-row { display: flex; gap: 10px; }
        .field-row .field { flex: 1; }
        .delivery-option { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 1.5px solid #E5E9F0; border-radius: 8px; margin-bottom: 10px; cursor: pointer; transition: border-color 0.15s; }
        .delivery-option.selected { border-color: #1C263A; background: #F8F9FB; }
        .delivery-option-info { flex: 1; }
        .delivery-option-info strong { display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 2px; }
        .delivery-option-info p { font-size: 0.82rem; color: #6B7280; margin: 0; }
        .delivery-badge { font-size: 0.78rem; font-weight: 600; color: #16a34a; white-space: nowrap; }
        .express-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
        .btn-xp { padding: 11px; border-radius: 8px; border: 1.5px solid #E5E9F0; background: #fff; cursor: pointer; font-weight: 600; font-size: 0.85rem; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 7px; color: #1C263A; }
        .btn-xp-dark { background: #1C263A; color: #fff; border-color: #1C263A; }
        .or-row { display: flex; align-items: center; gap: 10px; font-size: 0.72rem; color: #9CA3AF; margin: 2px 0 14px; }
        .or-row::before, .or-row::after { content: ''; flex: 1; height: 1px; background: #F0F2F5; }
        .btn-continue { margin-top: 16px; width: 100%; padding: 13px; background: #1C263A; color: #fff; border: none; border-radius: 9px; font-size: 0.95rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-pay { margin-top: 16px; width: 100%; padding: 14px; background: #1C263A; color: #fff; border: none; border-radius: 9px; font-size: 1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 9px; }
        .secure-note { margin-top: 12px; text-align: center; font-size: 0.76rem; color: #9CA3AF; display: flex; align-items: center; justify-content: center; gap: 5px; }
        .summary-col { display: flex; flex-direction: column; gap: 14px; }
        .summary-card { background: #fff; border-radius: 12px; border: 1px solid #E8EAF0; overflow: hidden; }
        .summary-dark-head { background: #1C263A; padding: 18px 20px; color: white; }
        .summary-dark-head .sdh-label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 12px; }
        .summary-car-row { display: flex; gap: 14px; align-items: center; }
        .summary-thumb { width: 64px; height: 48px; background: rgba(255,255,255,0.08); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .summary-thumb img { max-width: 90%; max-height: 90%; object-fit: contain; }
        .summary-car-info h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 2px; }
        .summary-car-info p { font-size: 0.78rem; color: rgba(255,255,255,0.55); }
        .summary-body { padding: 16px 20px; }
        .summary-dates { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding-bottom: 14px; border-bottom: 1px solid #F0F2F5; margin-bottom: 14px; }
        .sdate label { display: block; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; color: #9CA3AF; }
        .sdate span { font-size: 0.82rem; font-weight: 600; color: #1C263A; }
        .promo-row { display: flex; gap: 8px; margin-bottom: 14px; }
        .promo-row input { flex: 1; padding: 9px 12px; border: 1.5px solid #E5E9F0; border-radius: 7px; font-size: 0.85rem; }
        .promo-row button { padding: 9px 14px; background: #fff; border: 1.5px solid #E5E9F0; border-radius: 7px; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
        .price-line { display: flex; justify-content: space-between; font-size: 0.85rem; padding: 5px 0; color: #6B7280; }
        .price-line.bold { border-top: 1px solid #E8EAF0; margin-top: 8px; padding-top: 14px; font-size: 1rem; font-weight: 700; color: #1C263A; }
        .feature-card { background: #fff; border-radius: 12px; border: 1px solid #E8EAF0; padding: 14px 18px; }
        .feature-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid #F4F5F7; }
        .feature-icon { width: 32px; height: 32px; background: #F4F5F7; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .feature-icon svg { width: 16px; color: #1C263A; }
        .feature-text strong { display: block; font-size: 0.82rem; font-weight: 600; }
        .feature-text p { font-size: 0.75rem; color: #9CA3AF; margin: 0; }
    </style>
</head>
<body>
<?php include __DIR__ . '/../components/header.php'; ?>

<div class="co-page">
    <div class="steps">
        <div class="step-card">
            <div class="step-head done"><div class="step-num done"><span>1</span></div><div class="step-title">My Account</div><span class="step-edit">Modify</span></div>
            <div class="step-summary">Your email is <span>you@example.com</span></div>
        </div>
        <div class="step-card">
            <div class="step-head"><div class="step-num"><span>2</span></div><div class="step-title">Rental Details</div></div>
            <div class="step-body">
                <div class="field"><label>Pickup location</label><select><option selected><?= $location ?></option></select></div>
                <div class="field-row">
                    <div class="field"><label>Pick-up</label><input type="datetime-local" value="<?= htmlspecialchars($start) ?>"></div>
                    <div class="field"><label>Return</label><input type="datetime-local" value="<?= htmlspecialchars($end) ?>"></div>
                </div>
                <button class="btn-continue">Continue &rarr;</button>
            </div>
        </div>
        <div class="step-card">
            <div class="step-head"><div class="step-num" style="background:#E5E9F0;"><span>3</span></div><div class="step-title" style="color:#9CA3AF;">Payment</div></div>
            <div class="step-body">
                <div class="express-grid">
                    <button class="btn-xp btn-xp-dark">Apple Pay</button>
                    <button class="btn-xp">Google Pay</button>
                </div>
                <div class="or-row">or pay with card</div>
                <div class="field"><label>Card number</label><input type="text" placeholder="1234  5678  9012  3456"></div>
                <button class="btn-pay">Pay now &middot; &euro;<?= number_format($total, 2) ?></button>
            </div>
        </div>
    </div>

    <div class="summary-col">
        <div class="summary-card">
            <div class="summary-dark-head">
                <div class="sdh-label">Your booking</div>
                <div class="summary-car-row">
                    <div class="summary-thumb"><img src="<?= $photo ?>" alt="Audi <?= $carName ?>"></div>
                    <div class="summary-car-info"><h4>Audi <?= $carName ?></h4><p><?= $location ?></p><p><?= $days ?> days &middot; &euro;<?= $price ?>/day</p></div>
                </div>
            </div>
            <div class="summary-body">
                <div class="summary-dates"><div class="sdate"><label>Pick-up</label><span><?= fmtDate($start) ?></span></div><div class="sdate"><label>Return</label><span><?= fmtDate($end) ?></span></div></div>
                <div class="price-line"><span>&euro;<?= $price ?> &times; <?= $days ?> days</span><span>&euro;<?= number_format($subtotal, 2) ?></span></div>
                <div class="price-line"><span>Taxes &amp; fees (21%)</span><span>&euro;<?= number_format($taxes, 2) ?></span></div>
                <div class="price-line bold"><span>Total</span><span>&euro;<?= number_format($total, 2) ?></span></div>
            </div>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../components/footer.php'; ?>
</body>
</html>
