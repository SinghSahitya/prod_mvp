const mongoose = require('mongoose');
const Inventory = require('./Inventory');
const Report = require('./Report');
const Customer = require('./Customer');
const Order = require('./Order');
const Expense = require('./Expense');

const businessSchema = new mongoose.Schema({
    gstin:{type:String, required:true},
    businessName : {type: String, required:true},
    ownerName : {type: String, required: true},
    contact: { type: String, required: true },
    ownerImage : { type:Buffer, required:false},
    location : {type:String, required:true},
    businessImage : { type:Buffer, required:false },
    inventory : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Inventory',
        required : false
    },

    businessType : { type: String, required:false},
    report : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Report',
        required : false
    },
    order : { //Chagne to Order - Purchase & Sales 
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Order',
        required : false
    },
    customer : { // Type column
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Customer',
        required : false
    },

    expense : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Expense',
        required : false
    },

    createdAt: { type: Date, default: Date.now }

});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;