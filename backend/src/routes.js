const express = require('express')
const router = express.Router()

const loginController = require('./Controllers/LoginController');

router.post('/login', loginController.login);

module.exports = router