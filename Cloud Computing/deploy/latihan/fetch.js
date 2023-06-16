fetch('http://localhost:8080/latihan')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Lakukan operasi lain dengan data JSON yang diterima
  })
  .catch(error => console.error('Error:', error));
