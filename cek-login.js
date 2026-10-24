// ==========================================
// File: cek-login.js
// Tujuan: Mencegah akses tanpa login & menampilkan profil pengguna
// ==========================================

// 1. Mengambil data sesi login dari localStorage
const currentUser = localStorage.getItem('infoFun_Nama');
const currentNISN = localStorage.getItem('infoFun_NISN');

// 2. Mendapatkan nama halaman yang sedang dibuka
const currentPage = window.location.pathname.split("/").pop().toLowerCase();
const loginUrlLengkap = "https://riski902-alt.github.io/LOGIN-MATERI/";

// 3. Daftar halaman login yang diizinkan tanpa autentikasi
const allowedPages = ["index.html", "halaman%20login.html", "halaman_login.html"];
const isAtLoginPage = allowedPages.includes(currentPage) || window.location.href === loginUrlLengkap;

// 4. Logika Pengecekan Keamanan Akses
if ((!currentUser || !currentNISN) && !isAtLoginPage) {
    alert("Hayo! Kamu harus login terlebih dahulu untuk mengakses materi ini ya.");
    window.location.href = loginUrlLengkap;
} else {
    // 5. Tampilkan Nama dan Aktifkan Tombol Logout setelah DOM Siap
    document.addEventListener("DOMContentLoaded", () => {
        const userNameDisplay = document.getElementById('user-name-display');
        const logoutBtn = document.getElementById('logout-btn');

        // Tampilkan Nama Siswa jika elemen ditemukan
        if (userNameDisplay && currentUser) {
            userNameDisplay.innerText = currentUser;
        }

        // Tampilkan dan Aktifkan Tombol Logout
        if (logoutBtn) {
            logoutBtn.style.display = 'inline-block';
            logoutBtn.addEventListener('click', () => {
                if (confirm("Apakah kamu yakin ingin keluar?")) {
                    localStorage.removeItem('infoFun_Nama');
                    localStorage.removeItem('infoFun_NISN');
                    window.location.href = loginUrlLengkap;
                }
            });
        }
    });
}
