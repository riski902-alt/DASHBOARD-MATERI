// ==========================================
// File: cek-login.js
// Tujuan: Validasi Akses dan Penampil Identitas Universal (Siswa & Guru)
// ==========================================

// Helper: Memeriksa apakah teks hanya berupa angka
function apakahHanyaAngka(teks) {
    if (!teks) return false;
    return /^\d+$/.test(teks.toString().trim());
}

// Fungsi Utama: Memindai Seluruh Penyimpanan Memori Browser (Local & Session)
function ambilDataSesi() {
    let data = {
        nama: null,
        nisn: null,
        email: null,
        role: null
    };

    // 1. Cek parameter URL terlebih dahulu
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('nama')) data.nama = decodeURIComponent(urlParams.get('nama')).trim();
    if (urlParams.get('nisn')) data.nisn = urlParams.get('nisn').trim();
    if (urlParams.get('email')) data.email = urlParams.get('email').trim();
    if (urlParams.get('role')) data.role = urlParams.get('role').trim().toLowerCase();

    // 2. Mesin Pemindai Storage (Bisa membaca session maupun local)
    function pindaiStorage(storage) {
        for (let i = 0; i < storage.length; i++) {
            const key = storage.key(i);
            const val = storage.getItem(key);
            
            if (!val || val === 'undefined' || val === 'null') continue;

            const valBersih = val.trim();

            // Jika data berupa objek JSON
            if (valBersih.startsWith('{') && valBersih.endsWith('}')) {
                try {
                    const obj = JSON.parse(valBersih);
                    if (!data.nama && (obj.nama || obj.namaLengkap)) data.nama = String(obj.nama || obj.namaLengkap).trim();
                    if (!data.nisn && obj.nisn) data.nisn = String(obj.nisn).trim();
                    if (!data.email && obj.email) data.email = String(obj.email).trim();
                    if (!data.role && (obj.role || obj.type)) data.role = String(obj.role || obj.type).toLowerCase().trim();
                } catch (e) {
                    // Abaikan jika bukan JSON valid
                }
            } else {
                // Jika data berupa teks langsung
                const keyLower = key.toLowerCase();
                
                // Deteksi Email Guru
                if (!data.email && (keyLower.includes('email') || valBersih.includes('@'))) {
                    data.email = valBersih;
                }
                // Deteksi NISN
                else if (!data.nisn && (keyLower.includes('nisn') || (apakahHanyaAngka(valBersih) && valBersih.length >= 5))) {
                    data.nisn = valBersih;
                }
                // Deteksi Nama (Hindari variabel sistem, angka, email, dan kata role)
                else if (!data.nama && (keyLower.includes('nama') || keyLower.includes('user')) && valBersih.length > 3 && !apakahHanyaAngka(valBersih) && !valBersih.includes('@') && valBersih.toLowerCase() !== 'guru' && valBersih.toLowerCase() !== 'siswa') {
                    data.nama = valBersih;
                }

                // Deteksi Peran (Role)
                if (valBersih.toLowerCase() === 'guru' || valBersih.toLowerCase() === 'siswa') {
                    data.role = valBersih.toLowerCase();
                }
            }
        }
    }

    // Eksekusi pemindaian: Prioritaskan SessionStorage lalu LocalStorage
    pindaiStorage(sessionStorage);
    pindaiStorage(localStorage);

    return data;
}

const sesi = ambilDataSesi();

// Simpan kembali data yang valid ke LocalStorage agar tidak hilang saat refresh
if (sesi.nama) localStorage.setItem('infoFun_Nama', sesi.nama);
if (sesi.email) localStorage.setItem('infoFun_Email', sesi.email);
if (sesi.nisn) localStorage.setItem('infoFun_NISN', sesi.nisn);
if (sesi.role) localStorage.setItem('infoFun_Role', sesi.role);

// 4. Logika Validasi Akses yang Konsisten
const loginUrlLengkap = "https://riski902-alt.github.io/LOGIN-MATERI/";

// Validasi Kelulusan Akses:
// Siswa lulus jika ada Nama ATAU NISN
const isValidSiswa = !!(sesi.nama || sesi.nisn);
// Guru lulus jika ada Email ATAU peran 'guru'
const isValidGuru = !!(sesi.email || sesi.role === 'guru');

const isLoginValid = isValidSiswa || isValidGuru;

// Pemblokiran jika gagal validasi
if (!isLoginValid && !window.location.href.includes("LOGIN-MATERI")) {
    alert("Kamu belum login! Silakan login terlebih dahulu untuk mengakses materi.");
    window.location.href = loginUrlLengkap;
}

// 5. Manajemen Tampilan UI pada Header
document.addEventListener("DOMContentLoaded", () => {
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');

    if (userNameDisplay) {
        if (sesi.role === 'guru' || (sesi.email && !sesi.nisn)) {
            // Tampilan Guru murni tanpa label
            userNameDisplay.innerText = sesi.nama || "Riski Amalia, S.Pd"; 
        } else if (sesi.nama) {
            // Tampilan Siswa
            userNameDisplay.innerText = sesi.nama;
        } else {
            userNameDisplay.innerText = "Pelajar";
        }
    }

    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.addEventListener('click', () => {
            if (confirm("Apakah Anda yakin ingin keluar dari akun ini?")) {
                // Pembersihan memori total saat logout
                localStorage.clear();
                sessionStorage.clear(); 
                window.location.href = loginUrlLengkap;
            }
        });
    }
});
