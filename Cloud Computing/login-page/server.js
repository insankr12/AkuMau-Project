// server.js

const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware untuk mengurai body dari permintaan
app.use(express.json());

// Mengatur rute-rute aplikasi
app.use('/', routes);

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server berjalan pada http://localhost:3000');
});
