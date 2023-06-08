// database.js

let registeredUsers = [];

function addUser(username, email, password, otp, verified) {
  registeredUsers.push({ username, email, password, otp, verified });
}

function getUserByUsername(username) {
  return registeredUsers.find(user => user.username === username);
}

function generateOTP() {
  // Generate random 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000);
}

function updateUserVerificationStatus(username, isVerified) {
  const user = getUserByUsername(username);
  if (user) {
    user.isVerified = isVerified;
  }
}

function verifyOTP(username, otp) {
  const user = getUserByUsername(username);
  if (user && user.otp === parseInt(otp)) {
    user.otp = null;
    return true;
  }
  return false;
}

function sendEmail(email, subject, message) {
  // Logic untuk mengirim email, bisa menggunakan library atau service email

  console.log(`Email terkirim ke ${email}: ${subject} - ${message}`);
}

const termsAndConditions = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor efficitur commodo. Mauris semper libero nec ipsum efficitur elementum. Suspendisse potenti. Nullam consequat bibendum massa, nec tincidunt lectus. Vivamus sit amet augue eu mi venenatis aliquet. Aenean a faucibus ante. Suspendisse lacinia aliquet tellus ac pellentesque. Nulla aliquet eros eu dui facilisis aliquet. Aliquam lacinia lectus ac tortor efficitur, vitae ullamcorper mauris tempus. Vestibulum feugiat cursus mauris, a pellentesque mauris finibus sed.

Phasellus blandit tellus id est mollis aliquet. In hac habitasse platea dictumst. Mauris quis magna vitae risus interdum faucibus. Proin eu enim id dui gravida pellentesque. Duis a neque at nulla venenatis aliquet sed vitae ipsum. Nam sit amet massa id quam consectetur fermentum. Sed scelerisque vehicula consectetur. Aenean sodales, tortor eu cursus faucibus, nibh lorem placerat mauris, vitae tempor urna mauris at dui. Integer eleifend ipsum in ex eleifend commodo. Cras eu risus sed ligula viverra congue nec ut nisl. Aliquam at nisi eu risus cursus luctus sit amet in velit. Nulla laoreet purus mi, ut ullamcorper nunc egestas sed.

Integer congue dui quis est congue, sed commodo felis lacinia. Nunc volutpat metus et mauris malesuada, vitae fringilla metus efficitur. Morbi auctor iaculis dui eget fringilla. Sed bibendum est sit amet metus lacinia, a elementum lorem fermentum. In condimentum, lorem ut congue eleifend, ex purus tempus nisl, ac dapibus ipsum neque nec ante. Pellentesque vel enim diam. Cras et sem elementum, malesuada tortor nec, vestibulum sem. Sed at fermentum lectus. Proin ultricies, nisl vel gravida malesuada, erat odio feugiat lectus, sed varius risus elit et metus. Nunc eu imperdiet arcu. Duis non iaculis metus. Vivamus sit amet lorem ac enim varius sagittis.

Sed eu massa nisl. Mauris tincidunt mauris sit amet eleifend laoreet. Integer facilisis enim ac est efficitur, ut luctus tortor interdum. Cras ac ipsum euismod, interdum eros a, cursus mi. Mauris eleifend placerat diam id gravida. Proin viverra leo a diam commodo facilisis. Sed nec elit eu lectus bibendum malesuada ac at velit. Cras aliquet eros eget massa feugiat interdum. Maecenas semper consequat dui, ac tristique ex dapibus et. Quisque vitae quam ut ipsum ultricies ultrices a at nisl. Ut in ante auctor, consectetur tellus vel, luctus justo. Nullam in ante a orci rhoncus tincidunt. Nullam mattis enim id erat sagittis, in dictum metus facilisis. Cras ac elit metus. Nulla eget aliquet ex.

Aenean vestibulum finibus malesuada. Nullam efficitur metus lectus, et vulputate justo hendrerit vitae. Praesent tempor elit nec interdum vestibulum. Nam commodo, lectus vel pellentesque finibus, sapien est aliquam elit, nec porttitor neque mi vitae justo. Curabitur eleifend gravida tellus vitae feugiat. Morbi sodales urna et vulputate mattis. Aliquam sit amet lorem eu tellus aliquam auctor.

Duis sagittis tortor vitae nisl laoreet elementum. Integer semper lacus id lobortis varius. Sed eu orci a lectus interdum vulputate. Nullam sit amet tortor sed erat hendrerit varius nec a purus. Cras non nisi dui. In eu efficitur ante. Donec non tempor nulla. Sed pharetra orci at nibh consequat, ac consectetur leo lacinia. Duis iaculis magna ut ipsum laoreet varius. Cras euismod nunc eget nisi vestibulum, nec faucibus mauris pharetra. Aliquam eget nunc sed ex consectetur scelerisque sit amet ac tellus. Nam ullamcorper, turpis eget lacinia consequat, lacus purus feugiat justo, id finibus purus mauris non turpis.
`;

function getTermsAndConditions() {
  return termsAndConditions;
}

const topikMateri = [
  {
    nama: 'Pengetahuan Kuantitatif',
    subBab: [
      { nama: 'Aljabar', link: 'http://example.com/materi/aljabar.pdf' },
      { nama: 'Geometri', link: 'http://example.com/materi/geometri.pdf' },
    ],
  },
  {
    nama: 'Penalaran Umum',
    subBab: [
      { nama: 'Logika', link: 'https://drive.google.com/file/d/1dmVIXVyhp4_bt-Bqg46DSWhgdPK6KkeJ/view?usp=drive_link' },
      { nama: 'Argumentasi', link: 'http://example.com/materi/argumentasi.pdf' },
    ],
  },
  {
    nama: 'Pengetahuan dan Pemahaman Umum',
    subBab: [
      { nama: 'Aljabar', link: 'http://example.com/materi/aljabar.pdf' },
      { nama: 'Geometri', link: 'http://example.com/materi/geometri.pdf' },
    ],
  },
  {
    nama: 'Pemahaman Bacaan dan Menulis',
    subBab: [
      { nama: 'Aljabar', link: 'http://example.com/materi/aljabar.pdf' },
      { nama: 'Geometri', link: 'http://example.com/materi/geometri.pdf' },
    ],
  },
  {
    nama: 'Literasi Bahasa Inggris',
    subBab: [
      { nama: 'Aljabar', link: 'http://example.com/materi/aljabar.pdf' },
      { nama: 'Geometri', link: 'http://example.com/materi/geometri.pdf' },
    ],
  },
  {
    nama: 'Literasi Bahasa Indonesia',
    subBab: [
      { nama: 'Aljabar', link: 'http://example.com/materi/aljabar.pdf' },
      { nama: 'Geometri', link: 'http://example.com/materi/geometri.pdf' },
    ],
  },
  {
    nama: 'Penalaran Matematika',
    subBab: [
      { nama: 'Aljabar', link: 'http://example.com/materi/aljabar.pdf' },
      { nama: 'Geometri', link: 'http://example.com/materi/geometri.pdf' },
    ],
  },
  // Add other topics and sub-bab
];

function getTopikMateri() {
  return topikMateri.map((topik) => topik.nama);
}

function getSubBabByTopik(topik) {
  const selectedTopik = topikMateri.find((t) => t.nama === topik);
  return selectedTopik ? selectedTopik.subBab : null;
}

module.exports = {
  addUser,
  getUserByUsername,
  generateOTP,
  sendEmail,
  getTermsAndConditions,
  updateUserVerificationStatus,
  verifyOTP,
  getTopikMateri,
  getSubBabByTopik,
}
