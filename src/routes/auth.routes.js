const express = require('express');
const router = express.Router();

const Users = require('../controllers/authController')

// router.get('/', Users.getAllUsers)
router.get('/', Users.handleLogin)
router.post('/', Users.handleNewUser)



module.exports = router