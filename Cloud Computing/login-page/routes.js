// routes.js

const express = require('express');
const router = express.Router();
const { handleRegistration, handleLogin } = require('./handler');

// Rute untuk registrasi
router.post('/register', handleRegistration);

// Rute untuk login
router.post('/login', handleLogin);

module.exports = router;
