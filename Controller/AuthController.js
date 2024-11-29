const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const BusinessModel = require("../models/Business");


const signup = async (req, res) => {
    try{
        const { gstin, b_name, o_name, contact, email, location, password   } = req.body;
        const user = await BusinessModel.findOne({email});
        if (user){
            return res.status(409).json({ message:"User already exists", success:false  });
        }
        if (!gstin || !b_name || !o_name || !contact || !email || !location || !password) {
            return res.status(400).json({ message: 'All fields are required.', success: false });
          }
        const businessModel = new BusinessModel({gstin, b_name, o_name, contact, email, location, password  });
        console.log(password);
        const salt = await bcrypt.genSalt(10);
        businessModel.password = await bcrypt.hash(password, salt);
        await businessModel.save();
        res.status(201).json({ message:"Signup successfully", success:true  });
    }   catch (err){
        console.error('Error in /auth/signup:', err); 
        res.status(500).json({ message:"Internal Error 520", success:false  });
    }
}


const login = async (req, res) => {
    try{
        const { email, contact ,password } = req.body;
        const business = await Business.findOne({
            $or: [{ email }, { contact }],
          });
      
        const errorMsg = "Auth failed either email or password is wrong" 
        if (!business){
            return res.status(403).json({ message:"Business does not exist", success:false  });
        }

        const isPassEqual = await bcrypt.compare(password, business.password);

        
        const jwtToken = jwt.sign(
            { email:business.email, _id:business._id  },
            process.env.JWT_SECRET,
            {expiresIn:'2h'}
        )

        if (!isPassEqual){
            return res.status(403).json({ message:"Invlid Password", success:false  });
        }

        res.status(201).json({ message:"Login successfully", success:true, jwtToken, email, name:user.b_name});
    }   catch (err){
        res.status(500).json({ message:err, success:false  });
    }
}

module.exports = {signup,login}