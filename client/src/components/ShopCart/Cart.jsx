import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PropTypes from 'prop-types';

// Initialize Stripe outside the component to avoid re-creating the Stripe object on every render
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Cart = ({ cartItems, onRemoveFromCart }) => {
    const [total, setTotal] = useState(0);
    const [customerDetails, setCustomerDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
    });
    const [requiresShipping, setRequiresShipping] = useState(false);

    // Calculate the total price of the cart items
    useEffect(() => {
        const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(newTotal);

        // Check if the cart contains the product that requires shipping
        const shippingRequired = cartItems.some(item => item.id === 20); // Assuming ID 20 requires shipping
        setRequiresShipping(shippingRequired);
    }, [cartItems]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCustomerDetails(prev => ({ ...prev, [name]: value }));
    };

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
            <div className="customer-details">
                <input type="text" name="firstName" placeholder="First Name" value={customerDetails.firstName} onChange={handleInputChange} className="input-field" />
                <input type="text" name="lastName" placeholder="Last Name" value={customerDetails.lastName} onChange={handleInputChange} className="input-field" />
                <input type="email" name="email" placeholder="Email" value={customerDetails.email} onChange={handleInputChange} className="input-field" />
                {requiresShipping && (
                    <>
                        <input type="text" name="addressLine1" placeholder="Address Line 1" value={customerDetails.addressLine1} onChange={handleInputChange} className="input-field" />
                        <input type="text" name="addressLine2" placeholder="Address Line 2" value={customerDetails.addressLine2} onChange={handleInputChange} className="input-field" />
                        <input type="text" name="city" placeholder="City" value={customerDetails.city} onChange={handleInputChange} className="input-field" />
                        <input type="text" name="state" placeholder="State/Province" value={customerDetails.state} onChange={handleInputChange} className="input-field" />
                        <input type="text" name="country" placeholder="Country" value={customerDetails.country} onChange={handleInputChange} className="input-field" />
                        <input type="text" name="postalCode" placeholder="Postal Code" value={customerDetails.postalCode} onChange={handleInputChange} className="input-field" />
                    </>
                )}
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm total={total} customerDetails={customerDetails} />
            </Elements>
        </div>
    );
};

Cart.propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    })).isRequired,
    onRemoveFromCart: PropTypes.func.isRequired
};

export default Cart;
