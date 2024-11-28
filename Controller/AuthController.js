const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
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


const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await BusinessModel.findOne((email));
        const errorMsg = "Auth failed either email or password is wrong" 
        if (!user){
            return res.status(403).json({ message:errorMsg, success:false  });
        }

        const isPassEqual = await bcrypt.compare(password, user.passowrd);
        
        const jwtToken = jwt.sign(
            { email:user.email, _id:user._id  },
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        if (!isPassEqual){
            return res.status(403).json({ message:errorMsg, success:false  });
        }

        res.status(201).json({ message:"Login successfully", success:true, jwtToken, email, name:user.b_name
          });
    }   catch (err){
        res.status(500).json({ message:"Internal Error", success:false  });
    }
}

module.exports = {signup,login}