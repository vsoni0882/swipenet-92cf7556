
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { protect } = require('../middleware/auth');

// Create a test transporter for development
// In production, you'd use real SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  }
});

// Send email to multiple recipients
router.post('/send-cold-emails', protect, async (req, res) => {
  try {
    const { subject, messageTemplate, senderName, senderEmail, recipientEmails } = req.body;
    
    if (!subject || !messageTemplate || !senderEmail || !recipientEmails || !recipientEmails.length) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail)) {
      return res.status(400).json({ message: 'Invalid sender email format' });
    }

    // Validate recipient emails
    const invalidEmails = recipientEmails.filter(email => !emailRegex.test(email));
    if (invalidEmails.length > 0) {
      return res.status(400).json({ 
        message: 'Some recipient emails are invalid', 
        invalidEmails 
      });
    }

    // Send emails to each recipient
    const emailPromises = recipientEmails.map(recipientEmail => {
      const mailOptions = {
        from: `"${senderName}" <${senderEmail}>`,
        to: recipientEmail,
        subject: subject,
        text: messageTemplate,
        html: messageTemplate.replace(/\n/g, '<br>'),
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);

    res.status(200).json({ message: `Cold emails sent to ${recipientEmails.length} recipients` });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send emails', error: error.message });
  }
});

module.exports = router;
