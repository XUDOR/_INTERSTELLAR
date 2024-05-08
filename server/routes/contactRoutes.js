//contactRoutes/js


const express = require('express');
const router = express.Router();
const sendEmail = require('../services/mailer'); // Adjust the path if necessary

// Route to handle contact form submission
router.post('/send-contact-email', async (req, res) => {
    const { name, email, date, content } = req.body;

    const htmlContent = `
        <h1>New Contact Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Message:</strong> ${content}</p>
    `;

    try {
        await sendEmail(
            'interstellarpackages@gmail.com', // The destination email address
            'New Contact Request', // Email subject
            htmlContent // Email content in HTML
        );
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    }
});

module.exports = router;
