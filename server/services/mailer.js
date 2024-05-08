require('dotenv').config();
const nodemailer = require('nodemailer');

// Configure transporter with Gmail and environment variables for security
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,  // Use environment variable for Gmail address
        pass: process.env.GMAIL_PASSWORD  // App password securely stored in your .env file
    }
});

// Function to send emails
const sendEmail = async (to, subject, htmlContent) => {
    const mailOptions = {
        from: 'your-email@gmail.com',  // Sender address
        to: to,                        // Recipient address
        subject: subject,              // Subject line
        html: htmlContent              // Plain text body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

module.exports = sendEmail;
