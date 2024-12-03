const mongoose = require('mongoose');

// Define the schema
const saleSchema = new mongoose.Schema({
    name : {  type:String, required:true  },
}, { timestamps: true });

// Create the model
const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;