import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CARD_STYLES = {
  style: {
    base: {
      color: "#fff",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "18px",
      '::placeholder': {
        color: "#fff"
      },
     //padding: '10px', // Give some padding inside the CardElement
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    },
  },
  hidePostalCode: true // If you want to hide the postal code field
};

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading during processing

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    setError(null);  // Reset errors on new submission
    setMessage('');

    if (!stripe || !elements) {
      console.log("Stripe.js hasn't loaded yet.");
      setError("Stripe.js is not fully loaded. Please try again later.");
      setLoading(false); // Stop loading as there is an error
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false); // Stop loading as there is an error
    } else {
      axios({
        method: 'post',
        url: 'https://interstellar-fdok.onrender.com/api/payment',
        headers: { 'Content-Type': 'application/json' },
        data: {
          paymentMethodId: paymentMethod.id,
          amount: total,
          currency: 'usd'
        }
      })
      .then(response => {
        setLoading(false); // Stop loading once the response is received
        if (response.data.success) {
          setMessage('Payment successful!');
        } else {
          setError('Payment failed. Please try again.');
        }
      })
      .catch(error => {
        setError('Network error. Please try again.');
        setLoading(false); // Stop loading as there is a network error
      });
    }
  };

  return (
    <form className="PaymentForm" onSubmit={handleSubmit}>
      <CardElement options={CARD_STYLES} />
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}
      <button className="PayButton" type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
