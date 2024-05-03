import React from 'react';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PropTypes from 'prop-types';

// Initialize Stripe outside the component to avoid re-creating the Stripe object on every render
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Cart = ({ cartItems, onRemoveFromCart }) => {
    // Calculate total price of the cart
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log("Calculated Total: ", total);
    return (
        <div className="cart">
            <h2 className="cart-title">Cart</h2>
            {cartItems.length > 0 ? (
                cartItems.map(item => (
                    <CartItem key={item.id} item={item} onRemoveFromCart={onRemoveFromCart} />
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            
            <Elements stripe={stripePromise}>
                <CheckoutForm total={total} />
            </Elements>
        </div>
    );
};

// Adding PropTypes to validate props
Cart.propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    })).isRequired,
    onRemoveFromCart: PropTypes.func.isRequired
};

export default Cart;
