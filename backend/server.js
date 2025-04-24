require('dotenv').config(); // Load .env variables

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// app.use('/api', formRoutes);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
const formRoutes = require('./routes/formRoutes');
app.use('/api', formRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Email & WhatsApp API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});
