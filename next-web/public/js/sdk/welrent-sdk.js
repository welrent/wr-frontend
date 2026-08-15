/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║         WelrentAuth SDK — welrent-sdk.js                ║
 * ║  Single Sign-On client for the Welrent ecosystem        ║
 * ║  Hosted: https://act.welrent.com/js/sdk/welrent-sdk.js  ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * Usage on act.welrent.com (or any consumer app):
 *   <script src="https://act.welrent.com/js/sdk/welrent-sdk.js"></script>
 *
 *   WelrentAuth.login();
 *   WelrentAuth.logout();
 *   WelrentAuth.onAuthStateChanged((user) => { ... });
 *   WelrentAuth.getUser(); // returns user object or null
 */

(function (window) {
    'use strict';

    // ─── Configuration ───────────────────────────────────────────────────────
    // Auto-detect: use localhost:3000 when running locally, production otherwise
    var _isLocal = (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === ''
    );

    var ACCOUNTS_ORIGIN  = _isLocal
        ? 'http://localhost:3000'
        : 'https://accounts.welrent.com';

    var ACCOUNTS_LOGIN   = _isLocal
        ? 'http://localhost:3000/login'
        : 'https://accounts.welrent.com/auth/login';

    var VERIFY_ENDPOINT  = '/api/sso/verify';
    var LOGOUT_ENDPOINT  = '/api/sso/logout';
    var STORAGE_KEY      = 'welrent_sso_user';

    // Popup dimensions
    const POPUP_WIDTH  = 480;
    const POPUP_HEIGHT = 620;

    // ─── Internal State ───────────────────────────────────────────────────────
    let _listeners    = [];
    let _popupWindow  = null;
    let _messageHandlerBound = false;

    // ─── Helpers ──────────────────────────────────────────────────────────────

    function _getStoredUser() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function _storeUser(user) {
        try {
            if (user) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (e) { /* storage unavailable */ }
    }

    function _notifyListeners(user) {
        _listeners.forEach(function (cb) {
            try { cb(user); } catch (e) { console.error('[WelrentAuth] Listener error:', e); }
        });
    }

    function _openPopup(url) {
        const left = Math.round(window.screenX + (window.outerWidth  - POPUP_WIDTH)  / 2);
        const top  = Math.round(window.screenY + (window.outerHeight - POPUP_HEIGHT) / 2);

        return window.open(
            url,
            'welrent_sso_login',
            [
                'width='  + POPUP_WIDTH,
                'height=' + POPUP_HEIGHT,
                'left='   + left,
                'top='    + top,
                'toolbar=no',
                'menubar=no',
                'scrollbars=yes',
                'resizable=no',
                'status=no',
            ].join(',')
        );
    }

    // ─── postMessage Handler ──────────────────────────────────────────────────

    function _handleMessage(event) {
        // Trust messages from the configured accounts origin (auto-detects local vs prod)
        var trustedOrigins = [
            'https://accounts.welrent.com',
            'http://localhost:3000',
            'http://127.0.0.1:3000',
        ];
        if (trustedOrigins.indexOf(event.origin) === -1) return;

        var data = event.data;
        if (!data || data.type !== 'WELRENT_SSO_TOKEN') return;

        // Close popup immediately
        if (_popupWindow && !_popupWindow.closed) {
            _popupWindow.close();
            _popupWindow = null;
        }

        var token       = data.token       || '';
        var displayName = data.displayName || '';
        var photoUrl    = data.photoUrl    || '';
        var email       = data.email       || '';
        var uid         = data.uid         || '';

        // ── STEP 1: Update the navbar RIGHT NOW from postMessage data ──────────
        // Never wait for the server — the popup sent us this data directly.
        var immediateUser = {
            uid:         uid,
            email:       email,
            displayName: displayName,
            photoUrl:    photoUrl,
        };
        _storeUser(immediateUser);
        _notifyListeners(immediateUser);
        console.info('[WelrentAuth] Signed in as', email, '(navbar updated, verifying session…)');

        // ── STEP 2: Verify server-side in background (PHP session only) ────────
        // This creates $_SESSION['sso_user'] for PHP pages.
        // If it fails (e.g. Firebase creds not configured), UI is already correct.
        if (token) {
            fetch(VERIFY_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ token: token })
            })
            .then(function (res) { return res.json(); })
            .then(function (result) {
                if (result.valid) {
                    // Enrich stored user with server-confirmed data if different
                    var confirmed = {
                        uid:         result.uid         || uid,
                        email:       result.email        || email,
                        displayName: result.displayName  || displayName,
                        photoUrl:    result.photoUrl     || photoUrl,
                    };
                    _storeUser(confirmed);
                    // Only re-notify if data actually changed
                    if (confirmed.displayName !== immediateUser.displayName ||
                        confirmed.photoUrl    !== immediateUser.photoUrl) {
                        _notifyListeners(confirmed);
                    }
                    console.info('[WelrentAuth] PHP session created for', confirmed.email);
                } else {
                    // Server rejected token — still keep the client-side session
                    // but log the issue. Don't clear the user.
                    console.warn('[WelrentAuth] Server session failed:', result.error,
                        '(user stays logged in client-side)');
                }
            })
            .catch(function (err) {
                // Network/server error — UI is already updated, that's fine.
                console.warn('[WelrentAuth] Background verify failed (non-critical):', err);
            });
        }
    }

    // ─── Public API ───────────────────────────────────────────────────────────

    var WelrentAuth = {

        /**
         * Open the accounts.welrent.com login popup.
         * After a successful login, onAuthStateChanged listeners are fired.
         */
        login: function () {
            // Bind postMessage listener once
            if (!_messageHandlerBound) {
                window.addEventListener('message', _handleMessage);
                _messageHandlerBound = true;
            }

            // Close existing popup if still open
            if (_popupWindow && !_popupWindow.closed) {
                _popupWindow.focus();
                return;
            }

            var returnTo = encodeURIComponent(window.location.origin);
            _popupWindow = _openPopup(ACCOUNTS_LOGIN + '?return_to=' + returnTo);

            if (!_popupWindow) {
                // Popup was blocked — fall back to redirect
                console.warn('[WelrentAuth] Popup blocked. Redirecting to accounts portal.');
                window.location.href = ACCOUNTS_LOGIN + '?return_to=' + returnTo + '&mode=redirect';
            }
        },

        /**
         * Sign out the current user.
         * Clears localStorage and destroys the PHP session via /api/sso/logout.
         */
        logout: function () {
            _storeUser(null);
            _notifyListeners(null);

            fetch(LOGOUT_ENDPOINT, {
                method: 'POST',
                credentials: 'same-origin',
            }).catch(function (e) {
                console.warn('[WelrentAuth] Logout request failed (session may still be cleared locally):', e);
            });
        },

        /**
         * Register a callback that fires whenever auth state changes.
         * Fires immediately with the current user (or null).
         *
         * @param {Function} callback  fn(user | null)
         * @returns {Function}         Unsubscribe function
         */
        onAuthStateChanged: function (callback) {
            if (typeof callback !== 'function') return function () {};
            _listeners.push(callback);

            // Immediately call with stored state
            callback(_getStoredUser());

            // Return unsubscribe
            return function () {
                _listeners = _listeners.filter(function (fn) { return fn !== callback; });
            };
        },

        /**
         * Synchronously returns the current user from localStorage, or null.
         * @returns {{ uid, email, displayName, photoUrl } | null}
         */
        getUser: function () {
            return _getStoredUser();
        },

        /**
         * Returns true if a user is currently signed in.
         * @returns {boolean}
         */
        isSignedIn: function () {
            return _getStoredUser() !== null;
        },
    };

    // ─── Expose globally ──────────────────────────────────────────────────────
    window.WelrentAuth = WelrentAuth;

    // ─── Also keep backwards-compat ApiClient ────────────────────────────────
    // (ApiClient was previously loaded from this path — preserve the global)
    if (!window.WelrentAPI) {
        window.WelrentAPI = {
            search: async function (query) {
                try {
                    const res = await fetch('/api/search?q=' + encodeURIComponent(query));
                    if (!res.ok) throw new Error('Search failed');
                    const data = await res.json();
                    return data.results || [];
                } catch (e) {
                    console.error('[WelrentAPI] Search error:', e);
                    return [];
                }
            }
        };
    }

}(window));
