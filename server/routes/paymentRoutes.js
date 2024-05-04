const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sendEmail = require('./services/mailer'); // Adjust the path if necessary

router.post('/', async (req, res) => {
    console.log(req.body);
    console.log("Received amount on server: ", req.body.amount);
    const { paymentMethodId, amount, currency, customerDetails } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method: paymentMethodId,
            confirm: true,
            payment_method_types: ['card'],
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

        // Prepare the email content
        const emailContent = `
            <h1>Payment Confirmation</h1>
            <p>Thank you for your payment.</p>
            <p><strong>Payment Intent ID:</strong> ${paymentIntent.id}</p>
            <p><strong>Amount:</strong> $${amount / 100} ${currency.toUpperCase()}</p>
            <p><strong>Customer Name:</strong> ${customerDetails.firstName} ${customerDetails.lastName}</p>
        `;

        // Send an email notification
        await sendEmail(
            customerDetails.email, // or your own business email
            'Payment Confirmation',
            emailContent
        );

        res.status(200).json({ success: true, paymentIntentId: paymentIntent.id });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
