/**
 * Collects comprehensive device, browser, screen, and session metadata.
 */
export const getDeviceAndBrowserMetadata = () => {
  if (typeof window === 'undefined') return {};

  // Unique Anonymous Visitor ID
  let visitorId = localStorage.getItem('livora_visitor_id');
  if (!visitorId) {
    visitorId = 'vis_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem('livora_visitor_id', visitorId);
  }

  // Visit Count
  let visitCount = parseInt(localStorage.getItem('livora_visit_count') || '0', 10) + 1;
  localStorage.setItem('livora_visit_count', String(visitCount));

  // First seen
  let firstSeen = localStorage.getItem('livora_first_seen');
  if (!firstSeen) {
    firstSeen = new Date().toISOString();
    localStorage.setItem('livora_first_seen', firstSeen);
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';

  return {
    visitorId,
    visitCount,
    firstSeen,
    lastSeen: new Date().toISOString(),
    userAgent: navigator.userAgent || '',
    language: navigator.language || 'en',
    languages: navigator.languages ? Array.from(navigator.languages) : [navigator.language],
    platform: navigator.platform || '',
    deviceType: isMobile ? 'Mobile' : 'Desktop / Laptop',
    screenResolution: `${window.screen?.width || 0} x ${window.screen?.height || 0}`,
    viewportSize: `${window.innerWidth} x ${window.innerHeight}`,
    devicePixelRatio: window.devicePixelRatio || 1,
    timezone,
    networkType: navigator.connection?.effectiveType || 'standard',
    referrer: document.referrer || 'Direct / Bookmark',
    currentPath: window.location.pathname,
    pageUrl: window.location.href
  };
};
