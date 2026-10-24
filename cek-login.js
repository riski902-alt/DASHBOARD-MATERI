// ==========================================
// File: cek-login.js
// Tujuan: Mencegah pemblokiran Guru & memvalidasi login Siswa/Guru
// ==========================================

// Helper: Cek apakah string hanya berisi angka (NISN)
function apakahHanyaAngka(teks) {
    if (!teks) return false;
    return /^\d+$/.test(teks.toString().trim());
}

// 1. Deteksi Peran (Role): 'guru' atau 'siswa'
function dapatkanRoleUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const roleUrl = urlParams.get('role') || urlParams.get('user_role') || urlParams.get('type');
    
    if (roleUrl) {
        const roleClean = roleUrl.toLowerCase().trim();
        localStorage.setItem('infoFun_Role', roleClean);
        return roleClean;
    }

    // Cek kata kunci role di localStorage
    const roleDisimpan = localStorage.getItem('infoFun_Role') || 
                         localStorage.getItem('role') || 
                         localStorage.getItem('user_role') ||
                         localStorage.getItem('user_type');

    if (roleDisimpan) return roleDisimpan.toLowerCase().trim();

    // Deteksi otomatis via email atau penanda Guru di localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = (localStorage.getItem(key) || '').toLowerCase();
        if (key.includes('guru') || key.includes('email') || val.includes('@guru') || val.includes('guru')) {
            return 'guru';
        }
    }

    return 'siswa';
}

// 2. Fungsi Pembaca Nama User (Siswa / Guru)
function dapatkanNamaUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const namaUrl = urlParams.get('nama') || urlParams.get('namaLengkap') || urlParams.get('nama_siswa') || urlParams.get('user');
    
    if (namaUrl) {
        const namaClean = decodeURIComponent(namaUrl).trim();
        if (!apakahHanyaAngka(namaClean)) {
            localStorage.setItem('infoFun_Nama', namaClean);
            return namaClean;
        }
    }

    const kunciNama = ['infoFun_Nama', 'namaLengkap', 'nama_siswa', 'nama', 'currentUser', 'user_nama', 'guru_nama', 'nama_guru'];
    
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

// Cek status login Guru dan Siswa
let isGuruLoggedIn = roleUser === 'guru' || 
                     !!localStorage.getItem('infoFun_Email') || 
                     !!localStorage.getItem('guru_email') || 
                     !!localStorage.getItem('email');

let isSiswaLoggedIn = !!namaUser && !!nisnSiswa;

let isLoginValid = isGuruLoggedIn || isSiswaLoggedIn;

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
        if (roleAktif === 'guru') {
            userNameDisplay.innerText = namaAktif ? `[Guru] ${namaAktif}` : "[Guru] Riski Amalia, S.Pd";
        } else if (namaAktif) {
            userNameDisplay.innerText = namaAktif;
        } else {
            userNameDisplay.innerText = "Siswa Informatika";
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
