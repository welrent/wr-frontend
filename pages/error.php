<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found | Welrent</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/index.css">
    <style>
        :root {
            --bg: #FFFFFF;
            --accent: #1C263A;
            --text: #1C263A;
            --muted: #9CA3AF;
            --error: #FF3B30;
            --border: #F0F2F5;
        }
        body {
            margin: 0;
            padding: 0;
            background: var(--bg);
            color: var(--text);
            font-family: 'Outfit', sans-serif;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
        }
        
        /* Subtle light grid background */
        .error-bg {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: linear-gradient(var(--border) 1px, transparent 1px),
                              linear-gradient(90deg, var(--border) 1px, transparent 1px);
            background-size: 60px 60px;
            z-index: -1;
            opacity: 0.5;
        }

        /* Center content between header and footer */
        .error-wrapper {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 80px 40px;
            z-index: 1;
        }

        .error-container {
            max-width: 600px;
            text-align: center;
            position: relative;
        }
        .error-code {
            font-family: 'JetBrains Mono', monospace;
            font-size: 10rem;
            font-weight: 800;
            margin: 0;
            line-height: 0.8;
            color: var(--accent);
            opacity: 0.05;
            letter-spacing: -8px;
            user-select: none;
        }
        .error-visual {
            position: relative;
            margin: 0 0 20px;
        }
        .error-title {
            font-size: 2.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: -0.02em;
            margin-bottom: 24px;
            color: var(--accent);
            line-height: 1.1;
        }
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #fff;
            color: var(--accent);
            border: 1px solid var(--border);
            padding: 10px 20px;
            border-radius: 100px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            text-transform: uppercase;
            margin-bottom: 24px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .status-dot {
            width: 10px; height: 10px;
            background: var(--error);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(255, 59, 48, 0.4);
            animation: blink 1.5s infinite;
        }
        @keyframes blink {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
        .btn-home {
            background: var(--accent);
            color: #fff;
            text-decoration: none;
            padding: 18px 36px;
            border-radius: 12px;
            font-weight: 700;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
            display: inline-block;
            box-shadow: 0 10px 20px rgba(28, 38, 58, 0.15);
        }
        .btn-home:hover {
            background: #111827;
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(28, 38, 58, 0.25);
        }
        
        /* Ensure normal header/footer look on white page */
        header.header-scrolled {
            background: #fff !important;
        }
    </style>
</head>
<body>
    <div class="error-bg"></div>

    <!-- Header Component -->
    <?php include __DIR__ . '/../components/header.php'; ?>

    <main class="error-wrapper">
        <div class="error-container">
            <div class="error-visual">
                <div class="error-code"><?= http_response_code() ?></div>
            </div>
            <h1 class="error-title">Find your drive <br>has stalled.</h1>
            <a href="/" class="btn-home">Return to Homepage</a>
        </div>
    </main>

    <!-- Footer Component -->
    <?php include __DIR__ . '/../components/footer.php'; ?>

    <script>
        // Subtle mouse tracking grid effect
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            document.querySelector('.error-bg').style.transform = `translate(${x}px, ${y}px)`;
        });
    </script>
</body>
</html>
