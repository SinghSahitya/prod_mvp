const mongoose = require('mongoose');

// Define the schema
const purchaseSchema = new mongoose.Schema({
    name : {  type:String, required:true  },
}, { timestamps: true });

// Create the model
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;