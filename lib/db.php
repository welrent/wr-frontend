<?php
class Database {
    private $pdo;

    public function __construct() {
        // Change these credentials for production
        $host = '127.0.0.1';
        $db   = 'welrent_v1';
        $user = 'root'; // default xampp root
        $pass = '';     // default empty

        $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            // Live MySQL when available; otherwise keep null and serve demo payloads.
            $this->pdo = new PDO($dsn, $user, $pass, $options);
        } catch (\PDOException $e) {
            $this->pdo = null;
        }
    }

    /** Expose raw PDO for custom queries in standalone API scripts */
    public function getPDO(): ?\PDO {
        return $this->pdo ?? null;
    }

    public function getCars() {
        if (!$this->pdo) {
            return [
                ['id' => 1, 'name' => 'an RS6', 'slug' => 'an-RS6', 'subtitle' => 'Rent...', 'photo_url' => 'assets/WLR_CAR_RS6.png', 'is_dark_mode' => false, 'price' => 120],
                ['id' => 2, 'name' => 'an EVO', 'slug' => 'an-EVO', 'subtitle' => 'Rent...', 'photo_url' => 'assets/WLR_CAR_EVO.png', 'is_dark_mode' => true, 'price' => 150]
            ];
        }
        $stmt = $this->pdo->query('SELECT * FROM cars ORDER BY sort_order ASC');
        $cars = $stmt->fetchAll();
        foreach ($cars as &$car) {
            if (!isset($car['slug'])) {
                $car['slug'] = str_replace(' ', '-', $car['name']);
            }
            if (!isset($car['price'])) {
                $car['price'] = 150; // default fallback amount
            }
        }
        return $cars;
    }

    public function getVehicleBySlug($slug) {
        $cars = $this->getCars();
        foreach ($cars as $car) {
            if ($car['slug'] === $slug || $car['name'] === str_replace('-', ' ', $slug)) {
                return $car;
            }
        }
        return null;
    }

    public function getContent() {
        if (!$this->pdo) {
            return [
                'review_score_text' => 'Excellent',
                'review_score_stars' => '★★★★★',
                'address' => 'Moscow, Mohovaya st., 1A',
                'phone' => '+7 (900)-000-00-00',
                'footer_brand_desc' => 'Welcome to Welrent, the smartest auto sharing and rental app. We guarantee the perfect car for every moment.',
                'footer_copyright' => '© 2026 Welrent App. Smart Agreements.'
            ];
        }
        $stmt = $this->pdo->query('SELECT key_name, value FROM site_content');
        $rows = $stmt->fetchAll();
        $result = [];
        foreach ($rows as $row) {
            $result[$row['key_name']] = $row['value'];
        }
        return $result;
    }

    public function getNavbarLinks() {
        if (!$this->pdo) {
            return [
                ['title' => 'Welrent Act', 'url' => '/act'],
                ['title' => 'Locations', 'url' => '/locations'],
                ['title' => 'Vehicles', 'url' => '/offerlist'],
            ];
        }
        $stmt = $this->pdo->query('SELECT title, url FROM navbar_links ORDER BY sort_order ASC');
        return $stmt->fetchAll();
    }

    public function getFooterLinks() {
        if (!$this->pdo) {
            return [
                'Places' => [
                    ['title' => 'Rent in Amsterdam', 'url' => '/locations/amsterdam'],
                    ['title' => 'All destinations', 'url' => '/locations'],
                ],
                'Special Cars' => [
                    ['title' => 'Electric Cars', 'url' => '/offerlist?type=car'],
                    ['title' => 'Motorbikes', 'url' => '/offerlist?type=motorcycle'],
                ],
                'Conditions' => [
                    ['title' => 'Insurance', 'url' => '/terms'],
                    ['title' => 'Privacy', 'url' => '/privacy'],
                ],
                'About' => [
                    ['title' => 'Welrent Act', 'url' => '/act'],
                    ['title' => 'F1 Sponsorship', 'url' => '/sponsorship/f1/wr/designed'],
                ],
            ];
        }
        $stmt = $this->pdo->query('SELECT category, title, url FROM footer_links ORDER BY category, sort_order ASC');
        $rows = $stmt->fetchAll();
        $result = [];
        foreach ($rows as $row) {
            if (!isset($result[$row['category']])) {
                $result[$row['category']] = [];
            }
            $result[$row['category']][] = ['title' => $row['title'], 'url' => $row['url']];
        }
        
        // Sorting categories as per UI layout
        $orderedResult = [];
        $order = ['Places', 'Special Cars', 'Conditions', 'About'];
        foreach ($order as $cat) {
            if (isset($result[$cat])) {
                $orderedResult[$cat] = $result[$cat];
            }
        }
        return $orderedResult;
    }
}
?>
