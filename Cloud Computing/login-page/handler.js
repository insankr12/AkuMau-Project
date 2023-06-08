// handler.js

const { addUser, getUserByUsername, generateOTP, sendEmail, getTermsAndConditions, getTopikMateri, getSubBabByTopik } = require('./database');

// Fungsi untuk menangani permintaan registrasi
function handleRegistration(req, res) {
  const { username, email, password, agree } = req.body;

  // Lakukan validasi username, email, dan password
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Username, email, dan password harus diisi' });
  } else if (!agree){
    res.status(403).json({ message: 'Anda harus menyetujui S&K' });
  } else if (getUserByUsername(username)) {
    res.status(409).json({ message: 'Username sudah terdaftar' });
  } else {
    // Generate OTP
    const otp = generateOTP();

    // Simpan pengguna ke database dengan status unverified dan OTP
    addUser(username, email, password, otp, false, agree);

    // Kirim email verifikasi
    sendEmail(email, 'Verifikasi Akun', `Kode OTP Anda: ${otp}`);

    res.status(201).json({ message: 'Registrasi berhasil. Silakan cek email untuk kode OTP' });
  }
}

// Fungsi untuk menangani permintaan verifikasi OTP
function handleOTPVerification(req, res) {
  const { username, otp } = req.body;
  const user = getUserByUsername(username);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    const isOTPValid = verifyOTP(username, otp);

    if (isOTPValid) {
      updateUserVerificationStatus(username, true); // Update user verification status to true
      res.status(200).json({ message: 'Account successfully verified' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  }
}

// Fungsi untuk menangani permintaan login
function handleLogin(req, res) {
  const { username, password } = req.body;

  // Cari pengguna berdasarkan username
  const user = getUserByUsername(username);

  if (user && user.password === password && user.verified) {
    res.status(200).json({ message: 'Login berhasil' });
  } else if (user && user.password === password && !user.verified) {
    res.status(401).json({ message: 'Akun belum diverifikasi. Silakan cek email untuk kode OTP' });
  } else {
    res.status(401).json({ message: 'Username atau password salah' });
  }
}

// Fungsi untuk menampilkan halaman S&K
function handleTermsAndConditions(req, res) {
  const termsAndConditions = getTermsAndConditions();
  res.render('terms', { termsAndConditions });
}

// Fungsi untuk menampilkan materi
function handleTopikMateri(req, res) {
  const topikMateri = getTopikMateri();
  res.json(topikMateri);
}

function handleSubBabByTopik(req, res) {
  const { topik } = req.params;
  const subBab = getSubBabByTopik(topik);

  if (subBab) {
    res.json(subBab);
  } else {
    res.status(404).json({ message: 'Sub-bab not found' });
  }
}

module.exports = {
  handleRegistration,
  handleLogin,
  handleTermsAndConditions,
  handleOTPVerification,
  handleTopikMateri,
  handleSubBabByTopik,
};
