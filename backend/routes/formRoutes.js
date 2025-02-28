const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Correct POST API Route
router.post('/submit-form', async (req, res) => {
    try {
        const { name, email, contact, country, state } = req.body;

        if (!name || !email || !contact || !country) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Save User Data in MongoDB
        const newUser = new User({
            name,
            email,
            contact,
            country,
            state: state || null // If no state is selected, store null
        });

        await newUser.save();

        res.status(201).json({ message: `Hi ${name}, Thank you for submitting the form, we will connect soon!` });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
