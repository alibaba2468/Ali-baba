import { useState, useEffect } from 'react';
import { initPi } from '../services/piSDK';

export const usePi = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializePi = async () => {
      try {
        const piSDK = await initPi();
        
        // Check if user is already authenticated
        const auth = await piSDK.authenticate();
        if (auth.accessToken) {
          setUser(auth.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Pi SDK initialization error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializePi();
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      const piSDK = await initPi();
      const auth = await piSDK.authenticate();
      
      // Send auth to backend for verification
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: auth.accessToken,
          user: auth.user
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('piToken', data.token);
      }
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Notify backend
      await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('piToken')}`
        }
      });

      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('piToken');
    } catch (err) {
      setError(err.message);
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout
  };
};
