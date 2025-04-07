const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST route to send email
router.post('/send-form', async (req, res) => {
  const { name, email, contact, country, state } = req.body;

  if (!name || !email || !contact || !country) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,      // Your Gmail address
      pass: process.env.EMAIL_PASS       // Gmail App Password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'servicestech@gmail.com',        // ✅ Receiver email
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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Email Error:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

module.exports = router;
