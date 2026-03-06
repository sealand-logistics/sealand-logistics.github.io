export const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : (window.location.hostname === '187.77.184.78'
        ? 'http://187.77.184.78:5000/api'
        : `https://${window.location.hostname}/api`);
