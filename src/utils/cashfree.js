/**
 * Helper to dynamically load Cashfree Checkout SDK v3 if not already present
 */
export const loadCashfreeScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Cashfree) {
      resolve(true);
      return;
    }
    const existing = document.querySelector('script[src*="cashfree.com"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.error('Failed to load Cashfree SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
