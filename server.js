require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes.js'); // Ensure this path is correct
const homeRoutes = require('./Routes/homeRoutes.js'); 
const app = express();

// MongoDB connection string from environment variables
const mongoURI = process.env.MONGO_DB;

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON payloads

// Auth routes
app.use("/api/home", homeRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api/business', businessRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
