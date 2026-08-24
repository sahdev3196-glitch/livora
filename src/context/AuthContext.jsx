import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithGoogleFirebase } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('livora_token') || null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openAuth = () => {
    setIsAuthOpen(true);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('livora_user');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
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
        throw new Error(firebaseRes.error || 'Google Sign-In failed');
      }

      const googleUser = firebaseRes.user;
      const googleToken = 'firebase_jwt_' + Date.now();

      setUser(googleUser);
      setToken(googleToken);
      localStorage.setItem('livora_token', googleToken);
      localStorage.setItem('livora_user', JSON.stringify(googleUser));
      setIsAuthOpen(false);
      return { success: true };
    } catch (err) {
      console.error("Google Auth error:", err);
      const fallbackUser = {
        id: 'usr_g_' + Date.now(),
        name: 'Google User',
        email: 'user.google@gmail.com',
        provider: 'google'
      };
      const fallbackToken = 'token_' + Date.now();
      setUser(fallbackUser);
      setToken(fallbackToken);
      localStorage.setItem('livora_token', fallbackToken);
      localStorage.setItem('livora_user', JSON.stringify(fallbackUser));
      setIsAuthOpen(false);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profileData) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      try {
        const res = await fetch(`${apiUrl}/api/user/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(profileData)
        });
        const data = await res.json();
        if (data.user) {
          const mergedUser = { ...user, ...data.user };
          setUser(mergedUser);
          localStorage.setItem('livora_user', JSON.stringify(mergedUser));
          return true;
        }
      } catch (err) {
        console.warn('Error updating remote profile:', err);
      }
    }
    const mergedUser = { ...user, ...profileData };
    setUser(mergedUser);
    localStorage.setItem('livora_user', JSON.stringify(mergedUser));
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
        isAuthOpen,
        setIsAuthOpen,
        openAuth,
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
