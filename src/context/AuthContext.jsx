import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithGoogleFirebase } from '../firebase';
import { syncUserToFirestore, getUserProfileFromFirestore } from '../services/firestoreService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('livora_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('livora_user');
    if (savedUser && token) {
      try {
        const parsed = JSON.parse(savedUser);
        // Clean up legacy mock dummy user if it was saved previously
        if (parsed.email === 'user.google@gmail.com' || parsed.id?.startsWith('usr_g_')) {
          localStorage.removeItem('livora_user');
          localStorage.removeItem('livora_token');
          setUser(null);
          setToken(null);
          return;
        }

        setUser(parsed);
        // Refresh profile from Firestore if available
        if (parsed.id) {
          getUserProfileFromFirestore(parsed.id).then(remoteUser => {
            if (remoteUser) {
              const updated = { ...parsed, ...remoteUser };
              setUser(updated);
              localStorage.setItem('livora_user', JSON.stringify(updated));
            }
          }).catch(() => {});
        }
      } catch (e) {
        localStorage.removeItem('livora_user');
      }
    }
  }, [token]);

  const googleLogin = async () => {
    setLoading(true);
    try {
      const firebaseRes = await signInWithGoogleFirebase();
      if (!firebaseRes.success) {
        return { success: false, error: firebaseRes.error, code: firebaseRes.code };
      }

      const googleUser = firebaseRes.user;
      const googleToken = 'firebase_jwt_' + Date.now();

      // Sync user profile to Firestore
      await syncUserToFirestore(googleUser);

      setUser(googleUser);
      setToken(googleToken);
      localStorage.setItem('livora_token', googleToken);
      localStorage.setItem('livora_user', JSON.stringify(googleUser));
      return { success: true };
    } catch (err) {
      console.error("Google Auth error:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profileData) => {
    const mergedUser = { ...user, ...profileData };
    setUser(mergedUser);
    localStorage.setItem('livora_user', JSON.stringify(mergedUser));

    // Save directly to Firestore
    await syncUserToFirestore(mergedUser);

    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('livora_token');
    localStorage.removeItem('livora_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        googleLogin,
        updateUserProfile,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
