// ==========================================
// File: cek-login.js
// Tujuan: Otomatis mendeteksi nama siswa & melindungi halaman dashboard
// ==========================================

// 1. Fungsi pintar mencari nama siswa di localStorage atau URL
function dapatkanNamaSiswa() {
    // A. Cek dari Parameter URL (jika dikirim dari halaman login)
    const urlParams = new URLSearchParams(window.location.search);
    const namaDariUrl = urlParams.get('nama') || 
                        urlParams.get('namaLengkap') || 
                        urlParams.get('nama_siswa') || 
                        urlParams.get('user');
    
    if (namaDariUrl) {
        const namaClean = decodeURIComponent(namaDariUrl);
        localStorage.setItem('infoFun_Nama', namaClean);
        return namaClean;
    }

    // B. Cek Kunci Spesifik di LocalStorage
    const namaSpesifik = localStorage.getItem('infoFun_Nama') || 
                         localStorage.getItem('namaLengkap') || 
                         localStorage.getItem('nama_siswa') || 
                         localStorage.getItem('nama') || 
                         localStorage.getItem('currentUser');
    
    if (namaSpesifik) return namaSpesifik;

    // C. Pindai Otomatis Seluruh LocalStorage (Antisipasi beda nama kunci)
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.toLowerCase().includes('nama') || key.toLowerCase().includes('user')) {
            const val = localStorage.getItem(key);
            if (val && val !== 'undefined' && val !== 'null' && val.trim() !== '') {
                return val;
            }
        }
    }

    return null;
}

// 2. Fungsi pintar mencari NISN siswa
function dapatkanNISNSiswa() {
    const urlParams = new URLSearchParams(window.location.search);
    const nisnDariUrl = urlParams.get('nisn') || urlParams.get('user_nisn');
    
    if (nisnDariUrl) {
        localStorage.setItem('infoFun_NISN', nisnDariUrl);
        return nisnDariUrl;
    }

    const nisnSpesifik = localStorage.getItem('infoFun_NISN') || 
                         localStorage.getItem('nisn') || 
                         localStorage.getItem('user_nisn');
    if (nisnSpesifik) return nisnSpesifik;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.toLowerCase().includes('nisn')) {
            const val = localStorage.getItem(key);
            if (val && val !== 'undefined' && val !== 'null') return val;
        }
    }

    return null;
}

// 3. Konfigurasi Keamanan & Pengalihan Halaman Login
const loginUrlLengkap = "https://riski902-alt.github.io/LOGIN-MATERI/";
const namaSiswa = dapatkanNamaSiswa();
const nisnSiswa = dapatkanNISNSiswa();

// JIKA BELUM LOGIN: Paksa redirect ke halaman login
if ((!namaSiswa || !nisnSiswa) && !window.location.href.includes("LOGIN-MATERI")) {
    alert("Kamu belum login! Silakan login terlebih dahulu untuk mengakses materi.");
    window.location.href = loginUrlLengkap;
}

// 4. Tampilkan Nama Siswa pada Header setelah DOM Siap
document.addEventListener("DOMContentLoaded", () => {
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');

    const namaAktif = dapatkanNamaSiswa();

    if (userNameDisplay) {
        if (namaAktif) {
            userNameDisplay.innerText = namaAktif;
        } else {
            userNameDisplay.innerText = "Siswa Informatika";
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
