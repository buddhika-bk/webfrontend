import React, { createContext, useState, useContext, useEffect } from 'react';
import { userAPI, setUserAuth, clearUserAuth, getUser } from '../screen/services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await userAPI.getMe();
        setUser(response.data.user);
        setUserAuth(token, response.data.user);
      } catch (err) {
        console.error('Auth check failed:', err);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await userAPI.login(email, password);
      const { token, user } = response.data;
      setUserAuth(token, user);
      setUser(user);
      return { success: true, user };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const response = await userAPI.register(userData);
      const { token, user } = response.data;
      setUserAuth(token, user);
      setUser(user);
      return { success: true, user };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    clearUserAuth();
    setUser(null);
  };

  const updateProfile = async (data) => {
    setError(null);
    try {
      const response = await userAPI.updateProfile(data);
      setUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (err) {
      const message = err.response?.data?.message || 'Update failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    setError(null);
    try {
      await userAPI.updatePassword(currentPassword, newPassword);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Password update failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
    isAuthenticated: !!user,
    isAdmin: user?.userType === 'admin',
    isPersonal: user?.userType === 'personal',
    isBusiness: user?.userType === 'business',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};