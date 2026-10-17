// Nama file: komponen-atp.js

/**
 * Fungsi ini mengambil data HTML mentah dan mengubahnya menjadi desain ATP
 * Lengkap dengan Banner Header dan 4 kotak utama dengan garis berwarna menarik.
 */
function buatDesainATP(rawHTML) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawHTML;
    
    const bagianATP = [];
    let bagianSaatIni = null;

    Array.from(tempDiv.children).forEach(el => {
        if (el.tagName === 'H3') {
            if (bagianSaatIni) bagianATP.push(bagianSaatIni);
            bagianSaatIni = { judul: el.innerText.replace(':', '').trim(), konten: '' };
        } else if (bagianSaatIni && (el.tagName === 'P' || el.tagName === 'UL' || el.tagName === 'OL')) {
            bagianSaatIni.konten += el.outerHTML;
        }
    });
    if (bagianSaatIni) bagianATP.push(bagianSaatIni);

    // 1. MEMBUAT BANNER HEADER (MENGADAKAN GAMBAR 1)
    const bannerHTML = `
        <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); border-radius: 16px; padding: 1.5rem 2rem; color: white; display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem; position: relative; overflow: hidden; box-shadow: 0 8px 16px rgba(37, 99, 235, 0.2);">
            <i class="ph-duotone ph-rocket-launch" style="font-size: 3.5rem; color: #38bdf8; z-index: 1;"></i>
            <div style="z-index: 1;">
                <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; font-weight: 800; letter-spacing: 0.5px;">ALUR TUJUAN PEMBELAJARAN</h2>
                <p style="margin: 0; font-size: 1rem; color: #e0f2fe;">Ini adalah peta petualangan belajarmu. Mari kita capai targetnya bersama-sama!</p>
            </div>
            <i class="ph-duotone ph-compass" style="position: absolute; right: -20px; bottom: -30px; font-size: 10rem; color: rgba(255,255,255,0.05); z-index: 0;"></i>
        </div>
    `;

    // 2. CSS UNTUK 4 KOTAK
    let hasilDesain = `
    <style>
        .atp-grid-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            width: 100%;
            height: calc(100vh - 350px);
            min-height: 400px; 
        }
        
        .atp-box {
            background: #ffffff;
            border-radius: 16px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow-y: auto; 
            overflow-x: hidden;
        }

        .atp-box:hover {
            transform: translateY(-6px);
        }

        .atp-box-icon {
            width: 64px;
            height: 64px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            transition: transform 0.35s ease, box-shadow 0.35s ease;
            cursor: default;
        }

        .atp-box:hover .atp-box-icon {
            transform: scale(1.15) rotate(6deg) translateY(-2px);
        }

        .atp-box h4 { margin: 0 0 12px 0; font-size: 1.15rem; font-weight: 800; text-transform: uppercase; line-height: 1.3; }
        .atp-box-content { font-size: 0.95rem; line-height: 1.6; color: #444; flex-grow: 1; }
        .atp-box-content p { margin-top: 0; margin-bottom: 10px; }
        .atp-box-content ul, .atp-box-content ol { margin-top: 0; padding-left: 20px; }
        
        .atp-box::-webkit-scrollbar { width: 6px; }
        .atp-box::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 10px; }

        @media (max-width: 1024px) { .atp-grid-container { grid-template-columns: repeat(2, 1fr); height: auto; } }
        @media (max-width: 640px) { .atp-grid-container { grid-template-columns: 1fr; } }
    </style>
    ${bannerHTML}
    <div class="atp-grid-container">`;

    // 3. MERENDER 4 KOTAK DENGAN BORDER MENARIK
    bagianATP.forEach(bagian => {
        let judulKecil = bagian.judul.toLowerCase();
        let tema = { ikon: 'ph-star', warna: '#6b7280' };

        if (judulKecil.includes('elemen')) { tema = { ikon: 'ph-puzzle-piece', warna: '#1e3a8a' }; } 
        else if (judulKecil.includes('capaian')) { tema = { ikon: 'ph-flag-checkered', warna: '#10b981' }; } 
        else if (judulKecil.includes('tujuan')) { tema = { ikon: 'ph-compass', warna: '#0ea5e9' }; } 
        else if (judulKecil.includes('topik')) { tema = { ikon: 'ph-book-open-text', warna: '#2563eb' }; }

        // Menerapkan garis pinggir 3px dan bayangan kotak yang menyala sesuai warna tema
        hasilDesain += `
            <div class="atp-box" style="border: 3px solid ${tema.warna}; box-shadow: 0 6px 16px ${tema.warna}30;">
                <div class="atp-box-icon" style="background: ${tema.warna}15; color: ${tema.warna};">
                    <i class="ph-duotone ${tema.ikon}"></i>
                </div>
                <h4 style="color: ${tema.warna}">${bagian.judul}</h4>
                <div class="atp-box-content">${bagian.konten}</div>
            </div>
        `;
    });

    hasilDesain += `</div>`;
    return hasilDesain;
}
