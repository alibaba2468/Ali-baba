import { useState } from 'react';
import { createPayment, approvePayment, completePayment } from '../services/paymentService';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const initiatePayment = async (paymentData) => {
    try {
      setLoading(true);
      setPaymentStatus(null);

      // Step 1: Create payment request
      const createResponse = await createPayment({
        amount: paymentData.amount,
        memo: `ALI BABA Marketplace - ${paymentData.items.length} items`,
        metadata: {
          items: paymentData.items,
          userId: paymentData.userId,
          shippingInfo: paymentData.shippingInfo
        }
      });

      if (!createResponse.success) {
        throw new Error(createResponse.message);
      }

      // Step 2: Show payment dialog to user
      const paymentId = createResponse.payment.identifier;
      
      // Wait for user to approve in Pi App
      const approveResponse = await approvePayment(paymentId);
      
      if (!approveResponse.success) {
        throw new Error('Payment approval failed');
      }

      // Step 3: Complete payment on backend
      const completeResponse = await completePayment(paymentId);
      
      if (completeResponse.success) {
        setPaymentStatus({
          type: 'success',
          message: '✅ Payment completed successfully!'
        });
      } else {
        throw new Error(completeResponse.message);
      }
    } catch (error) {
      setPaymentStatus({
        type: 'error',
        message: `❌ Payment failed: ${error.message}`
      });
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    paymentStatus,
    initiatePayment
  };
};
