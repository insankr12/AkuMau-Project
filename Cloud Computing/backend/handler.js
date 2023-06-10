// handler.js

const { addUser, getUserByUsername, generateOTP, sendEmail, getTermsAndConditions } = require('./database');

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

function handleMateri(req, res) {
  const materiList = [
    { nama: 'Penalaran Umum', link: 'https://drive.google.com/drive/folders/1OLoo41QCvq8G_YLVmk5Qh7y37e1Z1vCF?usp=drive_link', tokenId: 'penalaran-umum' },
    { nama: 'Penalaran Matematika', link: 'https://drive.google.com/drive/folders/1mXF8Lgg1sxb5hRAkjPYLuAuU75rbxiUd?usp=drive_link', tokenId: 'penalaran-matematika' },
    { nama: 'Pengetahuan Kuantitatif', link: 'https://drive.google.com/drive/folders/136zvhF9YDVjyHoXo60MK32hgMt3ImKF9?usp=drive_link', tokenId: 'pengetahuan-kuantitatif' },
    { nama: 'Pengetahuan dan Pemahaman Umum', link: 'https://drive.google.com/drive/folders/1CsUw57YrlV9tch53cG4XcIAEvC167Mig?usp=drive_link', tokenId: 'pengetahuan-umum' },
    { nama: 'Pemahaman Bacaan dan Menulis', link: 'https://drive.google.com/drive/folders/1O9CcyhqemxzBU1_5KzXou3TXXqiTnsyk?usp=drive_link', tokenId: 'pemahaman-bacaan' },
    { nama: 'Literasi Bahasa Inggris', link: 'https://drive.google.com/drive/folders/1MisRJGL4DyZFphFsry2OA5nda53Kig1C?usp=drive_link', tokenId: 'literasi-inggris' },
    { nama: 'Literasi Bahasa Indonesia', link: 'https://drive.google.com/drive/folders/1BtOiHe-vz0cEu-VpGhvd28esnZtl13lP?usp=drive_link', tokenId: 'literasi-indonesia' },
  ];

  const { tokenId } = req.body;

  if (tokenId) {
    // Cari materi berdasarkan tokenId
    const selectedMateri = materiList.find((materi) => materi.tokenId.toLowerCase() === tokenId.toLowerCase());
    if (selectedMateri) {
      // Jika materi ditemukan, kirimkan link yang terkait
      res.redirect(selectedMateri.link);
    } else {
      res.status(404).json({ message: 'Materi tidak ditemukan' });
    }
  } else {
    res.status(400).json({ message: 'Token ID tidak valid' });
  }
}

module.exports = {
  handleRegistration,
  handleLogin,
  handleTermsAndConditions,
  handleOTPVerification,
  handleMateri,
};
