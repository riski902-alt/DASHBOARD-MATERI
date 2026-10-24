document.addEventListener("DOMContentLoaded", () => {
    // 1. Urutan Menu Pembelajaran
    const menuOrder = [
        "atp", "asesmen-awal", "pertanyaan-esensial", 
        "eksplorasi-konsep", "for-learning", "penerapan-konsep", "as-learning"
    ];

    // 2. Mengambil Identitas Siswa dari Auth (cek-login.js) & ID Pertemuan dari URL
    const currentNISN = localStorage.getItem('infoFun_NISN') || 'guest';
    const urlParams = new URLSearchParams(window.location.search);
    const meetingId = urlParams.get('id') || 'default_meeting';
    
    // Kunci penyimpanan unik per siswa dan per pertemuan
    const storageKey = `infoFun_Progres_${currentNISN}_${meetingId}`;

    // Status Default jika Siswa Baru Pertama Kali Membuka Materi Ini
    const defaultProgress = {
        "atp": "available",
        "asesmen-awal": "locked",
        "pertanyaan-esensial": "locked",
        "eksplorasi-konsep": "locked",
        "for-learning": "locked",
        "penerapan-konsep": "locked",
        "as-learning": "locked"
    };

    // 3. Fungsi Memuat Data Progres dari LocalStorage
    function loadStudentProgress() {
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error("Gagal membaca data progres tersimpan, menggunakan data default.", e);
            }
        }
        return { ...defaultProgress };
    }

    // 4. Fungsi Menyimpan Data Progres ke LocalStorage
    function saveStudentProgress() {
        localStorage.setItem(storageKey, JSON.stringify(studentProgress));
    }

    // Inisialisasi variabel progres dari penyimpanan permanen
    let studentProgress = loadStudentProgress();
    let currentActiveMenu = null;

    // 5. Fungsi Inisialisasi UI Menu (Memperbarui Tampilan Tombol)
    function renderMenuUI() {
        menuOrder.forEach(menuId => {
            const btn = document.getElementById(`btn-${menuId}`);
            if (!btn) return;
            
            const statusIcon = btn.querySelector('.menu-status');
            const state = studentProgress[menuId];

            // Reset kelas CSS tombol
            btn.className = 'menu-btn';
            
            if (state === 'locked') {
                btn.classList.add('locked');
                btn.disabled = true;
                if (statusIcon) statusIcon.innerHTML = '<i class="ph ph-lock-key"></i>';
            } else if (state === 'available') {
                btn.disabled = false;
                if (statusIcon) statusIcon.innerHTML = '';
            } else if (state === 'completed') {
                btn.classList.add('completed');
                btn.disabled = false;
                if (statusIcon) statusIcon.innerHTML = '<i class="ph ph-check-circle weight-bold"></i>';
            }

            if (menuId === currentActiveMenu) {
                btn.classList.add('active');
            }
        });
    }

    // 6. Fungsi Menangani Klik Menu
    window.openMenu = function(menuId) {
        if (studentProgress[menuId] === 'locked') {
            alert("Selesaikan menu sebelumnya terlebih dahulu untuk membuka tahap pembelajaran berikutnya.");
            return;
        }

        currentActiveMenu = menuId;
        renderMenuUI();
        loadMenuContent(menuId);
    };

    // Mendaftarkan Event Listener ke Seluruh Tombol Menu
    menuOrder.forEach(menuId => {
        const btn = document.getElementById(`btn-${menuId}`);
        if (btn) {
            btn.addEventListener('click', () => openMenu(menuId));
        }
    });

    // 7. Fungsi Memuat Konten
    async function loadMenuContent(menuId) {
        const contentArea = document.getElementById('dynamic-content-area');
        if (!contentArea) return;

        contentArea.innerHTML = `<p>Memuat data <b>${menuId}</b>...</p><div class="loader"></div>`;

        try {
            setTimeout(() => {
                contentArea.innerHTML = `
                    <h3>Area Konten: ${menuId.toUpperCase()}</h3>
                    <p>Konten untuk tahap ini telah dimuat.</p>
                    <button class="action-btn" onclick="completeCurrentMenu('${menuId}')">Simulasikan Selesai & Lanjut</button>
                `;
            }, 300);
        } catch (error) {
            contentArea.innerHTML = `<p style="color: red;">Error: Konten tidak dapat dimuat. Coba lagi nanti.</p>`;
        }
    }

    // 8. Fungsi Menyelesaikan Menu & Membuka Menu Berikutnya (Dengan Autosave)
    window.completeCurrentMenu = function(menuId) {
        // Tandai menu saat ini selesai
        studentProgress[menuId] = 'completed';

        // Cari menu berikutnya untuk dibuka kuncinya
        const currentIndex = menuOrder.indexOf(menuId);
        if (currentIndex < menuOrder.length - 1) {
            const nextMenuId = menuOrder[currentIndex + 1];
            
            if (studentProgress[nextMenuId] === 'locked') {
                studentProgress[nextMenuId] = 'available';
            }
            
            // Simpan perubahan ke LocalStorage
            saveStudentProgress();

            // Pindah langsung ke menu berikutnya
            openMenu(nextMenuId);
        } else {
            // Jika menu terakhir (As Learning) selesai
            saveStudentProgress();
            renderMenuUI();
            
            const contentArea = document.getElementById('dynamic-content-area');
            if (contentArea) {
                contentArea.innerHTML = `
                    <div class="success-message">
                        <h3>Hebat!</h3>
                        <p>Kamu telah menyelesaikan seluruh tahapan pembelajaran INFORMATIKA FUN!. Teruslah berpikir kritis, berani mencoba, dan berkarya dengan teknologi secara bijak.</p>
                    </div>
                `;
            }
        }
    };

    // Jalankan render tampilan awal saat halaman dimuat
    renderMenuUI();
});
