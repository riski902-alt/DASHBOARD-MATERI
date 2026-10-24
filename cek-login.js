// ==========================================
// File: cek-login.js
// Tujuan: Validasi Akses Login Siswa & Guru secara Konsisten & Akurat
// ==========================================

// Helper: Memeriksa apakah teks hanya berupa angka (format NISN)
function apakahHanyaAngka(teks) {
    if (!teks) return false;
    return /^\d+$/.test(teks.toString().trim());
}

// Fungsi Utama: Mengambil dan Memindai Seluruh Data Sesi dari LocalStorage & URL
function ambilDataSesi() {
    let data = {
        nama: null,
        nisn: null,
        email: null,
        role: null
    };

    // 1. Pindai Parameter dari URL (jika dialihkan dari LOGIN-MATERI)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('nama')) data.nama = decodeURIComponent(urlParams.get('nama')).trim();
    if (urlParams.get('namaLengkap')) data.nama = decodeURIComponent(urlParams.get('namaLengkap')).trim();
    if (urlParams.get('nama_siswa')) data.nama = decodeURIComponent(urlParams.get('nama_siswa')).trim();
    if (urlParams.get('nisn')) data.nisn = urlParams.get('nisn').trim();
    if (urlParams.get('email')) data.email = urlParams.get('email').trim();
    if (urlParams.get('role')) data.role = urlParams.get('role').trim().toLowerCase();

    // 2. Prioritas Kunci Utama LocalStorage
    const infoNama = localStorage.getItem('infoFun_Nama') || localStorage.getItem('namaLengkap') || localStorage.getItem('nama_siswa') || localStorage.getItem('nama');
    if (infoNama && !apakahHanyaAngka(infoNama)) {
        data.nama = infoNama.trim();
    }

    const infoNisn = localStorage.getItem('infoFun_NISN') || localStorage.getItem('nisn') || localStorage.getItem('user_nisn');
    if (infoNisn && apakahHanyaAngka(infoNisn)) {
        data.nisn = infoNisn.trim();
    }

    const infoEmail = localStorage.getItem('infoFun_Email') || localStorage.getItem('email') || localStorage.getItem('guru_email');
    if (infoEmail) {
        data.email = infoEmail.trim();
    }

    const infoRole = localStorage.getItem('infoFun_Role') || localStorage.getItem('role');
    if (infoRole) {
        data.role = infoRole.trim().toLowerCase();
    }

    // 3. Pindai Otomatis Seluruh Elemen LocalStorage (antisipasi data objek JSON / kunci alternatif)
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const rawVal = localStorage.getItem(key);
        if (!rawVal || rawVal === 'undefined' || rawVal === 'null') continue;

        const val = rawVal.trim();

        // Jika data disimpan dalam bentuk Objek JSON (misal: currentUser = {"nama": "...", "nisn": "..."})
        if (val.startsWith('{') && val.endsWith('}')) {
            try {
                const obj = JSON.parse(val);
                if (!data.nama && (obj.nama || obj.namaLengkap || obj.nama_siswa)) {
                    data.nama = String(obj.nama || obj.namaLengkap || obj.nama_siswa).trim();
                }
                if (!data.nisn && (obj.nisn || obj.nisn_siswa)) {
                    data.nisn = String(obj.nisn || obj.nisn_siswa).trim();
                }
                if (!data.email && obj.email) {
                    data.email = String(obj.email).trim();
                }
                if (!data.role && (obj.role || obj.type)) {
                    data.role = String(obj.role || obj.type).toLowerCase().trim();
                }
            } catch (e) {
                // Abaikan jika gagal parse JSON
            }
        } else {
            // Jika disimpan sebagai string langsung
            const keyLower = key.toLowerCase();
            if (!data.nama && keyLower.includes('nama') && !apakahHanyaAngka(val)) {
                data.nama = val;
            }
            if (!data.nisn && keyLower.includes('nisn') && apakahHanyaAngka(val)) {
                data.nisn = val;
            }
            if (!data.email && keyLower.includes('email') && val.includes('@')) {
                data.email = val;
            }
        }
    }

    return data;
}

// Eksekusi Pemindaian Data Sesi
const sesi = ambilDataSesi();

// Simpan Kembali Data Terkonfirmasi ke LocalStorage agar Konsisten
if (sesi.nama) localStorage.setItem('infoFun_Nama', sesi.nama);
if (sesi.nisn) localStorage.setItem('infoFun_NISN', sesi.nisn);

// 4. Logika Validasi Akses (Sangat Aman & Konsisten)
const loginUrlLengkap = "https://riski902-alt.github.io/LOGIN-MATERI/";

// Siswa Valid jika: Memiliki Nama ATAU Memiliki NISN
const isValidSiswa = !!(sesi.nama || sesi.nisn);

// Guru Valid jika: Memiliki Email ATAU Role 'guru'
const isValidGuru = !!(sesi.email || sesi.role === 'guru');

// Total Status Login Valid
const isLoginValid = isValidSiswa || isValidGuru;

// Pengalihan Paksa Jika Belum Login
if (!isLoginValid && !window.location.href.includes("LOGIN-MATERI")) {
    alert("Kamu belum login! Silakan login terlebih dahulu untuk mengakses materi.");
    window.location.href = loginUrlLengkap;
}

// 5. Tampilkan Profil pada Header Dashboard setelah DOM Dimuat
document.addEventListener("DOMContentLoaded", () => {
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');

    const dataSesiTerbaru = ambilDataSesi();

    if (userNameDisplay) {
        if (dataSesiTerbaru.role === 'guru' || (dataSesiTerbaru.email && !dataSesiTerbaru.nisn)) {
            const namaGuru = dataSesiTerbaru.nama || "Riski Amalia, S.Pd";
            userNameDisplay.innerText = `[Guru] ${namaGuru}`;
        } else if (dataSesiTerbaru.nama) {
            userNameDisplay.innerText = dataSesiTerbaru.nama;
        } else if (dataSesiTerbaru.nisn) {
            userNameDisplay.innerText = `Siswa (${dataSesiTerbaru.nisn})`;
        } else {
            userNameDisplay.innerText = "Siswa Informatika";
        }
    }

    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.addEventListener('click', () => {
            if (confirm("Apakah Anda yakin ingin keluar dari akun ini?")) {
                localStorage.clear(); // Bersihkan seluruh memori login
                window.location.href = loginUrlLengkap;
            }
        });
    }
});
