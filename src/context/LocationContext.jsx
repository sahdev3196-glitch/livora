import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { setCookie, getCookie } from '../utils/cookieUtils';
import { useAuth } from './AuthContext';

const LocationContext = createContext();

const COOKIE_LOCATION_KEY = 'livora_user_location';
const COOKIE_CONSENT_KEY = 'livora_location_consent';

export const LocationProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [userLocation, setUserLocation] = useState(null);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync location data to backend database if user is logged in
  const syncLocationToDatabase = useCallback(async (locData, currentUser, currentToken) => {
    if (!locData || (!currentUser && !currentToken)) return;
    try {
      const email = currentUser?.email;
      const headers = { 'Content-Type': 'application/json' };
      if (currentToken) {
        headers['Authorization'] = `Bearer ${currentToken}`;
      }

      await fetch('/api/user/location', {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          email,
          latitude: locData.latitude,
          longitude: locData.longitude,
          city: locData.city,
          state: locData.state,
          country: locData.country,
          pincode: locData.pincode,
          formattedAddress: locData.formattedAddress,
          consent: true
        })
      });
    } catch (err) {
      console.warn('Could not sync location to backend database:', err);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    // 1. Check existing cookie or localStorage
    const savedCookie = getCookie(COOKIE_LOCATION_KEY);
    const savedLocal = localStorage.getItem(COOKIE_LOCATION_KEY);
    let existingLocation = null;

    if (savedCookie && typeof savedCookie === 'object') {
      existingLocation = savedCookie;
    } else if (savedLocal) {
      try {
        existingLocation = JSON.parse(savedLocal);
      } catch (e) {}
    }

    if (existingLocation) {
      setUserLocation(existingLocation);
    }

    // 2. Check if user already gave consent or dismissed
    const consent = getCookie(COOKIE_CONSENT_KEY) || localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (!consent && !existingLocation) {
      // Delay opening prompt slightly for a smooth initial page entrance
      const timer = setTimeout(() => {
        setIsPromptOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // When user logs in, immediately sync cached location to DB
  useEffect(() => {
    if (user && userLocation) {
      syncLocationToDatabase(userLocation, user, token);
    }
  }, [user, token, userLocation, syncLocationToDatabase]);

  // Reverse geocode latitude and longitude into address/city/state/pincode
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, {
        headers: { 'Accept-Language': 'en' }
      });
      if (!res.ok) throw new Error('Geocoding response not ok');
      const data = await res.json();
      const addr = data.address || {};
      
      const city = addr.city || addr.town || addr.village || addr.suburb || addr.county || 'Local Area';
      const state = addr.state || addr.region || '';
      const country = addr.country || 'India';
      const pincode = addr.postcode || '';
      const formattedAddress = data.display_name || `${city}, ${state}, ${country}`;

      return { city, state, country, pincode, formattedAddress };
    } catch (err) {
      console.warn('Reverse geocoding fallback:', err);
      return {
        city: 'Local Area',
        state: '',
        country: 'India',
        pincode: '',
        formattedAddress: `Lat: ${latitude.toFixed(3)}, Lon: ${longitude.toFixed(3)}`
      };
    }
  };

  // Request browser geolocation permission & process
  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return { success: false, error: 'Geolocation not supported' };
    }

    setLoading(true);
    setError(null);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude, accuracy } = position.coords;
            const geoInfo = await reverseGeocode(latitude, longitude);

            const locationPayload = {
              latitude,
              longitude,
              accuracy,
              ...geoInfo,
              timestamp: new Date().toISOString()
            };

            // 1. Save in state
            setUserLocation(locationPayload);

            // 2. Save in Cookies & LocalStorage
            setCookie(COOKIE_LOCATION_KEY, locationPayload, 365);
            setCookie(COOKIE_CONSENT_KEY, 'granted', 365);
            localStorage.setItem(COOKIE_LOCATION_KEY, JSON.stringify(locationPayload));
            localStorage.setItem(COOKIE_CONSENT_KEY, 'granted');

            // 3. Save in database if logged in
            if (user) {
              await syncLocationToDatabase(locationPayload, user, token);
            }

            setIsPromptOpen(false);
            setLoading(false);
            resolve({ success: true, location: locationPayload });
          } catch (err) {
            console.error('Error processing location coordinates:', err);
            setLoading(false);
            resolve({ success: false, error: err.message });
          }
        },
        (geoError) => {
          let msg = 'Unable to retrieve location.';
          if (geoError.code === geoError.PERMISSION_DENIED) {
            msg = 'Location permission was declined in browser.';
            setCookie(COOKIE_CONSENT_KEY, 'denied', 30);
            localStorage.setItem(COOKIE_CONSENT_KEY, 'denied');
          } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
            msg = 'Location information is unavailable.';
          } else if (geoError.code === geoError.TIMEOUT) {
            msg = 'Location request timed out.';
          }

          setError(msg);
          setLoading(false);
          resolve({ success: false, error: msg });
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
      );
    });
  };

  // User dismisses prompt for 14 days
  const dismissPrompt = () => {
    setIsPromptOpen(false);
    setCookie(COOKIE_CONSENT_KEY, 'dismissed', 14);
    localStorage.setItem(COOKIE_CONSENT_KEY, 'dismissed');
  };

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        isPromptOpen,
        setIsPromptOpen,
        requestLocation,
        dismissPrompt,
        loading,
        error
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useUserLocation = () => useContext(LocationContext);
