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

/**
 * Calculate estimated delivery turnaround time (TAT) based on Delhivery Zone and Mode (SURFACE or EXPRESS)
 * Dispatched from Ahmedabad facility (PIN 380015)
 */
export const getEstimatedDelivery = (zone = 'C', mode = 'SURFACE', baseDate = new Date()) => {
  const z = String(zone || 'C').toUpperCase();
  let minDays = 3;
  let maxDays = 5;
  let transitDays = '3 – 4 Days (Insured Ground Courier)';

  if (z.startsWith('A')) {
    // Local / Intra-city (Ahmedabad to Ahmedabad)
    minDays = 1;
    maxDays = 2;
    transitDays = '1 – 2 Days (Local Courier)';
  } else if (z.startsWith('B')) {
    // Regional / Intra-state (Gujarat - Surat, Vadodara, Rajkot, etc.)
    minDays = 2;
    maxDays = 3;
    transitDays = '2 – 3 Days (Regional Courier)';
  } else if (z.startsWith('C')) {
    // Metros (Mumbai, Delhi-NCR, Bengaluru, Hyderabad, Kolkata, Chennai, Pune)
    minDays = 3;
    maxDays = 5;
    transitDays = '3 – 4 Days (Express Metro Transit)';
  } else if (z.startsWith('D')) {
    // Rest of India
    minDays = 4;
    maxDays = 6;
    transitDays = '4 – 6 Days (All India Courier)';
  } else if (z.startsWith('E')) {
    // Special zones (North East, J&K, Islands)
    minDays = 6;
    maxDays = 8;
    transitDays = '6 – 8 Days (Special Zone Courier)';
  }

  const now = baseDate instanceof Date ? baseDate : new Date();
  const minDate = new Date(now.getTime() + minDays * 24 * 60 * 60 * 1000);
  const maxDate = new Date(now.getTime() + maxDays * 24 * 60 * 60 * 1000);
  const formatShort = (d) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  return {
    zone: z,
    mode: mode === 'EXPRESS' ? 'EXPRESS' : 'SURFACE',
    daysRange: `${minDays} – ${maxDays} Days`,
    dateRange: `${formatShort(minDate)} – ${formatShort(maxDate)}`,
    expectedDate: formatShort(maxDate),
    transitDays
  };
};
