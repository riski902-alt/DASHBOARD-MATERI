document.addEventListener("DOMContentLoaded", () => {
    // 1. Urutan Menu
    const menuOrder = [
        "atp", "asesmen-awal", "pertanyaan-esensial", 
        "eksplorasi-konsep", "for-learning", "penerapan-konsep", "as-learning"
    ];

    // 2. Simulasi Data Progres Siswa (Nantinya diganti dengan data dari Firebase)
    // Status bisa berupa: 'locked', 'available', 'active', 'completed'
    let studentProgress = {
        "atp": "available", // Default menu pertama terbuka
        "asesmen-awal": "locked",
        "pertanyaan-esensial": "locked",
        "eksplorasi-konsep": "locked",
        "for-learning": "locked",
        "penerapan-konsep": "locked",
        "as-learning": "locked"
    };

    let currentActiveMenu = null;

    // 3. Fungsi Inisialisasi UI Menu
    function renderMenuUI() {
        menuOrder.forEach(menuId => {
            const btn = document.getElementById(`btn-${menuId}`);
            const statusIcon = btn.querySelector('.menu-status');
            const state = studentProgress[menuId];

            // Reset kelas
            btn.className = 'menu-btn';
            
            if (state === 'locked') {
                btn.classList.add('locked');
                btn.disabled = true;
                statusIcon.innerHTML = '<i class="ph ph-lock-key"></i>';
            } else if (state === 'available') {
                btn.disabled = false;
                statusIcon.innerHTML = '';
            } else if (state === 'completed') {
                btn.classList.add('completed');
                btn.disabled = false;
                statusIcon.innerHTML = '<i class="ph ph-check-circle weight-bold"></i>';
            }

            if (menuId === currentActiveMenu) {
                btn.classList.add('active');
            }
        });
    }

    // 4. Fungsi Menangani Klik Menu
    window.openMenu = function(menuId) {
        if (studentProgress[menuId] === 'locked') {
            alert("Selesaikan menu sebelumnya terlebih dahulu untuk membuka tahap pembelajaran berikutnya.");
            return;
        }

        currentActiveMenu = menuId;
        renderMenuUI();
        loadMenuContent(menuId);
    };

    // Mendaftarkan Event Listener ke Tombol
    menuOrder.forEach(menuId => {
        const btn = document.getElementById(`btn-${menuId}`);
        btn.addEventListener('click', () => openMenu(menuId));
    });

    // 5. Fungsi Memuat Konten JSON (Kerangka Kerja)
    async function loadMenuContent(menuId) {
        const contentArea = document.getElementById('dynamic-content-area');
        contentArea.innerHTML = `<p>Memuat data <b>${menuId}.json</b>...</p><div class="loader"></div>`;

        try {
            // CONTOH FETCH JSON:
            // const response = await fetch(`./data/${menuId}.json`);
            // if (!response.ok) throw new Error("Gagal memuat JSON");
            // const data = await response.json();
            
            // SIMULASI KONTEN SEMENTARA:
            setTimeout(() => {
                contentArea.innerHTML = `
                    <h3>Area Konten: ${menuId.toUpperCase()}</h3>
                    <p>Konten JSON akan di-render di sini.</p>
                    <button class="action-btn" onclick="completeCurrentMenu('${menuId}')">Simulasikan Selesai & Lanjut</button>
                `;
            }, 500); // Simulasi delay jaringan

        } catch (error) {
            contentArea.innerHTML = `<p style="color: red;">Error: Konten tidak dapat dimuat. Coba lagi nanti.</p>`;
        }
    }

    // 6. Fungsi Menyelesaikan Menu & Membuka Menu Berikutnya
    window.completeCurrentMenu = function(menuId) {
        // Tandai selesai
        studentProgress[menuId] = 'completed';

        // Cari menu berikutnya untuk dibuka
        const currentIndex = menuOrder.indexOf(menuId);
        if (currentIndex < menuOrder.length - 1) {
            const nextMenuId = menuOrder[currentIndex + 1];
            
            // Hanya buka jika statusnya masih terkunci (jangan ubah jika sudah completed)
            if (studentProgress[nextMenuId] === 'locked') {
                studentProgress[nextMenuId] = 'available';
            }
            
            // Simpan ke Firebase di sini:
            // saveProgressToFirebase(studentProgress);

            // Langsung buka menu berikutnya secara otomatis
            openMenu(nextMenuId);
        } else {
            // Jika menu terakhir (As Learning) selesai
            renderMenuUI();
            document.getElementById('dynamic-content-area').innerHTML = `
                <div class="success-message">
                    <h3>Hebat!</h3>
                    <p>Kamu telah menyelesaikan seluruh tahapan pembelajaran INFORMATIKA FUN!. Teruslah berpikir kritis, berani mencoba, dan berkarya dengan teknologi secara bijak.</p>
                </div>
            `;
        }
    };

    // Jalankan render awal
    renderMenuUI();
});