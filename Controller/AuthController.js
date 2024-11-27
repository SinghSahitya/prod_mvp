const bcrypt = require('bcrypt');
const BusinessModel = require("../models/Business");


const signup = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const user = await BusinessModel.findOne((email));
        if (user){
            return res.status(409).json({ message:"User already exists", success:false  });
        }
        const businessModel = new BusinessModel({name, email, password});
        businessModel.password = await bcrypt.hash(passowrd, 10);
        await businessModel.save();
        res.status(201).json({ message:"Signup successfully", success:true  });
    }   catch (err){
        res.status(500).json({ message:"Internal Error", success:false  });
    }
}

module.exports = {signup}