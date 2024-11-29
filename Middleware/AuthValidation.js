const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        gstin: Joi.string().required(),
        b_name: Joi.string().required(),
        o_name: Joi.string().required(),
        contact: Joi.string()
          .pattern(/^[+]?[0-9]{10,15}$/)
          .required(),
        email: Joi.string().email().required(),
        location: Joi.string().required(),
        password: Joi.string().min(8).required(),
      });

    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message:"Bad Message",error })
    }
    next();
}


const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email(),
        contact: Joi.string().pattern(/^[+]?[0-9]{10,15}$/),
        password: Joi.string().required(),
      }).or('email', 'contact');

    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message:"Bad Message",error })
    }
    next();
}

module.exports = { signupValidation,loginValidation }