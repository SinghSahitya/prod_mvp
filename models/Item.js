const mongoose = require('mongoose');

// Define the schema
const itemSchema = new mongoose.Schema({
    name : {  type:String, required:true  },
    qty : {type: Number, required:true },
    price : { type: Number, required:true  },
}, { timestamps: true });

// Create the model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;