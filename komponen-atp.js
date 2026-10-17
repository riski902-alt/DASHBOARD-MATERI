// Nama file: komponen-atp.js

/**
 * Fungsi ini mengambil data HTML mentah dan mengubahnya menjadi 4 kotak utama ATP.
 * Layout dioptimalkan untuk satu layar tanpa scroll vertikal berlebih pada desktop.
 * @param {string} rawHTML - Teks HTML mentah dari database JSON
 * @returns {string} - Layout grid 4 kolom dengan animasi dan border tebal
 */
function buatDesainATP(rawHTML) {
    // Membongkar data HTML mentah
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawHTML;
    
    // Variabel penampung untuk mengelompokkan isi berdasarkan 4 judul utama
    const bagianATP = [];
    let bagianSaatIni = null;

    // Mengelompokkan setiap paragraf dan list ke dalam kotak yang sesuai
    Array.from(tempDiv.children).forEach(el => {
        if (el.tagName === 'H3') {
            if (bagianSaatIni) bagianATP.push(bagianSaatIni);
            bagianSaatIni = {
                judul: el.innerText.replace(':', '').trim(),
                konten: ''
            };
        } else if (bagianSaatIni && (el.tagName === 'P' || el.tagName === 'UL' || el.tagName === 'OL')) {
            // Memasukkan paragraf atau daftar ke dalam kotak saat ini
            bagianSaatIni.konten += el.outerHTML;
        }
    });
    if (bagianSaatIni) bagianATP.push(bagianSaatIni);

    // CSS khusus untuk mendesain 4 kotak sejajar, border tebal, dan animasi ikon
    let hasilDesain = `
    <style>
        .atp-grid-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            width: 100%;
            /* Tinggi diatur agar muat 1 layar laptop, disesuaikan dengan header website */
            height: calc(100vh - 240px);
            min-height: 400px; 
            margin-top: 10px;
        }
        
        .atp-box {
            background: #ffffff;
            border-radius: 16px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            /* Scroll internal agar layout tidak memanjang ke bawah layar */
            overflow-y: auto; 
            overflow-x: hidden;
        }

        /* Hover efek pada kotak */
        .atp-box:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.12);
        }
        
        /* Mengubah warna border sedikit saat disentuh/kursor diarahkan */
        .atp-box:hover, .atp-box:active {
            filter: brightness(0.98);
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

        /* Animasi interaktif ikon: Membesar dan sedikit berputar saat diarahkan/disentuh */
        .atp-box:hover .atp-box-icon, .atp-box:active .atp-box-icon {
            transform: scale(1.15) rotate(6deg) translateY(-2px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .atp-box h4 {
            margin: 0 0 12px 0;
            font-size: 1.15rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            line-height: 1.3;
        }

        .atp-box-content {
            font-size: 0.95rem;
            line-height: 1.6;
            color: #444;
            flex-grow: 1;
        }

        .atp-box-content p {
            margin-top: 0;
            margin-bottom: 10px;
        }

        .atp-box-content ul, .atp-box-content ol {
            margin-top: 0;
            padding-left: 20px;
        }

        /* Desain scrollbar khusus untuk dalam kotak agar rapi */
        .atp-box::-webkit-scrollbar {
            width: 6px;
        }
        .atp-box::-webkit-scrollbar-thumb {
            background-color: #d1d5db;
            border-radius: 10px;
        }
        .atp-box:hover::-webkit-scrollbar-thumb {
            background-color: #9ca3af;
        }

        /* Responsif untuk layar lebih kecil */
        @media (max-width: 1024px) {
            .atp-grid-container {
                grid-template-columns: repeat(2, 1fr);
                height: auto;
            }
            .atp-box {
                min-height: 300px;
            }
        }
        @media (max-width: 640px) {
            .atp-grid-container {
                grid-template-columns: 1fr;
            }
            .atp-box {
                min-height: auto;
            }
        }
    </style>
    <div class="atp-grid-container">`;

    // Merender setiap kotak dari data yang dikelompokkan
    bagianATP.forEach(bagian => {
        let judulKecil = bagian.judul.toLowerCase();
        
        // Konfigurasi tema: Ikon spesifik dan 4 warna identitas INFORMATIKA FUN
        let tema = { ikon: 'ph-star', warna: '#6b7280' };

        if (judulKecil.includes('elemen')) { 
            tema = { ikon: 'ph-puzzle-piece', warna: '#1e3a8a' }; // Navy
        } else if (judulKecil.includes('capaian')) { 
            tema = { ikon: 'ph-flag-checkered', warna: '#10b981' }; // Hijau Lembut
        } else if (judulKecil.includes('tujuan')) { 
            tema = { ikon: 'ph-compass', warna: '#0ea5e9' }; // Cyan Aksen
        } else if (judulKecil.includes('topik')) { 
            tema = { ikon: 'ph-book-open-text', warna: '#2563eb' }; // Denim Blue
        }

        // Menerapkan garis pinggir 4 piksel sesuai warna tema masing-masing kotak
        hasilDesain += `
            <div class="atp-box" style="border: 4px solid ${tema.warna};">
                <div class="atp-box-icon" style="background: ${tema.warna}15; color: ${tema.warna};">
                    <i class="ph-duotone ${tema.ikon}"></i>
                </div>
                <h4 style="color: ${tema.warna}">${bagian.judul}</h4>
                <div class="atp-box-content">${bagian.konten}</div>
            </div>
        `;
    });

    hasilDesain += `</div>`;

    // Mengembalikan langsung grid 4 kotak (Bagian atas dan perjalanan belajar sudah dihapus)
    return hasilDesain;
}
