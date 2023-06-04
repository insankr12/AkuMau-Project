// handler.js

const { addUser, getUserByUsername } = require('./database');

// Fungsi untuk menangani permintaan registrasi
function handleRegistration(req, res) {
  const { username, email, password } = req.body;

  // Lakukan validasi username dan password
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Username, email, dan password harus diisi' });
  } else if (getUserByUsername(username)) {
    res.status(409).json({ message: 'Username sudah terdaftar' });
  } else {
    // Tambahkan pengguna ke database
    addUser(username, email, password);

    res.status(201).json({ message: 'Registrasi berhasil' });
  }
}

// Fungsi untuk menangani permintaan login
function handleLogin(req, res) {
  const { username, password } = req.body;

  // Cari pengguna berdasarkan username
  const user = getUserByUsername(username);

  if (user && user.password === password) {
    res.status(200).json({ message: 'Login berhasil' });
  } else {
    res.status(401).json({ message: 'Username atau password salah' });
  }
}

module.exports = {
  handleRegistration,
  handleLogin,
};
