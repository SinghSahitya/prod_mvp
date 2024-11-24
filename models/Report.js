const mongoose = require('mongoose');

// Define the schema
const reportSchema = new mongoose.Schema({
    name : {  type:String, required:true  },
}, { timestamps: true });

// Create the model
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;