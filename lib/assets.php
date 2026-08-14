<?php
/**
 * Welrent Asset Token Registry
 * All asset filenames are mapped through this token system.
 * Usage: echo asset('WLR_LOGO_APP');  → 'assets/WLR_LOGO_APP.svg'
 */

define('ASSETS', [
    // Logos
    'WLR_LOGO_APP'   => 'assets/WLR_LOGO_APP.svg',    // Main App logo
    'WLR_LOGO_ACT'   => 'assets/WLR_LOGO_ACT.svg',    // Welrent Act logo
    'WLR_BRAND_FULL' => 'assets/WLR_BRAND_FULL.svg',  // Full Welrent brand wordmark

    // Icons
    'WLR_ICON_WR'    => 'assets/WLR_ICON_WR.svg',     // WR monogram SVG
    'WLR_ICON_W'     => 'assets/WLR_ICON_W.svg',      // W icon SVG
    'WLR_ICON_PNG'   => 'assets/WLR_ICON_PNG.png',    // WR icon PNG fallback
    'WLR_FAVICON'    => 'assets/WLR_FAVICON.png',     // Favicon

    // Cars
    'WLR_CAR_RS6'    => 'assets/WLR_CAR_RS6.png',     // Audi RS6
    'WLR_CAR_EVO'    => 'assets/WLR_CAR_EVO.png',     // Lamborghini EVO
]);

/**
 * Resolve an asset token to its path.
 */
function asset(string $token): string {
    return ASSETS[$token] ?? "assets/{$token}";
}
