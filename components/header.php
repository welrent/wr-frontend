<?php 
require_once __DIR__ . '/../lib/assets.php'; 
require_once __DIR__ . '/../lib/db.php';
$db = new Database();
$navbarLinks = $db->getNavbarLinks();
?>
<header>
    <div class="container header-content">
        <div class="header-left">
            <a href="/" class="logo">
                <img src="<?= asset('WLR_LOGO_APP') ?>" alt="Welrent App Logo">
            </a>
            <div class="search-container">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" placeholder="Search...">
                <span class="search-kbd">⌘ K</span>
            </div>
        </div>
        <div class="header-right">
            <?php foreach($navbarLinks as $nlink): ?>
                <a href="<?= htmlspecialchars($nlink['url']) ?>"><?= htmlspecialchars($nlink['title']) ?></a>
            <?php endforeach; ?>
            <span>You are not logged in</span>
            <div class="user-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
        </div>
    </div>
</header>

<script>
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if(header) {
        if (window.scrollY > 10) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
});
</script>
