// Nama file: komponen-atp.js

/**
 * Fungsi ini mengambil data HTML mentah dan mengubahnya menjadi desain ATP
 * dengan gaya Modern EdTech, Premium Bento UI, dan Micro-interactions.
 */
function buatDesainATP(rawHTML) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawHTML;
    
    const bagianATP = [];
    let bagianSaatIni = null;

    // Memisahkan konten berdasarkan heading (H3)
    Array.from(tempDiv.children).forEach(el => {
        if (el.tagName === 'H3') {
            if (bagianSaatIni) bagianATP.push(bagianSaatIni);
            bagianSaatIni = { judul: el.innerText.replace(':', '').trim(), konten: '' };
        } else if (bagianSaatIni && (el.tagName === 'P' || el.tagName === 'UL' || el.tagName === 'OL')) {
            bagianSaatIni.konten += el.outerHTML;
        }
    });
    if (bagianSaatIni) bagianATP.push(bagianSaatIni);

    // 1. BANNER HEADER - Gaya Modern dengan Animasi Masuk
    const bannerHTML = `
        <div class="atp-banner atp-animate-masuk" style="animation-delay: 0.1s;">
            <div class="atp-banner-bg"></div>
            <i class="ph-duotone ph-rocket-launch atp-banner-icon"></i>
            <div class="atp-banner-text">
                <h2>ALUR TUJUAN PEMBELAJARAN</h2>
                <p>Ini adalah peta petualangan belajarmu. Mari capai targetnya bersama-sama!</p>
            </div>
            <i class="ph-duotone ph-compass atp-banner-bg-icon"></i>
        </div>
    `;

    // 2. STYLING CSS TERISOLASI KHUSUS UNTUK HALAMAN ATP
    let hasilDesain = `
    <style>
        /* Animasi Kemunculan Konten (Soft Motion) */
        @keyframes fadeInUpSoft {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        .atp-animate-masuk {
            opacity: 0;
            animation: fadeInUpSoft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Banner Utama */
        .atp-banner {
            position: relative;
            background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
            border-radius: 20px;
            padding: 2rem;
            color: white;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(30, 58, 138, 0.15);
            border: 1px solid rgba(255,255,255,0.1);
        }
        .atp-banner-bg {
            position: absolute; inset: 0;
            background: radial-gradient(circle at top right, rgba(56, 189, 248, 0.2), transparent 50%);
        }
        .atp-banner-icon { font-size: 3.5rem; color: #38bdf8; z-index: 1; }
        .atp-banner-text { z-index: 1; }
        .atp-banner-text h2 { margin: 0 0 0.5rem 0; font-size: 1.6rem; font-weight: 800; letter-spacing: 0.5px; }
        .atp-banner-text p { margin: 0; font-size: 1.05rem; color: #e2e8f0; line-height: 1.5; }
        .atp-banner-bg-icon { position: absolute; right: -20px; bottom: -30px; font-size: 12rem; color: rgba(255,255,255,0.03); z-index: 0; transition: transform 3s ease-out; }
        .atp-banner:hover .atp-banner-bg-icon { transform: rotate(15deg) scale(1.1); }

        /* Grid Bento UI */
        .atp-grid-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            width: 100%;
        }
        
        /* Kartu Premium Bento */
        .atp-box {
            background: #ffffff;
            border-radius: 20px;
            padding: 1.75rem;
            display: flex;
            flex-direction: column;
            border: 1px solid #f1f5f9;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
        }

        /* Micro-interactions pada Kartu */
        .atp-box:hover {
            transform: translateY(-8px);
            box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
            border-color: #e2e8f0;
        }
        .atp-box:active {
            transform: translateY(-2px) scale(0.98);
        }

        /* Ikon dalam Kartu */
        .atp-box-icon-wrapper {
            width: 56px; height: 56px;
            border-radius: 16px;
            display: flex; align-items: center; justify-content: center;
            font-size: 2.2rem;
            margin-bottom: 1.25rem;
            transition: transform 0.4s ease;
        }
        .atp-box:hover .atp-box-icon-wrapper {
            transform: scale(1.1) rotate(5deg);
        }

        /* Tipografi Kartu */
        .atp-box h4 { 
            margin: 0 0 1rem 0; 
            font-size: 1.1rem; 
            font-weight: 800; 
            text-transform: uppercase; 
            letter-spacing: 0.5px;
        }
        .atp-box-content { 
            font-size: 0.95rem; 
            line-height: 1.7; 
            color: #475569; /* Slate 600 untuk keterbacaan yang nyaman */
            flex-grow: 1; 
        }
        .atp-box-content p { margin-top: 0; margin-bottom: 12px; }
        .atp-box-content ul, .atp-box-content ol { margin-top: 0; padding-left: 20px; }
        .atp-box-content li { margin-bottom: 8px; }

        /* Garis Dekoratif Atas */
        .atp-box::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 4px;
            background: var(--card-color, #cbd5e1);
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }
        .atp-box:hover::before { opacity: 1; }

        /* Responsivitas */
        @media (max-width: 1200px) { .atp-grid-container { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { 
            .atp-grid-container { grid-template-columns: 1fr; } 
            .atp-banner { padding: 1.5rem; flex-direction: column; text-align: center; gap: 1rem; }
            .atp-banner-bg-icon { display: none; }
        }
    </style>
    ${bannerHTML}
    <div class="atp-grid-container">`;

    // 3. MERENDER KARTU DENGAN TEMA WARNA YANG HARMONIS
    let delayAnimasi = 0.2;

    bagianATP.forEach(bagian => {
        let judulKecil = bagian.judul.toLowerCase();
        let tema = { ikon: 'ph-star', warna: '#64748b', bg: '#f1f5f9' }; // Default Slate

        // Mapping Warna sesuai palet: Denim, Green, Cyan, Blue
        if (judulKecil.includes('elemen')) { 
            tema = { ikon: 'ph-puzzle-piece', warna: '#2563eb', bg: '#eff6ff' }; // Denim Blue
        } else if (judulKecil.includes('capaian')) { 
            tema = { ikon: 'ph-flag-checkered', warna: '#10b981', bg: '#ecfdf5' }; // Soft Green
        } else if (judulKecil.includes('tujuan')) { 
            tema = { ikon: 'ph-compass', warna: '#0ea5e9', bg: '#f0f9ff' }; // Cyan/Light Blue
        } else if (judulKecil.includes('topik')) { 
            tema = { ikon: 'ph-book-open-text', warna: '#1e3a8a', bg: '#e0e7ff' }; // Navy/Indigo
        }

        hasilDesain += `
            <div class="atp-box atp-animate-masuk" style="animation-delay: ${delayAnimasi}s; --card-color: ${tema.warna};">
                <div class="atp-box-icon-wrapper" style="background: ${tema.bg}; color: ${tema.warna};">
                    <i class="ph-duotone ${tema.ikon}"></i>
                </div>
                <h4 style="color: #0f172a;">${bagian.judul}</h4>
                <div class="atp-box-content">${bagian.konten}</div>
            </div>
        `;
        
        delayAnimasi += 0.1; // Efek muncul berurutan (Staggered animation)
    });

    hasilDesain += `</div>`;
    return hasilDesain;
}
