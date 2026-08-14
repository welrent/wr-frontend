# Car Rental Site Frontend Implementation

This plan outlines the steps to build the frontend of the car rental website using PHP, HTML, and vanilla CSS, matching the provided design exactly. 

## User Review Required

- **Asset Availability**: The design features specific car images (Audi RS6 and Lamborghini Huracan). Since these aren't currently in the `web` folder, I will use high-quality external URLs placeholder images for these cars. Let me know if you will provide them later.
- **PHP Logic**: The request specifies PHP, but currently outlines a static visual design. I will build it as `index.php` with static content. If you want dynamic fetching (e.g., pulling cars from a database), please clarify!

## Proposed Changes

### Configuration
I will create the core files in the `/Users/marktplaats/Desktop/welrent/web` directory.

---

### Core Files

#### [NEW] `index.php`
Will contain the semantic HTML structure:
1.  **Header**: Logo (`wr_app.svg`), search bar, right-side nav (Home, login status).
2.  **Top Hero**: "Rent... an RS6" text, car image, and the search panel (tabs for Car/Motorcycle, Location, Start/End date inputs, search button).
3.  **Bottom Hero**: "Rent... an EVO" text, car image, and "Request assistance" button.
4.  **Info Section**: "Check the real reviews" box and contact details box.
5.  **Footer**: 4 columns (Company, Social Media, Legal links, Subscription box).

#### [NEW] `style.css`
Will contain vanilla CSS to implement the rich aesthetics:
-   **Typography**: Using modern fonts (e.g., 'Inter' from Google Fonts) to match the sleek design.
-   **Colors**: Precise color matching from the mockup (navy blue text, light blue buttons, subtle off-white backgrounds).
-   **Layout**: Heavy use of CSS Grid and Flexbox to replicate the overlapping elements and component layouts.

## Open Questions

1. Are there specific fonts you prefer, or is 'Inter' acceptable?
2. Should the search form make a dummy `POST` or `GET` request or just be visually styled?

## Verification Plan

### Manual Verification
1. I will start a local PHP development server (`php -S localhost:8000`).
2. I will capture a screenshot using the browser subagent to verify the pixel-perfect match to the provided design image.
