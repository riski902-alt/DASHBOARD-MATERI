// ==========================================
// File: cek-login.js
// Tujuan: Menampilkan nama siswa & mengelola sesi login secara fleksibel
// ==========================================

// 1. Fungsi pembaca nama siswa dari berbagai kemungkinan kunci localStorage
function ambilNamaSiswa() {
    return localStorage.getItem('infoFun_Nama') || 
           localStorage.getItem('nama_siswa') || 
           localStorage.getItem('nama') || 
           localStorage.getItem('currentUser') ||
           localStorage.getItem('user_nama');
}

// 2. Fungsi pembaca NISN dari berbagai kemungkinan kunci localStorage
function ambilNISNSiswa() {
    return localStorage.getItem('infoFun_NISN') || 
           localStorage.getItem('nisn') || 
           localStorage.getItem('user_nisn');
}

// Ambil data user
const currentUser = ambilNamaSiswa();
const currentNISN = ambilNISNSiswa();

// 3. Konfigurasi Halaman & Redirect Login
const currentPage = window.location.pathname.split("/").pop().toLowerCase();
const loginUrlLengkap = "https://riski902-alt.github.io/LOGIN-MATERI/";
const allowedPages = ["index.html", "halaman%20login.html", "halaman_login.html"];
const isAtLoginPage = allowedPages.includes(currentPage) || window.location.href === loginUrlLengkap;

// 4. Update UI Nama Siswa & Tombol Logout setelah Halaman Dimuat
document.addEventListener("DOMContentLoaded", () => {
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');

    // Tampilkan Nama Siswa
    if (userNameDisplay) {
        if (currentUser) {
            userNameDisplay.innerText = currentUser;
        } else {
            // Cek jika nama dikirim lewat parameter URL (misal: ?nama=ABDILLAH%20KHUSAIRY)
            const urlParams = new URLSearchParams(window.location.search);
            const namaFromUrl = urlParams.get('nama');
            if (namaFromUrl) {
                const namaDecoded = decodeURIComponent(namaFromUrl);
                userNameDisplay.innerText = namaDecoded;
                localStorage.setItem('infoFun_Nama', namaDecoded);
            } else {
                userNameDisplay.innerText = "Siswa Informatika";
            }
        }
    }

    // Aktifkan Tombol Logout
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.addEventListener('click', () => {
            if (confirm("Apakah kamu yakin ingin keluar dari akun ini?")) {
                localStorage.clear(); // Hapus sesi login
                window.location.href = loginUrlLengkap;
            }
        });
    }
});
