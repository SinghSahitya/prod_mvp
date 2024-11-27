const router = require('express').Router;
const {  signup  } = require('../Controller/AuthController');
const { signupValidation } = require('../Middleware/AuthValidation')

router.post('/login', (req, res) => {
    res.send('login success');
});


router.post('/signup', signupValidation, signup);

module.exports = router;