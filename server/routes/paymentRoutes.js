const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// POST endpoint to process payments
router.post('/', async (req, res) => {
    console.log(req.body);
    console.log("Received amount on server: ", req.body.amount);
    const { paymentMethodId, amount, currency, customerDetails } = req.body; // Assume customerDetails is being sent

    try {
        // Create a PaymentIntent with the amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method: paymentMethodId,
            confirm: true, // Automatically confirm the payment
            payment_method_types: ['card'], // Specify that only card payments are accepted
            metadata: {
                firstName: customerDetails.firstName,
                lastName: customerDetails.lastName,
                email: customerDetails.email,
                addressLine1: customerDetails.addressLine1 || '',
                addressLine2: customerDetails.addressLine2 || '',
                city: customerDetails.city || '',
                state: customerDetails.state || '',
                country: customerDetails.country || '',
                postalCode: customerDetails.postalCode || '',
            }
        });

        // If successful, send back a success response
        res.status(200).json({ success: true, paymentIntentId: paymentIntent.id });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(400).json({ success: false, message: error.raw.message });
    }
});

module.exports = router;
