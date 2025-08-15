// This file is served statically and loaded before the app boots.
// It sets the base URL for API requests.
window.__APP_CONFIG__ = window.__APP_CONFIG__ || {};

// We will use a relative path ('/') for the API URL in all environments.
// - In local development, this makes requests like '/api/...' which are
//   handled by the Vite proxy configured in vite.config.ts. This avoids
//   CORS issues when connecting to a backend from localhost.
// - In production, this ensures requests are same-origin, which is
//   required for the CapRover/Nginx routing to work correctly.
window.__APP_CONFIG__.API_URL = '/';
// Simple cache-busting token for LIFF/webview. Update on each deploy.
window.__APP_CONFIG__.BUILD_ID = 'b' + Math.floor(Date.now() / 1000);

// Optional: Set GOOGLE_MAPS_API_KEY at runtime without rebuild.
// Example: window.__APP_CONFIG__.GOOGLE_MAPS_API_KEY = 'AIza...';
window.__APP_CONFIG__.GOOGLE_MAPS_API_KEY = 'AIzaSyA2Pbk2W5oT1c2Lx68-hVfLvBZ1bawHT1w';