const mongoose = require('mongoose');
const Item = require('./Item');
const Report = require('./Report');
const Customer = require('./Customer');
const Supplier = require('./Supplier');
const CashFlow = require('./CashFlow');
const Expense = require('./Expense');

const businessSchema = new mongoose.Schema({
    gstin:{type:String, required:true},
    b_name : {type: String, required:true},
    o_name : {type: String, required: true},
    contact : { 
        type: String, 
        required : true,
        match: [
            /^[+]?[0-9]{10,15}$/, // Regex for validating phone number
            'Please enter a valid phone number' // Error message if invalid
          ],
          unique:true,
    },
    email : { type: String, required:true, unique:true},
    o_image : { type:Buffer, required:false},
    location : {type:String, required:true},
    b_image : { type:Buffer, required:false },
    item : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Item',
        required : false
    },

    b_type : { type: String, required:false},
    report : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Report',
        required : false
    },
    cashflow : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'CashFlow',
        required : false
    },
    customer : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Customer',
        required : false
    },
    supplier : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Supplier',
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

module.export = Business;