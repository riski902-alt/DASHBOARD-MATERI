// Fungsi Utama untuk Membuka ATP
async function bukaModalATP(idPertemuan) {
    // Memeriksa dan membuat kontainer Modal jika belum ada
    let modalOverlay = document.getElementById('atp-modal-overlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'atp-modal-overlay';
        
        // Styling CSS untuk latar belakang gelap (overlay)
        Object.assign(modalOverlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: '9999'
        });

        // Styling CSS untuk kotak konten (modal box)
        const modalBox = document.createElement('div');
        modalBox.id = 'atp-modal-box';
        Object.assign(modalBox.style, {
            backgroundColor: '#ffffff', width: '90%', maxWidth: '600px',
            maxHeight: '80vh', overflowY: 'auto', borderRadius: '8px',
            padding: '20px', position: 'relative'
        });

        // Tombol Tutup (X)
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times; Tutup';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '15px', right: '20px',
            background: '#ff4d4d', color: 'white', border: 'none',
            padding: '5px 10px', borderRadius: '4px', cursor: 'pointer'
        });
        closeBtn.onclick = tutupModalATP;

        // Area untuk memasukkan teks dari JSON
        const body = document.createElement('div');
        body.id = 'atp-modal-content';
        body.style.marginTop = '20px';

        modalBox.appendChild(closeBtn);
        modalBox.appendChild(body);
        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);
    }

    const contentArea = document.getElementById('atp-modal-content');
    const modalOverlay = document.getElementById('atp-modal-overlay');
    
    // Tampilkan Modal
    modalOverlay.style.display = 'flex';
    contentArea.innerHTML = '<p>Memuat data...</p>';

    try {
        // Mengambil data secara spesifik dari file atp.json
        const response = await fetch('atp.json'); 
        if (!response.ok) throw new Error('Gagal memuat file.');
        
        const dataATP = await response.json();

        // Mengecek apakah idPertemuan ada di dalam atp.json
        if (dataATP[idPertemuan] && dataATP[idPertemuan].konten) {
            // Menampilkan properti konten yang berisi elemen HTML (seperti h3 dan p)
            contentArea.innerHTML = dataATP[idPertemuan].konten;
        } else {
            contentArea.innerHTML = '<p style="color:red;">Data tidak ditemukan untuk pertemuan ini.</p>';
        }
    } catch (error) {
        contentArea.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

// Fungsi untuk Menutup ATP
function tutupModalATP() {
    const modalOverlay = document.getElementById('atp-modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
    }
}
