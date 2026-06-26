import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('piToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  return {
    token,
    loading,
    setToken
  };
};
