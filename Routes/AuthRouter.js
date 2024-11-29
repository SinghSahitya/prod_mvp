const router = require('express').Router();

const {  signup, login  } = require('../Controller/AuthController');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation')


router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;