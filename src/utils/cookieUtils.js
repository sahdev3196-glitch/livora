/**
 * Utility functions for setting, reading, and clearing browser cookies.
 */

export const setCookie = (name, value, days = 365) => {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const serializedValue = typeof value === 'object' ? JSON.stringify(value) : value;
    document.cookie = `${name}=${encodeURIComponent(serializedValue)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  } catch (err) {
    console.error('Error setting cookie:', name, err);
  }
};

export const getCookie = (name) => {
  try {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match && match[2]) {
      const decoded = decodeURIComponent(match[2]);
      try {
        return JSON.parse(decoded);
      } catch {
        return decoded;
      }
    }
  } catch (err) {
    console.error('Error reading cookie:', name, err);
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
};
