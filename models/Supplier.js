const mongoose = require('mongoose');

// Define the schema
const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
}, { timestamps: true });

// Create the model
const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;