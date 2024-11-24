const mongoose = require('mongoose');

// Define the schema
const customerSchema = new mongoose.Schema({
    name : {  type:String, required:true  },
}, { timestamps: true });

// Create the model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;