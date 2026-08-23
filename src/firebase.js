import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber 
} from "firebase/auth";

// Official LIVORA Firebase Project Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuKjGfsOSkTNqWJvW4KStpivKSBh_rnK4",
  authDomain: "livora-b95eb.firebaseapp.com",
  projectId: "livora-b95eb",
  storageBucket: "livora-b95eb.firebasestorage.app",
  messagingSenderId: "240971806902",
  appId: "1:240971806902:web:68fa833d141e77ac574e17",
  measurementId: "G-219T5YKKZQ"
};

// Initialize Firebase App & Auth Services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Perform Google Popup Authentication using Firebase Auth SDK
 */
export const signInWithGoogleFirebase = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      success: true,
      user: {
        id: user.uid,
        name: user.displayName || (user.email ? user.email.split('@')[0] : 'User'),
        email: user.email,
        avatar: user.photoURL,
        provider: 'google'
      }
    };
  } catch (error) {
    console.error("Firebase Google Auth Error:", error);
    return {
      success: false,
      error: error.message || "Google Authentication failed"
    };
  }
};

/**
 * Setup Invisible or Visible reCAPTCHA verifier for Phone Auth
 */
export const setupRecaptcha = (containerId = 'recaptcha-container') => {
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {
      console.warn("Could not clear previous recaptcha:", e);
    }
  }
  
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    },
    'expired-callback': () => {
      console.warn("reCAPTCHA expired. Please try again.");
    }
  });

  return window.recaptchaVerifier;
};

/**
 * Send Phone OTP via Firebase Auth
 */
export const sendFirebasePhoneOtp = async (phoneNumber, appVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return { success: true, confirmationResult };
  } catch (error) {
    console.error("Firebase Phone OTP Send Error:", error);
    let msg = error.message || "Failed to send SMS OTP.";
    if (error.code === 'auth/invalid-phone-number') {
      msg = "Invalid phone number. Please include the country code (e.g. +91 9876543210).";
    } else if (error.code === 'auth/too-many-requests') {
      msg = "Too many attempts. Please try again in a few minutes.";
    } else if (error.code === 'auth/quota-exceeded') {
      msg = "SMS quota exceeded for today.";
    }
    return { success: false, error: msg };
  }
};

/**
 * Verify Phone OTP code
 */
export const verifyFirebasePhoneOtp = async (confirmationResult, otpCode) => {
  try {
    const result = await confirmationResult.confirm(otpCode);
    const user = result.user;
    return {
      success: true,
      user: {
        id: user.uid,
        name: user.displayName || `Customer (${user.phoneNumber.slice(-4)})`,
        phone: user.phoneNumber,
        email: user.email || '',
        provider: 'phone'
      }
    };
  } catch (error) {
    console.error("Firebase OTP Verification Error:", error);
    let msg = error.message || "Invalid OTP code entered.";
    if (error.code === 'auth/invalid-verification-code') {
      msg = "Incorrect OTP code. Please check and try again.";
    } else if (error.code === 'auth/code-expired') {
      msg = "OTP code has expired. Please request a new code.";
    }
    return { success: false, error: msg };
  }
};

