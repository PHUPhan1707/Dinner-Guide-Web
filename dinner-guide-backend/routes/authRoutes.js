const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
 // Define routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.put("/update", AuthController.updateUser);
module.exports = router     