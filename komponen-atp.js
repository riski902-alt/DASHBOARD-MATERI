// Fungsi Utama untuk Membuka ATP
async function bukaModalATP(idPertemuan) {
    // 1. Buat kontainer Modal jika belum ada
    let modalOverlay = document.getElementById('atp-modal-overlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'atp-modal-overlay';
        // Styling CSS bawaan untuk Overlay (Navy/Denim transparansi)
        Object.assign(modalOverlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(21, 44, 91, 0.7)', // Denim blue transparan
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: '9999', opacity: '0', transition: 'opacity 0.3s ease',
            backdropFilter: 'blur(4px)'
        });

        // Buat kotak Modal (Kartu)
        const modalBox = document.createElement('div');
        modalBox.id = 'atp-modal-box';
        Object.assign(modalBox.style, {
            backgroundColor: '#ffffff', width: '90%', maxWidth: '600px',
            maxHeight: '85vh', overflowY: 'auto', borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transform: 'translateY(20px)',
            transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column'
        });

        // Header Modal
        const header = document.createElement('div');
        Object.assign(header.style, {
            backgroundColor: '#152C5B', // Navy / Denim Blue
            color: '#ffffff', padding: '20px', borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px', display: 'flex', 
            justifyContent: 'space-between', alignItems: 'center'
        });
        header.innerHTML = `
            <h2 style="margin: 0; font-size: 1.2rem; display: flex; alignItems: center; gap: 10px;">
                <span style="color: #88D4AB;">■</span> Alur Tujuan Pembelajaran
            </h2>
            <button onclick="tutupModalATP()" style="background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; line-height: 1;">&times;</button>
        `;

        // Body Modal (Tempat konten JSON)
        const body = document.createElement('div');
        body.id = 'atp-modal-content';
        Object.assign(body.style, {
            padding: '25px', color: '#333', lineHeight: '1.6', fontSize: '0.95rem'
        });

        modalBox.appendChild(header);
        modalBox.appendChild(body);
        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);

        // Tutup modal jika area luar diklik
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) tutupModalATP();
        });
    }

    const contentArea = document.getElementById('atp-modal-content');
    const modalBox = document.getElementById('atp-modal-box');
    
    // Tampilkan Modal dengan animasi Fade-In
    modalOverlay.style.display = 'flex';
    // Timeout kecil untuk trigger transisi CSS
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalBox.style.transform = 'translateY(0)';
    }, 10);

    // State Loading
    contentArea.innerHTML = `<div style="text-align: center; color: #152C5B; padding: 20px;">Memuat data ATP...</div>`;

    // 2. Proses Ambil Data JSON
    try {
        const response = await fetch('atp.json');
        if (!response.ok) throw new Error('Gagal mengakses data jaringan.');
        
        const dataATP = await response.json();

        // 3. Tampilkan Data atau Tampilkan Error jika ID tidak cocok
        if (dataATP[idPertemuan] && dataATP[idPertemuan].konten) {
            // Render HTML dari JSON
            contentArea.innerHTML = `
                <div class="atp-styled-content">
                    ${dataATP[idPertemuan].konten}
                </div>
            `;
            
            // Tambahkan styling khusus untuk elemen h3 (Judul Bagian) agar serasi
            const headers = contentArea.querySelectorAll('h3');
            headers.forEach(h3 => {
                Object.assign(h3.style, {
                    color: '#152C5B', fontSize: '1.1rem', marginTop: '15px', 
                    marginBottom: '5px', borderBottom: '2px solid #88D4AB', paddingBottom: '5px'
                });
            });
            const paragraphs = contentArea.querySelectorAll('p');
            paragraphs.forEach(p => {
                p.style.marginBottom = '15px';
            });

        } else {
            contentArea.innerHTML = `<div style="text-align: center; color: #e74c3c; padding: 20px;">Data ATP untuk pertemuan ini belum tersedia.</div>`;
        }
    } catch (error) {
        contentArea.innerHTML = `<div style="text-align: center; color: #e74c3c; padding: 20px;">Terjadi kesalahan sistem: ${error.message}</div>`;
        console.error("ATP Fetch Error:", error);
    }
}

// Fungsi Utama untuk Menutup ATP
function tutupModalATP() {
    const modalOverlay = document.getElementById('atp-modal-overlay');
    const modalBox = document.getElementById('atp-modal-box');
    if (modalOverlay) {
        modalOverlay.style.opacity = '0';
        modalBox.style.transform = 'translateY(20px)';
        setTimeout(() => {
            modalOverlay.style.display = 'none';
        }, 300); // Sesuaikan dengan durasi transisi
    }
}
