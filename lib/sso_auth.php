<?php
// Simple SSO Auth mock for the future integration with Welrent Act
class SSOAuth {
    public function getUser() {
        // Logic to verify token and return user profile
        return null; // returning null represents "Not logged in"
    }
}
$auth = new SSOAuth();
?>
