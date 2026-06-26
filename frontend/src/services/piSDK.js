import apiClient from './api';

// Initialize Pi SDK
export const initPi = async () => {
  return new Promise((resolve, reject) => {
    if (window.Pi) {
      window.Pi.init({
        version: '2.0',
        appId: process.env.REACT_APP_PI_APP_ID
      });
      resolve(window.Pi);
    } else {
      reject(new Error('Pi SDK not loaded'));
    }
  });
};

// Get Pi user
export const getPiUser = async () => {
  if (!window.Pi) {
    throw new Error('Pi SDK not initialized');
  }
  return window.Pi.user.getUser();
};

// Authenticate with Pi
export const authenticateWithPi = async () => {
  if (!window.Pi) {
    throw new Error('Pi SDK not initialized');
  }
  
  try {
    const auth = await window.Pi.authenticate();
    return auth;
  } catch (error) {
    console.error('Pi authentication error:', error);
    throw error;
  }
};

export default { initPi, getPiUser, authenticateWithPi };
