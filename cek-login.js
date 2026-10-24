// ==========================================
// File: cek-login.js
// Tujuan: Mendukung Login Siswa & Login Guru secara bersamaan
// ==========================================

// Helper: Cek apakah string hanya berisi angka
function apakahHanyaAngka(teks) {
    if (!teks) return false;
    return /^\d+$/.test(teks.toString().trim());
}

// 1. Deteksi Peran (Role): 'guru' atau 'siswa'
function dapatkanRoleUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const roleDariUrl = urlParams.get('role') || urlParams.get('user_role');
    
    if (roleDariUrl) {
        const roleClean = roleDariUrl.toLowerCase().trim();
        localStorage.setItem('infoFun_Role', roleClean);
        return roleClean;
    }

    const roleDisimpan = localStorage.getItem('infoFun_Role') || 
                         localStorage.getItem('role') || 
                         localStorage.getItem('user_role');

    if (roleDisimpan) return roleDisimpan.toLowerCase().trim();

    // Jika ada penanda email Guru di localStorage, set otomatis sebagai guru
    if (localStorage.getItem('infoFun_Email') || localStorage.getItem('guru_email')) {
        return 'guru';
    }

    return 'siswa'; // Default role
}

// 2. Fungsi Pembaca Nama User (Siswa / Guru)
function dapatkanNamaUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const namaUrl = urlParams.get('nama') || urlParams.get('namaLengkap') || urlParams.get('nama_siswa');
    
    if (namaUrl) {
        const namaClean = decodeURIComponent(namaUrl).trim();
        if (!apakahHanyaAngka(namaClean)) {
            localStorage.setItem('infoFun_Nama', namaClean);
            return namaClean;
        }
    }

    const kunciNama = ['infoFun_Nama', 'namaLengkap', 'nama_siswa', 'nama', 'currentUser', 'user_nama', 'guru_nama'];
    
    for (const kunci of kunciNama) {
        const val = localStorage.getItem(kunci);
        if (val && val !== 'undefined' && val !== 'null' && val.trim() !== '') {
            const nilaiBersih = val.trim();
            if (!apakahHanyaAngka(nilaiBersih)) {
                return nilaiBersih;
            }
        }
    }

    return null;
}

// 3. Fungsi Pembaca NISN Siswa
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

    return null;
}

// 4. Logika Validasi Akses
const loginUrlLengkap = "https://riski902-alt.github.io/LOGIN-MATERI/";
const roleUser = dapatkanRoleUser();
const namaUser = dapatkanNamaUser();
const nisnSiswa = dapatkanNISNSiswa();

let isLoginValid = false;

if (roleUser === 'guru') {
    // Untuk Guru: Cukup ada sesi/nama Guru (tidak memerlukan NISN)
    isLoginValid = !!namaUser || !!localStorage.getItem('infoFun_Email') || !!localStorage.getItem('guru_email');
} else {
    // Untuk Siswa: Wajib ada Nama DAN NISN (Sesuai sistem siswa yang sudah berhasil)
    isLoginValid = !!namaUser && !!nisnSiswa;
}

// Pengalihan jika belum login
if (!isLoginValid && !window.location.href.includes("LOGIN-MATERI")) {
    alert("Kamu belum login! Silakan login terlebih dahulu untuk mengakses materi.");
    window.location.href = loginUrlLengkap;
}

// 5. Tampilkan Nama pada Header Dashboard setelah DOM Dimuat
document.addEventListener("DOMContentLoaded", () => {
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');

    const namaAktif = dapatkanNamaUser();
    const roleAktif = dapatkanRoleUser();

    if (userNameDisplay) {
        if (namaAktif) {
            userNameDisplay.innerText = roleAktif === 'guru' ? `[Guru] ${namaAktif}` : namaAktif;
        } else if (roleAktif === 'guru') {
            userNameDisplay.innerText = "Guru Informatika";
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
