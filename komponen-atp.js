// Nama file: komponen-atp.js

/**
 * Fungsi ini bertugas mengubah data HTML biasa menjadi tampilan Bento Cards ATP.
 * @param {string} rawHTML - Teks HTML mentah dari database JSON
 * @returns {string} - Kumpulan elemen HTML yang sudah didesain rapi
 */
function buatDesainATP(rawHTML) {
    // A. Buat Header
    const headerHTML = `
        <div class="atp-header">
            <i class="ph-duotone ph-rocket-launch atp-header-icon"></i>
            <div class="atp-header-text">
                <h2>ALUR TUJUAN PEMBELAJARAN</h2>
                <p>Ini adalah peta petualangan belajarmu. Mari kita capai targetnya bersama-sama!</p>
            </div>
            <i class="ph-duotone ph-compass atp-header-deco"></i>
        </div>
    `;

    // B. Parsing (Membongkar) Teks JSON untuk dijadikan Kartu Bento Grid
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawHTML;
    let bentoCards = '<div class="atp-bento">';
    let currentTitle = '';
    let cardTheme = { icon: 'ph-target', color: 'var(--denim-blue)' };

    Array.from(tempDiv.children).forEach(el => {
        if (el.tagName === 'H3') {
            currentTitle = el.innerText.replace(':', '').trim();
            // Menentukan ikon dan warna berdasarkan judul otomatis
            if (currentTitle.toLowerCase().includes('elemen')) { 
                cardTheme = { icon: 'ph-puzzle-piece', color: 'var(--cyan-accent)' }; 
            } else if (currentTitle.toLowerCase().includes('capaian')) { 
                cardTheme = { icon: 'ph-flag-checkered', color: 'var(--status-green)' }; 
            } else if (currentTitle.toLowerCase().includes('tujuan')) { 
                cardTheme = { icon: 'ph-crosshair', color: '#f59e0b' }; 
            } else if (currentTitle.toLowerCase().includes('topik')) { 
                cardTheme = { icon: 'ph-book-open-text', color: 'var(--deep-navy)' }; 
            } else {
                cardTheme = { icon: 'ph-star', color: 'var(--soft-denim)' };
            }
        } else if (el.tagName === 'P') {
            if(el.innerText.trim() !== "") {
                bentoCards += `
                    <div class="atp-card">
                        <div class="atp-card-icon-wrapper" style="background: ${cardTheme.color}20; color: ${cardTheme.color};">
                            <i class="ph-duotone ${cardTheme.icon}"></i>
                        </div>
                        <h4 style="color: ${cardTheme.color}">${currentTitle}</h4>
                        <p>${el.innerHTML}</p>
                    </div>
                `;
            }
        }
    });
    bentoCards += '</div>';

    // C. Visualisasi Perjalanan Belajar
    const journeyHTML = `
        <div class="atp-journey" style="margin-top: 24px;">
            <h3>Visualisasi Perjalanan Belajarmu</h3>
            <div class="atp-journey-steps">
                <div class="atp-journey-line"></div>
                <div class="atp-step"><div class="atp-step-icon"><i class="ph-bold ph-target"></i></div><span>Pahami Tujuan</span></div>
                <div class="atp-step"><div class="atp-step-icon"><i class="ph-bold ph-book-open"></i></div><span>Ikuti Pembelajaran</span></div>
                <div class="atp-step"><div class="atp-step-icon"><i class="ph-bold ph-wrench"></i></div><span>Praktikkan Trik</span></div>
                <div class="atp-step"><div class="atp-step-icon"><i class="ph-bold ph-brain"></i></div><span>Refleksikan Hasil</span></div>
            </div>
        </div>
    `;

    // D. Panel Motivasi
    const motivationHTML = `
        <div class="atp-motivation" style="margin-top: 24px;">
            <i class="ph-duotone ph-sparkle"></i>
            <div>
                <h4>Siap Memulai Petualangan Informatika?</h4>
                <p>Petualangan seru menantimu. Pastikan kamu sudah membaca peta di atas ya!</p>
            </div>
        </div>
    `;

    // Menggabungkan semua dan mengembalikannya sebagai satu kesatuan HTML
    return `<div class="atp-wrapper">${headerHTML}${bentoCards}${journeyHTML}${motivationHTML}</div>`;
}