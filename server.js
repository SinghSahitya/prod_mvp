require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');


// Replace this with your MongoDB connection string
const mongoURI = process.env.MONGO_DB;

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected to prod_zero'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
const User = require('./models/User'); // Adjust the path as per your project structure

// API routes
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

// Route to save user data
app.post('/api/users', async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const user = new User({ name, email, phone });
      await user.save();
      res.status(201).json({ message: 'User saved successfully', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// // Serve React app in production
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'client/build')));
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
