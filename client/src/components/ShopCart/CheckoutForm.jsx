import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CARD_STYLES = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      '::placeholder': {
        color: "#96a508"
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    },
  },
  hidePostalCode: true
};

const CheckoutForm = ({ total }) => {
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
        amount: total,
        currency: 'cad' // <--- i could change to CAD
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
