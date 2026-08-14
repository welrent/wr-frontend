<?php
require_once __DIR__ . '/../lib/db.php';
require_once __DIR__ . '/../lib/assets.php';

$db = new Database();
$cars = $db->getCars();

$location = htmlspecialchars($_GET['location'] ?? 'Rotterdam Alexander');
$start = htmlspecialchars($_GET['start'] ?? '12:30 PM');
$end = htmlspecialchars($_GET['end'] ?? '08:30 AM');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offers | Welrent</title>
    <link rel="stylesheet" href="/index.css">
    <style>
        body { background: #F4F5F7; padding-top: 80px; font-family: 'Outfit', sans-serif; }
        .offer-container { max-width: 1200px; margin: 40px auto; padding: 0 40px; display: flex; gap: 30px; }
        .filter-sidebar { width: 300px; background: white; border-radius: 8px; padding: 24px; align-self: flex-start; box-shadow: 0 4px 15px rgba(0,0,0,0.02); position: sticky; top: 20px; }
        .filter-sidebar h3 { font-size: 1.1rem; margin-bottom: 20px; color: #1C263A; }
        .filter-block { margin-bottom: 20px; }
        .filter-block label { display: block; font-size: 0.8rem; font-weight: 700; color: #9CA3AF; margin-bottom: 8px;}
        .filter-block input { width: 100%; padding: 10px; border: 1px solid #E5E9F0; border-radius: 4px; background: #FAFBFC; outline: none; }
        .filter-block input:focus { border-color: #1C263A; }
        
        .offer-list { flex: 1; }
        .offer-card { background: white; border-radius: 12px; padding: 24px; margin-bottom: 20px; display: flex; gap: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); border: 1px solid #E8EAF0; }
        .car-img { width: 280px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .car-img img { max-width: 100%; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.1)); }
        
        .car-details { flex: 1; display: flex; flex-direction: column; justify-content: center; }
        .car-details h2 { font-size: 1.5rem; font-weight: 700; color: #1C263A; margin-bottom: 8px; }
        .car-details .specs { display: flex; gap: 16px; margin-bottom: 20px; font-size: 0.85rem; color: #6B7280; font-weight: 500;}
        .car-details .specs span { display: flex; align-items: center; gap: 6px; }
        .car-details .specs svg { width: 14px; height: 14px; }
        
        .pricing { border-top: 1px solid #E5E9F0; padding-top: 20px; display: flex; justify-content: space-between; align-items: center; }
        .price-tag { font-size: 1.4rem; font-weight: 700; color: #1C263A; }
        .price-tag small { font-size: 0.85rem; color: #9CA3AF; font-weight: 500; }
        
        .btn-book { background: #1C263A; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s; text-decoration: none; }
        .btn-book:hover { background: #111827; }
    </style>
</head>
<body>
<?php include __DIR__ . '/../components/header.php'; ?>

<div class="offer-container">
    <div class="filter-sidebar">
        <h3>Change Search</h3>
        <form action="/offerlist" method="GET">
            <div class="filter-block"><label>Pick-up & Return</label><input type="text" name="location" value="<?= $location ?>"></div>
            <div class="filter-block"><label>Start Date</label><input type="text" name="start" value="<?= $start ?>"></div>
            <div class="filter-block"><label>End Date</label><input type="text" name="end" value="<?= $end ?>"></div>
            <button type="submit" style="width: 100%; background: #1C263A; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 700; cursor: pointer;">Update Offers</button>
        </form>
    </div>
    
    <div class="offer-list">
        <?php foreach ($cars as $car): ?>
        <div class="offer-card">
            <div class="car-img"><img src="<?= asset(strpos($car['name'], 'RS6') !== false ? 'WLR_CAR_RS6' : 'WLR_CAR_EVO') ?>" alt="<?= htmlspecialchars($car['name']) ?>"></div>
            <div class="car-details">
                <h2>Audi <?= $car['name'] ?></h2>
                <div class="specs">
                    <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg> 5 Seats</span>
                    <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Automatic</span>
                </div>
                <div class="pricing">
                    <div class="price-tag">&euro;<?= $car['price'] ?? 120 ?> <small>/ day</small></div>
                    <a href="/vehicle/<?= $car['slug'] ?>?location=<?= urlencode($location) ?>" class="btn-book">Select Offer</a>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>

<?php include __DIR__ . '/../components/footer.php'; ?>
</body>
</html>
