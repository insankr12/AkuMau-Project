// POST request

fetch('http://localhost:8080/materi', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ tokenId: tokenID }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Link Materi:', data.link);
    // Lakukan operasi lain dengan link materi yang diterima dari server
  })
  .catch(error => {
    console.error('Terjadi kesalahan:', error);
  });

// Mendefinisikan URL endpoint
const url = 'http://localhost:8080/latihan/';

// Fetch data dari tabel 'pu'
fetch('/latihan/pu/<kategori_soal>')
  .then(response => response.json())
  .then(data => {
    // Lakukan sesuatu dengan data yang diterima
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data from pu:', error);
  });

// Fetch data dari tabel 'ppu'
fetch('/latihan/ppu/<kategori_soal>')
  .then(response => response.json())
  .then(data => {
    // Lakukan sesuatu dengan data yang diterima
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data from ppu:', error);
  });

// Fetch data dari tabel 'pbm'
fetch('/latihan/pbm/<kategori_soal>')
  .then(response => response.json())
  .then(data => {
    // Lakukan sesuatu dengan data yang diterima
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data from pbm:', error);
  });

// Fetch data dari tabel 'li'
fetch('/latihan/li/<kategori_soal>')
  .then(response => response.json())
  .then(data => {
    // Lakukan sesuatu dengan data yang diterima
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data from li:', error);
  });

// Fetch data dari tabel 'pk'
fetch('/latihan/pk/<kategori_soal>')
  .then(response => response.json())
  .then(data => {
    // Lakukan sesuatu dengan data yang diterima
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data from pk:', error);
  });

// Fetch data dari tabel 'pm'
fetch('/latihan/pm/<kategori_soal>')
  .then(response => response.json())
  .then(data => {
    // Lakukan sesuatu dengan data yang diterima
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data from pm:', error);
  });

// Fetch data dari tabel 'le'
fetch('/latihan/le/<kategori_soal>')
  .then(response => response.json())
  .then(data => {
    // Lakukan sesuatu dengan data yang diterima
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data from le:', error);
  });

//===================

// Fetch data CSV untuk pengetahuan kuantitatif
fetch('/latihan/pk')
.then(response => response.text())
.then(csvData => {
  // Melakukan sesuatu dengan data CSV
  console.log(csvData);
})
.catch(error => {
  console.error('Error fetching data:', error);
});

// Fetch data CSV untuk penalaran umum
fetch('/latihan/pu')
.then(response => response.text())
.then(csvData => {
  // Melakukan sesuatu dengan data CSV
  console.log(csvData);
})
.catch(error => {
  console.error('Error fetching data:', error);
});

// Fetch data CSV untuk penalaran matematika
fetch('/latihan/pm')
.then(response => response.text())
.then(csvData => {
  // Melakukan sesuatu dengan data CSV
  console.log(csvData);
})
.catch(error => {
  console.error('Error fetching data:', error);
});

// Fetch data CSV untuk pengetahuan dan pemahaman umum
fetch('/latihan/ppu')
.then(response => response.text())
.then(csvData => {
  // Melakukan sesuatu dengan data CSV
  console.log(csvData);
})
.catch(error => {
  console.error('Error fetching data:', error);
});

// Fetch data CSV untuk pemahaman bacaan dan menulis
fetch('/latihan/pbm')
.then(response => response.text())
.then(csvData => {
  // Melakukan sesuatu dengan data CSV
  console.log(csvData);
})
.catch(error => {
  console.error('Error fetching data:', error);
});

// Fetch data CSV untuk literasi Indonesia
fetch('/latihan/li')
.then(response => response.text())
.then(csvData => {
  // Melakukan sesuatu dengan data CSV
  console.log(csvData);
})
.catch(error => {
  console.error('Error fetching data:', error);
});

// Fetch data CSV untuk literasi Inggris
fetch('/latihan/le')
.then(response => response.text())
.then(csvData => {
  // Melakukan sesuatu dengan data CSV
  console.log(csvData);
})
.catch(error => {
  console.error('Error fetching data:', error);
});
