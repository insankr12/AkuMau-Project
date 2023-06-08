// routes.js

const express = require('express');
const router = express.Router();
const { handleRegistration, handleLogin, handleTermsAndConditions, handleOTPVerification, handleTopikMateri, handleSubBabByTopik } = require('./handler');

// Rute untuk registrasi
router.post('/register', handleRegistration);

// Rute untuk login
router.post('/login', handleLogin);

// Rute untuk halaman S&K
router.get('/terms', handleTermsAndConditions);

// Rute untuk memverifikasi OTP
router.post('/verification', handleOTPVerification);

// Rute untuk pemilihan materi
router.get('/topik', handleTopikMateri);
router.get('/subbab/:topik', handleSubBabByTopik);

module.exports = router;
