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

const materiList = [
  {
    subtes: 'Penalaran Umum',
    materi: [
        { 
            judul: 'Argumentasi', 
            isi: 'Argumentasi atau argumen dapat diartikan sebagai alasan untuk memperkuat, melemahkan,  menyatakan benar atau salah, atau menjelaskan perbedaan terhadap suatu pendapat, pendirian,  atau gagasan. Dalam kaitannya dengan penalaran teks, argumentasi adalah sekumpulan  pernyataan yang merupakan pernyataan untuk mendukung pernyataan lain dan digunakan  untuk menemukan sebuah kesimpulan. Mengungkapkan argumentasi merupakan upaya yang  disengaja untuk bergerak lebih dari sekadar membuat pernyataan. Pada dasarnya struktur argumentasi itu terbagi kedalam dua bagian yaitu premis dan konklusi. Secara sederhana premis merupakan pernyataan awal yang dibangun untuk mendukung pernyataan akhir (konklusi) agar lebih kuat dan dapat diterima oleh lawan bicara dalam sebuah argumen. Premis adalah suatu pernyataan atau afirmasi yang digunakan sebagai dasar atau asumsi dalam suatu argumentasi. Premis juga memberikan informasi atau fakta yang digunakan untuk memperkuat suatu kesimpulan atau konklusi. Dalam argumentasi, premis digunakan sebagai dasar untuk mencapai suatu kesimpulan yang valid dan masuk akal. Dalam konteks argumentasi, konklusi adalah pernyataan akhir yang ditujukan agar diterima oleh pembaca atau pendengar, yang didukung oleh premis-premis yang sudah diberikan. Konklusi juga merupakan bagian dari struktur argumentasi yang menggambarkan hasil akhir dari suatu argumentasi. Terdapat enam jenis argumentasi yang perlu dipahami. Pertama, argumentasi deduktif. Argumentasi ini menggunakan premis umum untuk menarik kesimpulan yang spesifik. Dalam argumentasi deduktif, kesimpulan yang ditarik dianggap sebagai hasil pasti dari premis-premis tersebut. Contohnya, jika semua manusia adalah makhluk hidup dan Socrates adalah manusia, maka Socrates adalah makhluk hidup. Kedua, argumentasi induktif. Argumentasi ini menggunakan contoh-contoh spesifik untuk membuat kesimpulan yang lebih umum. Kesimpulan yang ditarik dalam argumentasi induktif cenderung memiliki tingkat kemungkinan yang tinggi. Misalnya, jika beberapa orang yang Anda kenal memiliki mobil merah, Anda mungkin menyimpulkan bahwa kebanyakan orang memiliki mobil merah. Ketiga, argumentasi analogi. Argumentasi ini menggunakan perbandingan antara dua hal yang berbeda untuk memperkuat argumen. Dengan menggunakan analogi, kesamaan antara dua hal digunakan untuk memperkuat argumen atau menjelaskan suatu hal dengan lebih mudah dipahami. Misalnya, seperti seorang pelari berlari untuk mencapai garis finish, seorang pebisnis harus berlari untuk mencapai kesuksesan dalam bisnisnya. Keempat, argumentasi kausal. Argumentasi ini menunjukkan hubungan sebab-akibat antara dua hal untuk memperkuat argumen. Dalam argumentasi kausal, suatu peristiwa atau kejadian diperlihatkan sebagai akibat dari peristiwa atau kejadian lain yang menyebabkannya. Misalnya, karena hujan deras, jalanan menjadi basah dan licin, sehingga mobil dapat tergelincir dan terbalik. Kelima, argumentasi emosional. Argumentasi ini memanfaatkan emosi untuk mempengaruhi pandangan atau pendapat seseorang. Dengan menggunakan argumen emosional, perasaan atau emosi dikaitkan dengan suatu hal untuk mempengaruhi pandangan atau pendapat seseorang. Misalnya, dengan menggambarkan penderitaan binatang peliharaan karena kurangnya perawatan, dapat mempengaruhi seseorang untuk memberikan perawatan yang baik kepada binatang peliharaannya. Keenam, argumentasi faktual. Argumentasi ini menggunakan bukti-bukti dan data faktual yang dapat dipertanggungjawabkan untuk memperkuat argumen. Dalam argumentasi faktual, bukti dan fakta digunakan untuk memperkuat argumen atau membuktikan suatu hal. Misalnya, berdasarkan studi yang dipublikasikan dalam jurnal ilmiah, diketahui bahwa rokok mengandung bahan kimia berbahaya yang dapat menyebabkan masalah kesehatan seperti kanker dan penyakit jantung.', 
        },
    ],
  },
  {
    subtes: 'Penalaran Matematika',
    materi: [
        { 
            judul: 'Bilangan', 
            isi: 'Bilangan adalah suatu simbol yang digunakan dalam perhitungan dan pengukuran. Ada banyak jenis bilangan dalam matematika, mulai dari −3, 0, 1, 1/2, π, dan sebagainya. Secara umum, bilangan terbagi menjadi dua, yaitu bilangan real dan bilangan imajiner. Bilangan real adalah gabungan dari bilangan bulat dan bilangan desimal. Ini mencakup semua bilangan yang dapat diwakili pada garis bilangan. Contoh bilangan real adalah -√2, 0, 1, 3.14, √5, dan seterusnya. Sedangkan bilangan imaginer adalah bilangan yang dinyatakan sebagai hasil perkalian bilangan imajiner murni i (akar dari -1) dengan bilangan real. Contoh bilangan imaginer adalah 2i, -3i, dan seterusnya. Bilangan real dapat dibagi menjadi 2 bagian, yaitu bilangan rasional dan bilangan irasional. Bilangan rasional adalah bilangan yang dapat diwakili sebagai pecahan atau rasio dua bilangan bulat. Mereka dapat dinyatakan dalam bentuk a/b, di mana a dan b adalah bilangan bulat dan b bukan nol. Contoh bilangan rasional adalah 1/2, 3/4, 5/8, dan sebagainya. Bilangan rasional juga dapat ditulis dalam bentuk desimal yang berulang atau berhenti, seperti 0,5 (1/2), 0,75 (3/4), dan 0,625 (5/8). Sedangkan bilangan irasional adalah bilangan yang tidak dapat diwakili sebagai pecahan atau rasio dua bilangan bulat. Mereka memiliki ekspansi desimal yang tidak berulang dan tidak berhenti. Bilangan irasional paling terkenal adalah akar kuadrat dari bilangan prima, seperti √2, √3, dan √5. Contoh bilangan irasional lainnya adalah π (pi), e (bilangan Euler), dan √7. Bilangan rasional dapat dibagi lagi menjadi 2 bagian, yaitu bilangan bulat dan bilangan pecahan. Bilangan bulat adalah jenis bilangan yang tidak memiliki pecahan atau bagian desimal. Mereka terdiri dari bilangan positif, bilangan negatif, dan nol. Contoh bilangan bulat adalah -3, -2, -1, 0, 1, 2, 3, dan seterusnya. Bilangan bulat digunakan untuk menggambarkan konsep kuantitas yang dapat dihitung, seperti jumlah benda, posisi pada garis bilangan, atau suhu di bawah nol. Sedangkan bilangan pecahan adalah bilangan yang terdiri dari bagian pembilang (numerat) dan bagian penyebut (denominator). Bagian pembilang adalah angka di atas garis pecahan, sementara bagian penyebut adalah angka di bawah garis pecahan. Contoh bilangan pecahan adalah 1/2, 3/4, 5/8, dan seterusnya. Bilangan pecahan digunakan untuk menggambarkan pecahan dari keseluruhan, seperti bagian dari suatu objek, perbandingan, atau perhitungan yang melibatkan pecahan.', 
        },
    ],
  },
  {
    subtes: 'Pengetahuan Kuantitatif',
    materi: [
        { 
            judul: 'Barisan Bilangan', 
            isi: 'Barisan bilangan adalah suatu kumpulan bilangan yang tersusun menurut aturan atau pola tertentu. Untuk dapat mengerjakan soal barisan bilangan pada TPS, kamu harus mengetahui dahulu jenis-jenis dari barisan bilangan. Pertama, barisan tunggal. Barisan tunggal adalah barisan bilangan yang hanya memiliki satu pola tertentu. Adapun pola bilangan dalam barisan tersebut dapat berupa operasi-operasi yang umum dalam matematika, seperti penjumlahan, pengurangan, perkalian, pembagian, pangkat, dan kombinasi dari operasi-operasi tersebut. Ada dua jenis barisan tunggal yang paling sering keluar dalam soal, yaitu barisan aritmetika dan barisan geometri. Barisan aritmetika adalah barisan bilangan yang nilai setiap sukunya diperoleh dari suku sebelumnya melalui operasi penjumlahan atau pengurangan. Barisan aritmetika dapat ditemui pada soal yang membahas tentang deretan bangku bioskop dan sebagainya. Dalam barisan aritmetika, dapat diketahui suku ke-n (Un) dan total suku pertama sampai suku ke-n (Sn) tanpa per dengan menggunakan rumus berikut. hitungan yang panjang. Caranya adalah Un = a + (n-1)b dan Sn = n(2a + (n-1)b)/2 dengan a adalah suku pertama, n adalah banyak suku, dan b adalah beda atau selisih. Kemudian, Barisan geometri adalah barisan bilangan yang nilai setiap sukunya diperoleh dari suku sebelumnya melalui operasi perkalian atau pembagian. Perbandingan antarsuku pada barisan geometri dinamakan dengan rasio (r). Barisan geometri dapat ditemui pada soal yang membahas tentang pembelahan pada bakteri dan sebagainya. Serupa dengan barisan aritmetika, suku ke-n (Un) dan total suku pertama sampai suku ke-n (Sn) dari barisan geometri juga dapat diketahui tanpa perhitungan yang panjang. Caranya adalah dengan menggunakan rumus Un = a x r exp(n-1) dan Sn = a(r exp(n) - 1)/(r - 1) dengan a adalah suku pertama, n adalah banyak suku, dan r adalah rasio. Dalam barisan geometri, terdapat suatu barisan panjang yang memiliki rasio pecahan. Panjang barisan tersebut sampai membuat suku terakhirnya bernilai sangat kecil dan mendekati nol. Barisan ini disebut barisan geometri tak hingga. Barisan geometri tak hingga dapat dijumpai pada soal yang membahas tentang pemantulan bola dan sebagainya. Rumus yang digunakan dalam barisan geometri tak hingga adalah Sn = a/(r - 1) untuk -1 < r < 1 atau Sn = a/(1 - r) untuk r < -1 atau r > 1. Kedua, Barisan Fibonacci adalah barisan bilangan yang suku berikutnya diperoleh dari penjumlahan dua suku sebelumnya. Pada awalnya, barisan fibonacci didasarkan pada penjumlahan dua suku sebelumnya. Namun, seiring berjalannya waktu, barisan Fibonacci banyak dikombinasikan dengan operasi lainnya atau dengan pola bilangan yang lebih kompleks. Ketiga, Barisan campuran adalah barisan bilangan yang memiliki lebih dari satu pola. Pola tersebut dapat berupa selang dua, selang tiga, dan sebagainya. Ciri utama dari barisan ini adalah sulit menemukan relasi antarsuku berurutan dan secara sekilas, terlihat lebih dari satu pola. Keempat, Barisan bertingkat adalah barisan bilangan yang memiliki pola lebih dari satu tingkat. Untuk menemukan polanya, perlu dibuat pola tingkat kedua.', 
        },
    ],
  },
  {
    subtes: 'Literasi Bahasa Inggris',
    materi: [
        { 
            judul: 'Contextual meaning of a word', 
            isi: 'Contextual meaning of a word refers to the meaning or sense of a word that is understood based on the context or situation in which the word is used. The meaning of a word can vary depending on the context of the sentence or specific situation. For example, the word "fast" in English has different contextual meanings. If the word is used in the sentence "He runs fast," the contextual meaning is that the person runs with great speed. However, if the word "fast" is used in the sentence "She observes the religious fast," the contextual meaning refers to abstaining from food or certain activities for a period of time. Furthermore, context can also influence the connotative meaning of a word. For instance, the word "home" has a denotative meaning of a place where one lives, but in a broader context, the word "home" can carry connotations of comfort, belonging, and a sense of security. In understanding the contextual meaning of a word, it is important to consider the word in relation to its surrounding words, the sentence structure, and the overall context in which it is used. Context provides important clues for grasping the precise meaning of a word in a particular context.', 
        },
    ]
  },
  {
    subtes: 'Literasi Bahasa Indonesia',
    materi: [
        { 
            judul: 'Tema dalam teks sastra', 
            isi: 'Tema dalam teks sastra merujuk pada pesan atau ide sentral yang terkandung dalam karya sastra. Tema mengungkapkan makna mendalam yang ingin disampaikan oleh penulis melalui narasi, karakter, dan elemen-elemen sastra lainnya. Tema dalam teks sastra dapat dijelaskan dengan beberapa poin. Pertama, konsep sentral. Tema adalah konsep sentral yang menggambarkan inti dari teks sastra. Ini adalah pesan umum atau ide besar yang ingin disampaikan oleh penulis kepada pembaca. Kedua, keunikan dalam teks. Setiap teks sastra dapat memiliki tema yang berbeda-beda. Tema sering kali unik untuk setiap karya sastra dan mencerminkan pandangan dunia penulis, pengalaman pribadi, atau isu-isu yang dianggap penting dalam masyarakat. Ketiga, penafsiran yang beragam. Tema sering kali dapat ditafsirkan dengan berbagai cara oleh pembaca yang berbeda. Setiap individu dapat mengambil pemahaman dan interpretasi yang berbeda terhadap tema yang sama, tergantung pada latar belakang, pengalaman, dan perspektif mereka. Keempat, beragamnya tema. Tema dalam teks sastra dapat sangat beragam. Misalnya, tema tentang cinta, kehilangan, pertumbuhan, pemberontakan, perjuangan, keadilan, atau kemanusiaan sering kali muncul dalam karya sastra. Kelima, mendalam dan kompleks. Tema dalam teks sastra sering kali kompleks dan mendalam. Tema ini bisa membahas isu-isu universal, dilema moral, perjuangan emosional, atau pertanyaan filosofis yang kompleks. Keenam, menghubungkan dengan aspek kehidupan. Tema dalam teks sastra sering kali mencerminkan aspek-aspek kehidupan nyata, termasuk pengalaman manusia, hubungan antarpribadi, perubahan sosial, atau konflik dalam masyarakat. Ketujuh, pengembangan tema. Tema dapat dikembangkan melalui plot, karakter, dialog, atau gambaran visual dalam teks sastra. Penulis menggunakan berbagai teknik sastra untuk mengungkapkan dan memperkuat tema yang ingin disampaikan.', 
        },
    ],
  },
  {
    subtes: 'Pemahaman Bacaan dan Menulis',
    materi: [
        { 
            judul: 'Ide Pokok', 
            isi: 'Ide Pokok merupakan gagasan utama atau konsep sentral yang ingin disampaikan dalam suatu teks. Ide pokok adalah inti dari informasi yang ingin disampaikan, dan semua detail dan argumen dalam teks tersebut harus berkaitan dengan ide pokok tersebut. Ide pokok sering ditemukan dalam paragraf pembuka atau dalam kalimat topik. Mengidentifikasi ide pokok membantu pembaca atau pendengar memahami pesan atau tujuan dari teks.', 
        },
        { 
            judul: 'Kalimat Efektif', 
            isi: 'Kalimat efektif adalah kalimat yang ditulis dengan jelas, ringkas, dan berdaya pikat. Kalimat efektif mengkomunikasikan ide atau informasi secara tepat, sehingga mudah dipahami oleh pembaca atau pendengar. Kalimat efektif menggunakan struktur yang baik, menghindari kelebihan kata-kata yang tidak perlu, dan menyampaikan pesan dengan jelas dan langsung. Kalimat efektif dapat menarik perhatian pembaca atau pendengar, meningkatkan pemahaman, dan membuat teks lebih menarik.',  
        },
        { 
            judul: 'Simpulan', 
            isi: 'Simpulan adalah bagian akhir dari suatu teks yang merangkum dan menyimpulkan poin-poin penting yang telah dibahas. Simpulan harus menghubungkan kembali dengan ide pokok dan menggambarkan ringkasan keseluruhan teks. Simpulan dapat mengulang kembali poin-poin utama yang telah disampaikan, memberikan perspektif baru, atau menyarankan implikasi atau tindakan selanjutnya. Tujuan simpulan adalah untuk mengakhiri teks dengan kuat dan memberikan pemahaman yang jelas kepada pembaca atau pendengar.', 
        },
    ],
  },
  {
    subtes: 'Pengetahuan dan Pemahaman Umum',
    materi: [
        { 
            judul: 'Sinonim', 
            isi: 'Sinonim adalah kata, morfem, atau frasa yang memiliki arti yang sama atau hampir sama dengan kata, morfem, atau frasa lain dalam suatu bahasa. Sebagai contoh, dalam bahasa Inggris, kata begin, start, commence, dan initiate semuanya adalah sinonim satu sama lain: mereka bersinonim. Tes standar untuk menentukan sinonimi adalah penggantian: satu bentuk dapat digantikan oleh bentuk lain dalam sebuah kalimat tanpa mengubah maknanya. Kata-kata dianggap bersinonim hanya dalam satu arti tertentu: misalnya, long dan extended dalam konteks long time atau extended time adalah sinonim, tetapi long tidak dapat digunakan dalam frasa extended family. Sinonim yang memiliki makna yang sama secara persis berbagi sem atau sememe denotatif, sedangkan sinonim yang memiliki makna yang tidak persis sama berbagi sememe denotatif atau konotatif yang lebih luas dan tumpang tindih dalam suatu bidang semantik.', 
        },
    ],
  },
];

app.get('/materi', (req, res) => {
  res.json(materiList);
});

app.post('/materi', (req, res) => {
  const { tokenId } = req.body;

  if (tokenId) {
    let selectedMateri = null;

    // Mencari materi berdasarkan tokenId
    for (const subtes of materiList) {
      selectedMateri = subtes.materi.find((materi) => materi.tokenId.toLowerCase() === tokenId.toLowerCase());
      if (selectedMateri) {
        break;
      }
    }

    if (selectedMateri) {
      // Jika materi ditemukan, kirimkan isi materi yang terkait
      res.json({ isi: selectedMateri.isi });
    } else {
      res.status(404).json({ message: 'Materi tidak ditemukan' });
    }
  } else {
    res.status(400).json({ message: 'Token ID tidak valid' });
  }
});

//=====================

// Rute untuk mengambil data dari tabel pengetahuan kuantitatif
app.get('/latihan/pk', (req, res) => {
  // Query database untuk mendapatkan data dari tabel
  connection.query('SELECT * FROM pk', (error, results) => {
    if (error) {
      console.error('Error querying data:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      // Ubah data JSON menjadi CSV
      const csvData = json2csv(results);

      // Set header respons untuk tipe konten CSV
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=pk.csv');

      // Kirim data CSV sebagai respons
      res.send(csvData);
    }
  });
});

// Mengubah data JSON menjadi CSV dan menyimpannya sebagai file CSV
app.get('/latihan/pk/download', (req, res) => {
  // Query database untuk mendapatkan data dari tabel
  connection.query('SELECT * FROM pk', (error, results) => {
    if (error) {
      console.error('Error querying data:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      // Ubah data JSON menjadi CSV
      const csvData = json2csv(results);

      // Tulis data CSV ke file
      fs.writeFile('pk.csv', csvData, (error) => {
        if (error) {
          console.error('Error writing CSV file:', error);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          // Set header respons untuk tipe konten CSV
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader('Content-Disposition', 'attachment; filename=pk.csv');

          // Baca file CSV dan kirim sebagai respons
          fs.createReadStream('pk.csv').pipe(res);
        }
      });
    }
  });
});

//=====================

// Rute untuk mengambil data dari tabel penalaran umum
app.get('/latihan/pu', (req, res) => {
    connection.query('SELECT * FROM pu', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=pu.csv');
        res.send(csvData);
      }
    });
  });
  
  app.get('/latihan/pu/download', (req, res) => {
    connection.query('SELECT * FROM pu', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        fs.writeFile('pu.csv', csvData, (error) => {
          if (error) {
            console.error('Error writing CSV file:', error);
            res.status(500).json({ message: 'Internal server error' });
          } else {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=pu.csv');
            fs.createReadStream('pu.csv').pipe(res);
          }
        });
      }
    });
  });
//=====================

// Rute untuk mengambil data dari tabel penalaran matematika
app.get('/latihan/pm', (req, res) => {
    connection.query('SELECT * FROM pm', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=pm.csv');
        res.send(csvData);
      }
    });
  });
  
  app.get('/latihan/pm/download', (req, res) => {
    connection.query('SELECT * FROM pm', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        fs.writeFile('pm.csv', csvData, (error) => {
          if (error) {
            console.error('Error writing CSV file:', error);
            res.status(500).json({ message: 'Internal server error' });
          } else {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=pm.csv');
            fs.createReadStream('pm.csv').pipe(res);
          }
        });
      }
    });
  });
//=====================

// Rute untuk mengambil data dari tabel pengetahuan dan pemahaman umum
app.get('/latihan/ppu', (req, res) => {
    connection.query('SELECT * FROM ppu', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=ppu.csv');
        res.send(csvData);
      }
    });
  });
  
  app.get('/latihan/ppu/download', (req, res) => {
    connection.query('SELECT * FROM ppu', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        fs.writeFile('ppu.csv', csvData, (error) => {
          if (error) {
            console.error('Error writing CSV file:', error);
            res.status(500).json({ message: 'Internal server error' });
          } else {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=ppu.csv');
            fs.createReadStream('ppu.csv').pipe(res);
          }
        });
      }
    });
  });
  
//=====================

// Rute untuk mengambil data dari tabel pemahaman bacaan dan menulis
app.get('/latihan/pbm', (req, res) => {
    connection.query('SELECT * FROM pbm', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=pbm.csv');
        res.send(csvData);
      }
    });
  });
  
  app.get('/latihan/pbm/download', (req, res) => {
    connection.query('SELECT * FROM pbm', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        fs.writeFile('pbm.csv', csvData, (error) => {
          if (error) {
            console.error('Error writing CSV file:', error);
            res.status(500).json({ message: 'Internal server error' });
          } else {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=pbm.csv');
            fs.createReadStream('pbm.csv').pipe(res);
          }
        });
      }
    });
  });
//=====================

// Rute untuk mengambil data dari tabel literasi indonesia
app.get('/latihan/li', (req, res) => {
    connection.query('SELECT * FROM li', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=li.csv');
        res.send(csvData);
      }
    });
  });
  
  app.get('/latihan/li/download', (req, res) => {
    connection.query('SELECT * FROM li', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        fs.writeFile('li.csv', csvData, (error) => {
          if (error) {
            console.error('Error writing CSV file:', error);
            res.status(500).json({ message: 'Internal server error' });
          } else {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=li.csv');
            fs.createReadStream('li.csv').pipe(res);
          }
        });
      }
    });
  });
//=====================

// Rute untuk mengambil data dari tabel literasi inggris
app.get('/latihan/le', (req, res) => {
    connection.query('SELECT * FROM le', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=le.csv');
        res.send(csvData);
      }
    });
  });
  
  app.get('/latihan/le/download', (req, res) => {
    connection.query('SELECT * FROM le', (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const csvData = json2csv(results);
        fs.writeFile('le.csv', csvData, (error) => {
          if (error) {
            console.error('Error writing CSV file:', error);
            res.status(500).json({ message: 'Internal server error' });
          } else {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=le.csv');
            fs.createReadStream('le.csv').pipe(res);
          }
        });
      }
    });
  });



//======================
// Rute untuk mengambil data dari tabel 'pu'
app.get('/latihan/pu/:kategori_soal', (req, res) => {
    const { kategori_soal } = req.params;
  
    connection.query('SELECT * FROM pu WHERE kategori_soal = ?', [kategori_soal], (error, results) => {
      if (error) {
        console.error('Error querying pu:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Rute untuk mengambil data dari tabel 'ppu'
  app.get('/latihan/ppu/:kategori_soal', (req, res) => {
    const { kategori_soal } = req.params;
  
    connection.query('SELECT * FROM ppu WHERE kategori_soal = ?', [kategori_soal], (error, results) => {
      if (error) {
        console.error('Error querying ppu:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Rute untuk mengambil data dari tabel 'pbm'
  app.get('/latihan/pbm/:kategori_soal', (req, res) => {
    const { kategori_soal } = req.params;
  
    connection.query('SELECT * FROM pbm WHERE kategori_soal = ?', [kategori_soal], (error, results) => {
      if (error) {
        console.error('Error querying pbm:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Rute untuk mengambil data dari tabel 'li'
  app.get('/latihan/li/:kategori_soal', (req, res) => {
    const { kategori_soal } = req.params;
  
    connection.query('SELECT * FROM li WHERE kategori_soal = ?', [kategori_soal], (error, results) => {
      if (error) {
        console.error('Error querying li:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Rute untuk mengambil data dari tabel 'pk'
  app.get('/latihan/pk/:kategori_soal', (req, res) => {
    const { kategori_soal } = req.params;
  
    connection.query('SELECT * FROM pk WHERE kategori_soal = ?', [kategori_soal], (error, results) => {
      if (error) {
        console.error('Error querying pk:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Rute untuk mengambil data dari tabel 'pm'
  app.get('/latihan/pm/:kategori_soal', (req, res) => {
    const { kategori_soal } = req.params;
  
    connection.query('SELECT * FROM pm WHERE kategori_soal = ?', [kategori_soal], (error, results) => {
      if (error) {
        console.error('Error querying pm:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Rute untuk mengambil data dari tabel 'le'
  app.get('/latihan/le/:kategori_soal', (req, res) => {
    const { kategori_soal } = req.params;
  
    connection.query('SELECT * FROM le WHERE kategori_soal = ?', [kategori_soal], (error, results) => {
      if (error) {
        console.error('Error querying le:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  

// Menjalankan server pada port 8080
app.listen(8080, () => {
  console.log('Server berjalan pada http://localhost:8080');
});
