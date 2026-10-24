// ==========================================
// File: cek-login.js
// Tujuan: Menampilkan nama siswa & mengelola sesi login secara fleksibel
// ==========================================

// 1. Fungsi pembaca nama siswa dari URL atau LocalStorage
function dapatkanNamaSiswa() {
    // A. Cek dari URL Parameter (jika dikirim saat pengalihan dari halaman login)
    const urlParams = new URLSearchParams(window.location.search);
    const namaDariUrl = urlParams.get('nama') || 
                        urlParams.get('namaLengkap') || 
                        urlParams.get('user') || 
                        urlParams.get('nama_siswa');
    
    if (namaDariUrl) {
        const namaClean = decodeURIComponent(namaDariUrl);
        // Simpan ke localStorage agar tidak hilang saat berpindah menu
        localStorage.setItem('infoFun_Nama', namaClean);
        return namaClean;
    }

    // B. Cek dari berbagai variasi kunci LocalStorage
    return localStorage.getItem('infoFun_Nama') || 
           localStorage.getItem('namaLengkap') || 
           localStorage.getItem('nama_siswa') || 
           localStorage.getItem('nama') || 
           localStorage.getItem('currentUser') || 
           localStorage.getItem('user_nama') || 
           localStorage.getItem('user');
}

// 2. Fungsi pembaca NISN siswa
function dapatkanNISNSiswa() {
    const urlParams = new URLSearchParams(window.location.search);
    const nisnDariUrl = urlParams.get('nisn') || urlParams.get('user_nisn');
    
    if (nisnDariUrl) {
        localStorage.setItem('infoFun_NISN', nisnDariUrl);
        return nisnDariUrl;
    }

    return localStorage.getItem('infoFun_NISN') || 
           localStorage.getItem('nisn') || 
           localStorage.getItem('nisn_siswa') || 
           localStorage.getItem('user_nisn');
}

// 3. Konfigurasi Halaman & Keamanan Akses
const loginUrlLengkap = "https://riski902-alt.github.io/LOGIN-MATERI/";
const currentPage = window.location.pathname.split("/").pop().toLowerCase();
const allowedPages = ["index.html", "halaman%20login.html", "halaman_login.html"];
const isAtLoginPage = allowedPages.includes(currentPage) || window.location.href === loginUrlLengkap;

const namaAktif = dapatkanNamaSiswa();
const nisnAktif = dapatkanNISNSiswa();

// 4. Pengalihan jika belum login
if ((!namaAktif || !nisnAktif) && !isAtLoginPage) {
    alert("Hayo! Kamu harus login terlebih dahulu untuk mengakses materi ini ya.");
    window.location.href = loginUrlLengkap;
}

// 5. Menampilkan Nama & Mengaktifkan Tombol Logout setelah Halaman Siap
document.addEventListener("DOMContentLoaded", () => {
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');

    // Ambil nama terbaru dari memori
    const namaSiswaTampil = dapatkanNamaSiswa();

    if (userNameDisplay) {
        if (namaSiswaTampil) {
            userNameDisplay.innerText = namaSiswaTampil;
        } else {
            userNameDisplay.innerText = "Siswa Informatika";
        }
    }

    // Aktifkan Tombol Logout
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.addEventListener('click', () => {
            if (confirm("Apakah kamu yakin ingin keluar dari akun ini?")) {
                localStorage.clear(); // Hapus seluruh sesi login
                window.location.href = loginUrlLengkap;
            }
        });
    }
});
