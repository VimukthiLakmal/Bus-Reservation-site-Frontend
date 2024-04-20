import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import Swal from 'sweetalert2';

const PayPalCheckout = ({ userId, cost, bookingId , bookingType}) => {
  const createOrder = (data, actions) => {
    // Replace with your server-side logic to create the PayPal order
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: 10, 
          },
        },
      ],
      application_context: {
          shipping_preference: "NO_SHIPPING"
      }
    });
  };

  const onApprove = (data, actions) => {
    // Replace with your server-side logic to capture the PayPal payment
    return actions.order.capture().then((details) => {
     
      console.log('Payment completed:', details);

      const paymentData = {
        customerId: userId,
        amount: parseFloat(cost),
        paymentMethod: 'PayPal',
        bookingId: bookingId,
        bookingType: bookingType,
      };


      axios.post('http://localhost:5000/payment/addPayments', paymentData)
        .then((response) => {
          // Handle the response from the backend if needed
          console.log('Payment details saved:', response.data);
          Swal.fire({
            title: 'Payment Successful',
            text: 'Your payment has been successfully processed!',
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '../passanger/PassangerDashboard';
            }
          });
        })
        .catch((error) => {
          // Handle any errors that occurred during the API call
          console.error('Error saving payment details:', error);
          Swal.fire('Payment Error', 'An error occurred while processing your payment. Please try again later.', 'error');

        });
    });
  };

  const onError = (err) => {
    // Handle any errors that occur during the PayPal checkout process
    console.error('PayPal error:', err);
  };

  return (
    <PayPalScriptProvider options={{ 'client-id': 'ATWrJS52s-x3Bv35BnBe85xLXFbVDfCumhZ4aeCWsd_2QXDJ_yQUyKfNKW7NybJY5Ex-yJdaZInSeTVr' ,intent: 'capture'}}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;

