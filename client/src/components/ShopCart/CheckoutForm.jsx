import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CARD_STYLES = {
  style: {
    base: {
      color: "#ffffff", // Ensuring text is white for readability
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      '::placeholder': {
        color: "#96a508" // Placeholder text color
      },
      backgroundColor: "#2b7f8c", // Setting default background color
      
    },
    invalid: {
      color: "#fa755a", // Color for invalid input
      iconColor: "#fa755a" // Icon color for invalid input
    },
    // Targeting the autofill to change the background color when input fields are autofilled
    '::autofill': {
      color: '#fce883', // Change this to your preferred autofill text color if needed
      backgroundColor: '#2b7f8c' // Your desired background color for autofilled content
    }
  },
  hidePostalCode: true
};


const CheckoutForm = ({ total }) => {
  console.log("Received Total in CheckoutForm: ", total);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setError("Stripe.js has not yet loaded. Please try again later.");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const response = await axios.post('https://interstellar-fdok.onrender.com/api/payment', {
        paymentMethodId: paymentMethod.id,
        amount: Math.round(total * 100),
        currency: 'cad' 
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        setMessage('Payment successful!');
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="PaymentForm" onSubmit={handleSubmit}>
      <CardElement options={CARD_STYLES} className="StripeElement" />
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      <button className="PayButton" type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
