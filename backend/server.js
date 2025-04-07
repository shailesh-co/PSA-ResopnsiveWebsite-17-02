require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const formRoutes = require('./routes/formRoutes');
app.use('/api', formRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Email API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => {
  console.log("Server started on port 5000");
});

