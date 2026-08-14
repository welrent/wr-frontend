<?php
/**
 * Welrent JSON API Front Controller
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/lib/db.php';
require_once __DIR__ . '/lib/Router.php';

$router = new Router();

header('Content-Type: application/json');

$router->get('/', function() {
    echo json_encode(['status' => 'success', 'message' => 'Welrent API is running']);
});

$router->get('/api/cars', function() {
    $db = new Database();
    echo json_encode($db->getCars());
});

$router->get('/api/vehicle/:slug', function($params) {
    $db = new Database();
    $vehicle = $db->getVehicleBySlug($params['slug']);
    if ($vehicle) {
        echo json_encode($vehicle);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Vehicle not found']);
    }
});

$router->post('/api/auth/login', function() {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!empty($input) && isset($input['email'], $input['password'])) {
        $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $payload = base64_encode(json_encode(['sub' => 1, 'email' => $input['email'], 'exp' => time() + 3600]));
        $signature = base64_encode(hash_hmac('sha256', "$header.$payload", 'welrent_secret', true));
        echo json_encode(['token' => "$header.$payload.$signature", 'user' => ['id' => 1, 'email' => $input['email']]]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
});

$router->get('/api/content', function() {
    $db = new Database();
    echo json_encode($db->getContent());
});

$router->get('/api/nav_footer', function() {
    $db = new Database();
    echo json_encode([
        'navbar' => $db->getNavbarLinks(),
        'footer' => $db->getFooterLinks()
    ]);
});

// Rentals – GET: list by uid, POST: create
$router->get('/api/rentals', function() {
    require __DIR__ . '/api/rentals.php';
});
$router->post('/api/rentals', function() {
    require __DIR__ . '/api/rentals.php';
});

// Dispatch the request
$router->dispatch();
