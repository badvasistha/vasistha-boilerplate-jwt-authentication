const router = require('express').Router();
const authController = require('./../../controllers/authController')

router.route('/signup')
    .post(authController.signup);
    
router.route('/signin')
    .post(authController.signIn);

module.exports = router;