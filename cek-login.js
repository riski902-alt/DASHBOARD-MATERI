// ==========================================
// File: cek-login.js
// Tujuan: Memastikan NAMA LENGKAP siswa yang tampil (bukan NISN angka)
// ==========================================

// Fungsi pembantu untuk mengecek apakah teks hanya berupa angka (NISN)
function apakahHanyaAngka(teks) {
    if (!teks) return false;
    return /^\d+$/.test(teks.toString().trim());
}

// 1. Fungsi pintar mencari NAMA LENGKAP siswa
function dapatkanNamaSiswa() {
    // A. Cek dari Parameter URL (jika dikirim saat pengalihan login)
    const urlParams = new URLSearchParams(window.location.search);
    const namaUrl = urlParams.get('nama') || urlParams.get('namaLengkap') || urlParams.get('nama_siswa');
    
    if (namaUrl) {
        const namaClean = decodeURIComponent(namaUrl).trim();
        if (!apakahHanyaAngka(namaClean)) {
            localStorage.setItem('infoFun_Nama', namaClean);
            return namaClean;
        }
    }

    // B. Cek Kunci Prioritas Utama di LocalStorage
    const kunciNama = ['infoFun_Nama', 'namaLengkap', 'nama_siswa', 'nama', 'currentUser', 'user_nama'];
    
    for (const kunci of kunciNama) {
        const val = localStorage.getItem(kunci);
        if (val && val !== 'undefined' && val !== 'null' && val.trim() !== '') {
            const nilaiBersih = val.trim();
            // Pastikan BUKAN angka NISN
            if (!apakahHanyaAngka(nilaiBersih)) {
                return nilaiBersih;
            }
        }
    }

    // C. Pindai Otomatis Kunci Lain di LocalStorage (Jika nama kunci berbeda)
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = localStorage.getItem(key);
        
        if (val && val !== 'undefined' && val !== 'null' && val.trim() !== '') {
            const nilaiBersih = val.trim();
            if ((key.toLowerCase().includes('nama') || key.toLowerCase().includes('user')) && !apakahHanyaAngka(nilaiBersih)) {
                return nilaiBersih;
            }
        }
    }

    return null;
}

// 2. Fungsi pembaca NISN siswa
function dapatkanNISNSiswa() {
    const urlParams = new URLSearchParams(window.location.search);
    const nisnUrl = urlParams.get('nisn') || urlParams.get('user_nisn');
    
    if (nisnUrl) {
        localStorage.setItem('infoFun_NISN', nisnUrl);
        return nisnUrl;
    }

    const kunciNisn = ['infoFun_NISN', 'nisn', 'user_nisn', 'nisn_siswa'];
    for (const kunci of kunciNisn) {
        const val = localStorage.getItem(kunci);
        if (val && val !== 'undefined' && val !== 'null' && val.trim() !== '') {
            return val.trim();
        }
    }

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.toLowerCase().includes('nisn')) {
            const val = localStorage.getItem(key);
            if (val && val !== 'undefined' && val !== 'null') return val.trim();
        }
    }

    return null;
}

// 3. Konfigurasi Keamanan & Redirect Login
const loginUrlLengkap = "https://riski902-alt.github.io/LOGIN-MATERI/";
const namaSiswa = dapatkanNamaSiswa();
const nisnSiswa = dapatkanNISNSiswa();

if ((!namaSiswa || !nisnSiswa) && !window.location.href.includes("LOGIN-MATERI")) {
    alert("Kamu belum login! Silakan login terlebih dahulu untuk mengakses materi.");
    window.location.href = loginUrlLengkap;
}

// 4. Tampilkan Nama Lengkap pada Header setelah DOM Siap
document.addEventListener("DOMContentLoaded", () => {
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');

    const namaLengkapAktif = dapatkanNamaSiswa();

    if (userNameDisplay) {
        if (namaLengkapAktif) {
            userNameDisplay.innerText = namaLengkapAktif;
        } else {
            userNameDisplay.innerText = "Siswa Informatika";
        }
    }

    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.addEventListener('click', () => {
            if (confirm("Apakah kamu yakin ingin keluar dari akun ini?")) {
                localStorage.clear();
                window.location.href = loginUrlLengkap;
            }
        });
    }
});
