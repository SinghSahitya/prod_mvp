const mongoose = require('mongoose');

// Define the schema
const cashflowSchema = new mongoose.Schema({
    name : {  type:String, required:true  },
}, { timestamps: true });

// Create the model
const CashFlow = mongoose.model('CashFlow', cashflowSchema);

module.exports = CashFlow;