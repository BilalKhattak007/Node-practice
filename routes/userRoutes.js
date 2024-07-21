const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateToken = require('../middleware/validateToken')

//routing:
router.route('/register').post(userController.registerUser)
router.route('/login').post(userController.loginUser)
router.route('/current').get(validateToken,userController.currentUser)
module.exports = router;
