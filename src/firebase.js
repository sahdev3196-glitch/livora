import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase App & Services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
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
