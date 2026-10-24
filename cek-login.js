// ==========================================
// File: cek-login.js
// Tujuan: Menampilkan Nama Lengkap Murni dan Validasi Login untuk Siswa dan Guru
// ==========================================

// Helper: Memeriksa apakah teks hanya berupa angka (format NISN)
function apakahHanyaAngka(teks) {
    if (!teks) return false;
    return /^\d+$/.test(teks.toString().trim());
}

// Fungsi Utama: Mengambil Data dari LocalStorage & URL
function ambilDataSesi() {
    let data = {
        nama: null,
        nisn: null,
        email: null,
        role: null
    };

    // 1. Pindai Parameter dari URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('nama')) data.nama = decodeURIComponent(urlParams.get('nama')).trim();
    if (urlParams.get('namaLengkap')) data.nama = decodeURIComponent(urlParams.get('namaLengkap')).trim();
    if (urlParams.get('nisn')) data.nisn = urlParams.get('nisn').trim();
    if (urlParams.get('email')) data.email = urlParams.get('email').trim();
    if (urlParams.get('role')) data.role = urlParams.get('role').trim().toLowerCase();

    // 2. Prioritas Kunci Utama LocalStorage
    const kunciNama = ['infoFun_Nama', 'namaLengkap', 'nama_siswa', 'nama', 'Nama Lengkap'];
    for (let k of kunciNama) {
        let val = localStorage.getItem(k);
        if (val && !apakahHanyaAngka(val)) {
            data.nama = val.trim();
            break;
        }
    }

    const kunciNisn = ['infoFun_NISN', 'nisn', 'user_nisn', 'NISN'];
    for (let k of kunciNisn) {
        let val = localStorage.getItem(k);
        if (val && apakahHanyaAngka(val)) {
            data.nisn = val.trim();
            break;
        }
    }

    const infoEmail = localStorage.getItem('infoFun_Email') || localStorage.getItem('email') || localStorage.getItem('guru_email');
    if (infoEmail) data.email = infoEmail.trim();

    const infoRole = localStorage.getItem('infoFun_Role') || localStorage.getItem('role');
    if (infoRole) data.role = infoRole.trim().toLowerCase();

    // 3. Pencarian Ekstra Cerdas (Jika nama masih kosong, cari teks panjang di memori)
    if (!data.nama) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const val = localStorage.getItem(key);
            // Ambil teks yang bukan angka, bukan email, bukan json, dan lebih dari 3 huruf
            if (val && typeof val === 'string' && val.length > 3 && !apakahHanyaAngka(val) && !val.includes('@') && !val.includes('{') && val.toLowerCase() !== 'siswa' && val.toLowerCase() !== 'guru') {
                data.nama = val.trim();
                break;
            }
        }
    }

    return data;
}

const sesi = ambilDataSesi();

// Simpan Kembali Data Terkonfirmasi ke LocalStorage agar Konsisten
if (sesi.nama) localStorage.setItem('infoFun_Nama', sesi.nama);
if (sesi.nisn) localStorage.setItem('infoFun_NISN', sesi.nisn);

// 4. Logika Validasi Akses
const loginUrlLengkap = "https://riski902-alt.github.io/LOGIN-MATERI/";

const isValidSiswa = !!(sesi.nama || sesi.nisn);
const isValidGuru = !!(sesi.email || sesi.role === 'guru');
const isLoginValid = isValidSiswa || isValidGuru;

if (!isLoginValid && !window.location.href.includes("LOGIN-MATERI")) {
    alert("Kamu belum login! Silakan login terlebih dahulu untuk mengakses materi.");
    window.location.href = loginUrlLengkap;
}

// 5. Tampilkan Profil pada Header Dashboard
document.addEventListener("DOMContentLoaded", () => {
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');

    const dataSesiTerbaru = ambilDataSesi();

    if (userNameDisplay) {
        if (dataSesiTerbaru.role === 'guru' || (dataSesiTerbaru.email && !dataSesiTerbaru.nisn)) {
            // HANYA MENAMPILKAN NAMA GURU, TANPA TEKS "[Guru]"
            const namaGuru = dataSesiTerbaru.nama || "Riski Amalia, S.Pd";
            userNameDisplay.innerText = namaGuru;
        } else if (dataSesiTerbaru.nama) {
            // HANYA MENAMPILKAN NAMA LENGKAP SISWA
            userNameDisplay.innerText = dataSesiTerbaru.nama;
        } else {
            // Jika benar-benar kosong
            userNameDisplay.innerText = "Pelajar";
        }
    }

    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.addEventListener('click', () => {
            if (confirm("Apakah Anda yakin ingin keluar dari akun ini?")) {
                localStorage.clear(); 
                window.location.href = loginUrlLengkap;
            }
        });
    }
});
