-- Add rentals table to welrent_v1
USE welrent_v1;

CREATE TABLE IF NOT EXISTS rentals (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    booking_ref   VARCHAR(50)  NOT NULL UNIQUE,
    user_uid      VARCHAR(128) NOT NULL,        -- Firebase Auth UID
    car_name      VARCHAR(255) NOT NULL,
    car_image     VARCHAR(255),
    start_date    DATE         NOT NULL,
    end_date      DATE         NOT NULL,
    days          INT          NOT NULL DEFAULT 1,
    price         DECIMAL(10,2) NOT NULL,
    status        ENUM('upcoming','active','completed','cancelled') NOT NULL DEFAULT 'upcoming',
    location      VARCHAR(255),
    created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast per-user lookups
CREATE INDEX IF NOT EXISTS idx_rentals_user ON rentals (user_uid);

-- Sample seed data (replace 'YOUR_UID' with a real Firebase UID)
-- INSERT INTO rentals (booking_ref, user_uid, car_name, car_image, start_date, end_date, days, price, status, location)
-- VALUES
--   ('WLR-2024-001', 'YOUR_UID', 'Audi RS6 Avant',           'assets/WLR_CAR_RS6.png', '2024-11-12', '2024-11-14', 2,  380.00, 'completed', 'Amsterdam Central'),
--   ('WLR-2024-002', 'YOUR_UID', 'Lamborghini Huracán EVO',  'assets/WLR_CAR_EVO.png', '2024-12-20', '2024-12-23', 3, 1290.00, 'completed', 'Rotterdam Airport'),
--   ('WLR-2025-001', 'YOUR_UID', 'Audi RS6 Avant',           'assets/WLR_CAR_RS6.png', '2025-03-05', '2025-03-07', 2,  380.00, 'completed', 'Brussels Center');
