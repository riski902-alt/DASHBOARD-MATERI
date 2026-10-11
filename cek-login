// ==========================================
// File: cek-login.js
// Tujuan: Mencegah akses masuk tanpa login
// ==========================================

// 1. Mengambil data nama dan NISN dari memori penyimpanan browser (localStorage)
// Nama kunci ini disesuaikan persis dengan yang ada di proses login-mu
const currentUser = localStorage.getItem('infoFun_Nama');
const currentNISN = localStorage.getItem('infoFun_NISN');

// 2. Mendapatkan nama file halaman website yang sedang dibuka saat ini
// Contoh hasil: "index.html" atau "halaman-materi.html"
const currentPage = window.location.pathname.split("/").pop();

// 3. Logika Pengecekan Kemanan
// Jika TIDAK ADA data nama (belum login) 
// DAN halaman yang dibuka BUKAN halaman utama (index.html)
if (!currentUser && currentPage !== "index.html" && currentPage !== "") {
    
    // Tampilkan pesan peringatan kepada pengguna
    alert("Hayo! Kamu harus login terlebih dahulu untuk mengakses materi ini ya.");
    
    // Arahkan (redirect) pengguna kembali ke halaman utama secara paksa
    window.location.href = "index.html";
}