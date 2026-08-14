<?php
// Home page logic can go here (e.g. data fetching)
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welrent App | Find your drive</title>
    <link rel="stylesheet" href="/index.css">
</head>
<body>

<!-- Header Component -->
<?php include __DIR__ . '/../components/header.php'; ?>

<div class="page-wrapper">
    <div class="container">
        <!-- Hero 1 (RS6) Component -->
        <?php include __DIR__ . '/../components/hero_rs6.php'; ?>
    </div>
</div>

<!-- Hero 2 (EVO) Component -->
<?php include __DIR__ . '/../components/hero_evo.php'; ?>

<!-- Info Area Component -->
<?php include __DIR__ . '/../components/review_cta.php'; ?>

<!-- Footer Component -->
<?php include __DIR__ . '/../components/footer.php'; ?>

</body>
</html>
