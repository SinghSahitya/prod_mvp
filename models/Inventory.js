const mongoose = require('mongoose');

// Define the schema
const inventorySchema = new mongoose.Schema({
    name : {  type:String, required:true  },
    qty : {type: Number, required:true },
    price : { type: Number, required:true  },
}, { timestamps: true });

// Create the model
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;