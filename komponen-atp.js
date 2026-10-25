// Fungsi Utama untuk Membuka ATP
async function bukaModalATP(idPertemuan) {
    let modalOverlay = document.getElementById('atp-modal-overlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'atp-modal-overlay';
        
        // 1. Styling Overlay: Menggunakan Navy (#233D5B) dengan transparansi 80%
        Object.assign(modalOverlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(35, 61, 91, 0.8)', 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: '9999',
            backdropFilter: 'blur(3px)' // Memberikan efek blur pada latar belakang
        });

        // 2. Styling Modal Box: Latar Putih, garis Soft Green, dan sudut melengkung 16px
        const modalBox = document.createElement('div');
        modalBox.id = 'atp-modal-box';
        Object.assign(modalBox.style, {
            backgroundColor: '#FFFFFF', width: '90%', maxWidth: '600px',
            maxHeight: '80vh', overflowY: 'auto', borderRadius: '16px',
            padding: '30px 24px 24px 24px', position: 'relative',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            border: '2px solid #DDECE3', // Soft green
            color: '#233D5B' // Teks dasar menggunakan Navy
        });

        // 3. Styling Tombol Tutup: Biru Denim, tanpa merah terang
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times; Tutup';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '16px', right: '16px',
            background: '#547DA5', // Biru denim
            color: '#FFFFFF', border: 'none',
            padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
            fontWeight: 'bold', fontSize: '14px',
            boxShadow: '0 4px 6px rgba(84, 125, 165, 0.2)' // Bayangan selaras dengan tombol
        });
        closeBtn.onclick = tutupModalATP;

        const body = document.createElement('div');
        body.id = 'atp-modal-content';
        body.style.marginTop = '25px';
        body.style.lineHeight = '1.6';

        modalBox.appendChild(closeBtn);
        modalBox.appendChild(body);
        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);
    }

    const contentArea = document.getElementById('atp-modal-content');
    const modalOverlay = document.getElementById('atp-modal-overlay');
    
    modalOverlay.style.display = 'flex';
    contentArea.innerHTML = '<p style="text-align:center; color:#547DA5;">Memuat data...</p>';

    try {
        const response = await fetch('atp.json'); 
        if (!response.ok) throw new Error('Gagal memuat file.');
        
        const dataATP = await response.json();

        if (dataATP[idPertemuan] && dataATP[idPertemuan].konten) {
            contentArea.innerHTML = dataATP[idPertemuan].konten;
        } else {
            contentArea.innerHTML = '<p style="color:#233D5B;">Data tidak ditemukan untuk pertemuan ini.</p>';
        }
    } catch (error) {
        contentArea.innerHTML = `<p style="color:#233D5B;">Error: ${error.message}</p>`;
    }
}

function tutupModalATP() {
    const modalOverlay = document.getElementById('atp-modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
    }
}
