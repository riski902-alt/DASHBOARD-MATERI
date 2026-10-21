// ==========================================
// File: cek-login.js
// Tujuan: Mencegah akses masuk tanpa login ke halaman materi
// ==========================================

// 1. Mengambil data sesi login dari memori penyimpanan browser (localStorage)
// Nama kunci ini sudah disesuaikan dengan file halaman login.html yang kita buat
const currentUser = localStorage.getItem('infoFun_Nama');
const currentNISN = localStorage.getItem('infoFun_NISN');

// 2. Mendapatkan nama halaman atau path yang sedang dibuka saat ini
const currentPage = window.location.pathname.split("/").pop().toLowerCase();

// 3. Menentukan URL halaman login yang sebenarnya
// Ganti URL di bawah ini dengan link website login-mu yang paling tepat. 
// Menggunakan URL lengkap (absolut) jauh lebih aman dan akurat.
const loginUrlLengkap = "https://riski902-alt.github.io/LOGIN-MATERI/";

// 4. Daftar halaman yang dianggap sebagai "Halaman Login" (Boleh diakses tanpa login)
// Termasuk 'index.html', 'halaman login.html', atau sekadar '/' (terbaca kosong "")
const allowedPages = ["index.html", "halaman%20login.html", "halaman_login.html"];

// Mengecek apakah halaman saat ini adalah salah satu dari halaman login
const isAtLoginPage = allowedPages.includes(currentPage) || window.location.href === loginUrlLengkap;

// 5. Logika Pengecekan Keamanan Utama
// JIKA data login tidak lengkap (belum login) DAN pengguna SEDANG BUKAN di halaman login
if ((!currentUser || !currentNISN) && !isAtLoginPage) {
    
    // Tampilkan pesan peringatan kepada pengguna
    alert("Hayo! Kamu harus login terlebih dahulu untuk mengakses materi ini ya.");
    
    // Arahkan (redirect) pengguna secara paksa ke URL halaman login yang benar
    window.location.href = loginUrlLengkap;
}
