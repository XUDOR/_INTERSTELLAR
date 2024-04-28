import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CARD_STYLES = {
  style: {
    base: {
      color: "#ebefdf",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "18px",
      '::placeholder': {
        color: "#0aaac3"
      },
      padding: '10px', // Give some padding inside the CardElement
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    },
  },
  hidePostalCode: true, // If you want to hide the postal code field
};


const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe.js hasn't loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Implement further logic here, e.g., post to your server for payment processing
    }
  };

  return (
    <form className="PaymentForm" onSubmit={handleSubmit}>
      <CardElement options={CARD_STYLES} />
      <button className="PayButton" type="submit" disabled={!stripe}>
        Pay ${total.toFixed(2)}
      </button>
    </form>
  );
};

export default CheckoutForm;
