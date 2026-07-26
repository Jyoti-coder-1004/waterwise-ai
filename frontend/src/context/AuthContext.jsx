import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('waterwise_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('waterwise_token') || null);
  const [loading, setLoading] = useState(true);

  // Sync token in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('waterwise_token', token);
    } else {
      localStorage.removeItem('waterwise_token');
    }
  }, [token]);

  // Sync user in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('waterwise_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('waterwise_user');
    }
  }, [user]);

  // Verify and fetch profile on initial load if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getProfile();
          if (res) {
            setUser(res);
          }
        } catch (err) {
          console.warn('Auth validation failed:', err);
          // Don't auto-logout if offline/offline server, but if 401 error clear session
          if (err.message && err.message.includes('401')) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData, userToken) => {
    if (userToken) setToken(userToken);
    if (userData) setUser(userData);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Logout API error:', err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('waterwise_user');
      localStorage.removeItem('waterwise_token');
    }
  };

  const updateUser = (updatedFields) => {
    setUser(prev => prev ? { ...prev, ...updatedFields } : updatedFields);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
