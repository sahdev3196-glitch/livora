/**
 * Pincode Verification and Lookup Utility for India
 * Uses official India Post Open API with client caching & graceful fallback
 */

const pincodeCache = new Map();

export const verifyAndLookupPincode = async (pincodeInput) => {
  const cleaned = String(pincodeInput || '').trim();

  // Basic format validation: 6 digits, cannot start with 0
  if (!/^[1-9][0-9]{5}$/.test(cleaned)) {
    return {
      valid: false,
      error: 'Please enter a valid 6-digit Indian PIN code.'
    };
  }

  // Check in-memory cache
  if (pincodeCache.has(cleaned)) {
    return pincodeCache.get(cleaned);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

    const response = await fetch(`https://api.postalpincode.in/pincode/${cleaned}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
      const primaryOffice = data[0].PostOffice[0];
      const result = {
        valid: true,
        pincode: cleaned,
        city: primaryOffice.District || primaryOffice.Block || primaryOffice.Name,
        district: primaryOffice.District || '',
        state: primaryOffice.State || '',
        postOffices: data[0].PostOffice.map(po => po.Name).slice(0, 5)
      };

      pincodeCache.set(cleaned, result);
      return result;
    } else {
      const result = {
        valid: false,
        pincode: cleaned,
        error: 'PIN code not found in Indian postal registry. Please check for typos.'
      };
      return result;
    }
  } catch (err) {
    console.warn("Postal API lookup failed, fallback to format check:", err);
    // Graceful offline fallback: if format is valid, do not block the user
    return {
      valid: true,
      pincode: cleaned,
      fallback: true
    };
  }
};
