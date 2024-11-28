const router = require('express').Router;
const {  signup, login  } = require('../Controller/AuthController');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation')

router.post('/login', (req, res) => {
    res.send('login success');
});

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;