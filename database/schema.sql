CREATE DATABASE IF NOT EXISTS welrent_v1;
USE welrent_v1;

CREATE TABLE IF NOT EXISTS site_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    photo_url VARCHAR(255),
    is_dark_mode BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0
);

INSERT INTO site_content (key_name, value) VALUES
('review_score_text', 'Excellent'),
('review_score_stars', '★★★★★'),
('address', 'Moscow, Mohovaya st., 1A'),
('phone', '+7 (900)-000-00-00'),
('footer_brand_desc', 'Welcome to Welrent, the smartest auto sharing and rental app. We guarantee the perfect car for every moment.'),
('footer_copyright', '© 2026 Welrent App. Smart Agreements.');

INSERT INTO cars (name, subtitle, photo_url, is_dark_mode, sort_order) VALUES
('an RS6', 'Rent...', 'assets/WLR_CAR_RS6.png', FALSE, 1),
('an EVO', 'Rent...', 'assets/WLR_CAR_EVO.png', TRUE, 2);

CREATE TABLE IF NOT EXISTS navbar_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0
);

INSERT INTO navbar_links (title, url, sort_order) VALUES
('Welrent Act', 'https://act.welrent.com/', 1);

CREATE TABLE IF NOT EXISTS footer_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0
);

INSERT INTO footer_links (category, title, url, sort_order) VALUES
('Places', 'Rent in Amsterdam', '#', 1),
('Places', 'Rent in Brussels', '#', 2),
('Places', 'Rent in Antwerp', '#', 3),
('Places', 'Rent in Rotterdam', '#', 4),
('Places', 'Other Cities...', '#', 5),

('Special Cars', 'Electric Cars', '#', 1),
('Special Cars', 'Vans & Minibuses', '#', 2),
('Special Cars', 'Convertibles', '#', 3),
('Special Cars', 'SUVs & 4x4s', '#', 4),
('Special Cars', 'Other Models...', '#', 5),

('Conditions', 'Insurance', '#', 1),
('Conditions', 'Privacy Policy', '#', 2),
('Conditions', 'Terms of Service', '#', 3),
('Conditions', 'Cookie Policy', '#', 4),
('Conditions', 'Security', '#', 5),

('About', 'Our Mission', '#', 1),
('About', 'Help Center', '#', 2),
('About', 'How it works', '#', 3),
('About', 'Press', '#', 4),
('About', 'Blog', '#', 5);
