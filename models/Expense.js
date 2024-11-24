const mongoose = require('mongoose');

// Define the schema
const expenseSchema = new mongoose.Schema({
    name : {  type:String, required:true  },
}, { timestamps: true });

// Create the model
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;