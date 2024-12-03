const mongoose = require('mongoose');
const Purchase = require('./Purchase');
const Sale = require('./Sale');

// Define the schema
const orderSchema = new mongoose.Schema({
    purchase : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Purchase',
        required : false
    },
    sale: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Sale',
        required : false
    }

}, { timestamps: true });

// Create the model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;