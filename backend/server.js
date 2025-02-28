require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Make sure JSON body parsing is enabled

// Import Routes
const formRoutes = require('./routes/formRoutes');  // ✅ Ensure correct path
app.use('/api', formRoutes);  // ✅ Prefix API routes with /api

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Default route
app.get("/", (req, res) => {
    res.send("Backend API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
