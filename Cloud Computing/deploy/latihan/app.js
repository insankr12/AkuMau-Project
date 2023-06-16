const express = require('express');
const mysql = require('mysql');
const json2csv = require('json2csv').parse;
const fs = require('fs');

const app = express();

// Konfigurasi koneksi database
const dbConfig = {
    socketPath: '/cloudsql/akumau-capstoneproject:us-central1:akumau-db',
    user: 'root',
    password: 'akumaudb',
    database: 'db-soal',
};

// Membuat koneksi database
const connection = mysql.createConnection(dbConfig);

// Middleware untuk mengurai body dari permintaan
app.use(express.json());

// Rute untuk mengambil data dari tabel 'pu', 'pm', 'pk', 'ppu', 'pbm', 'li', dan 'le'
app.get('/latihan', (req, res) => {

    const results = [];
  
    connection.query('SELECT * FROM pm', (error, row2) => {
        if (error) {
          console.error('Error querying pm:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
        results.push({ penalaran_matematika: row2 });
        // Mengirimkan hasil query dalam bentuk JSON
      res.json(results);
      });  
  });

// Menjalankan server pada port 8080
app.listen(8080, () => {
  console.log('Server berjalan pada http://localhost:8080');
});
