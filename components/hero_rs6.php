<?php require_once __DIR__ . '/../lib/assets.php'; ?>
<section class="hero-rs6">
    <div class="hero-content">
        <div class="hero-text-container huge-text">
            <span class="rent">Rent...</span><br>
            <span class="car-name">an RS6</span>
        </div>
        
        <div class="car-display">
            <img src="<?= asset('WLR_CAR_RS6') ?>" alt="Audi RS6">
            
            <div class="arrows">
                <button class="arrow-btn active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button class="arrow-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Search Widget -->
    <div class="search-widget" style="margin-top: 180px;">
        <div class="tabs">
            <div class="tab active" data-type="car" onclick="setVehicleType('car', this)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="10" width="18" height="9" rx="2"></rect>
                    <path d="M4 10L6.5 5h11l2.5 5"></path><circle cx="7" cy="19" r="2"></circle><circle cx="17" cy="19" r="2"></circle>
                </svg>
                Car
            </div>
            <div class="tab" data-type="motorcycle" onclick="setVehicleType('motorcycle', this)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="5.5" cy="15.5" r="3.5"></circle><circle cx="18.5" cy="15.5" r="3.5"></circle>
                    <path d="M15 6a3.5 3.5 0 1 0-7 0"></path><path d="M12 9v6"></path><path d="M7 12h10"></path>
                </svg>
                Motorcycle
            </div>
        </div>
        <form action="/offerlist" method="GET" class="search-fields">
            <input type="hidden" name="type" id="vTypeInput" value="car">
            
            <div class="field" style="position: relative;">
                <label>Location</label>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <select name="location" id="locSelect" style="border: none; outline: none; background: transparent; font-family: 'Outfit', sans-serif; font-size: 0.95rem; color: #8C929A; font-weight: 400; width: 100%; -webkit-appearance: none; cursor: pointer;">
                        <option value="Long Beach, California">Long Beach, California</option>
                        <option value="Amsterdam Central">Amsterdam Central</option>
                        <option value="Rotterdam Airport">Rotterdam Airport</option>
                        <option value="Brussels Center">Brussels Center</option>
                    </select>
                    <button type="button" onclick="detectLocation()" title="Detect Location" style="background: none; border: none; cursor: pointer; color: #AAB4BF;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                </div>
            </div>
            <div class="field">
                <label>Start</label>
                <input type="datetime-local" name="start" value="2026-12-16T22:30" style="width: 100%; font-family: 'Outfit'; border: none; color: #8C929A; background: transparent;">
            </div>
            <div class="field">
                <label>End</label>
                <input type="datetime-local" name="end" value="2026-12-16T22:30" style="width: 100%; font-family: 'Outfit'; border: none; color: #8C929A; background: transparent;">
            </div>
            <div class="field" style="flex: 0 0 auto; padding: 0 0 0 20px;">
                <button type="submit" class="btn-search">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </div>
        </form>
    </div>
</section>

<script>
function setVehicleType(type, el) {
    document.getElementById('vTypeInput').value = type;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
}

function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                document.getElementById('locSelect').value = 'Amsterdam Central';
                alert("Location detected: Amsterdam Central");
            },
            function(error) {
                alert("Please allow location access to automatically detect.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
</script>
