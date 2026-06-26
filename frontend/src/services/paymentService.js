import apiClient from './api';

const PAYMENT_API = `${process.env.REACT_APP_API_URL}/api/payments`;

// Create payment request
export const createPayment = async (paymentData) => {
  try {
    const response = await apiClient.post(`${PAYMENT_API}/create`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

// Approve payment on server
export const approvePayment = async (paymentId) => {
  try {
    const response = await apiClient.post(`${PAYMENT_API}/approve`, {
      paymentId
    });
    return response.data;
  } catch (error) {
    console.error('Error approving payment:', error);
    throw error;
  }
};

// Complete payment
export const completePayment = async (paymentId) => {
  try {
    const response = await apiClient.post(`${PAYMENT_API}/complete`, {
      paymentId
    });
    return response.data;
  } catch (error) {
    console.error('Error completing payment:', error);
    throw error;
  }
};

// Get payment status
export const getPaymentStatus = async (paymentId) => {
  try {
    const response = await apiClient.get(`${PAYMENT_API}/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};

export default {
  createPayment,
  approvePayment,
  completePayment,
  getPaymentStatus
};
