<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../lib/db.php';

try {
    $db = new Database();
    $cars = $db->getCars();
    echo json_encode(['status' => 'success', 'data' => $cars]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
