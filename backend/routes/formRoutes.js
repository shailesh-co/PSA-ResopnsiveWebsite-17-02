const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();

router.post('/send-form', async (req, res) => {
  const { name, email, contact, state, country } = req.body;

  if (!name || !email || !contact || !country) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Email to Admin
  const adminMail = {
    from: process.env.EMAIL_USER,
    to: 'services.psatech@gmail.com',
    subject: 'New Form Submission',
    html: `
      <h3>New User Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>State:</strong> ${state || 'N/A'}</p>
    `
  };

  // Auto-reply to user
const userMail = {
  from: `"PSA Tech" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: 'Thank you for reaching out!',
  html: `
    <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <p>Hello <strong>${name}</strong>,</p>
      
      <p>Thank you for contacting <strong>PSA Tech Industrial Services</strong>. We truly appreciate your interest and the time you took to write to us.</p>
      
      <p><strong>Your Message:</strong></p>
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; margin: 10px 0; font-style: italic;">
     
      </div>
      
      <p>We’ve received your request and will respond shortly. If it’s urgent, feel free to reach us at 
        <a href="mailto:services.psatech@gmail.com" style="color: #1a73e8;">services.psatech@gmail.com</a>.
      </p>
      
      <br>
      <p>Warm regards,</p>
      <p><strong>PSA Tech Team</strong></p>
    </div>
  `
};

  

  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    const user = new User({ name, email, contact, state, country });
    await user.save();

    res.status(200).json({ message: 'Emails sent & user saved to MongoDB successfully!' });
  } catch (err) {
    console.error('Error sending email or saving user:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
