// 1. KOMPONEN ATP
export function buatKomponenATP(dataATP) {
    return `
        <div class="komponen-bacaan">
            <h3 style="color: #4A7298; border-bottom: 2px solid #88D4AB; padding-bottom: 10px;">📚 Target Belajar Kita</h3>
            <div style="line-height: 1.8; margin-top: 15px;">
                ${dataATP}
            </div>
        </div>
    `;
}

// 2. KOMPONEN ASESMEN AWAL (Contoh untuk Pilihan Ganda)
export function buatKomponenAsesmenAwal(dataSoalArray) {
    let htmlSoal = `<div class="kuis-container">
                        <h3 style="margin-bottom: 20px;">📝 Asesmen Awal</h3>`;
    
    // Looping (mengulang) pembuatan soal berdasarkan jumlah data di JSON
    dataSoalArray.forEach((soal, index) => {
        htmlSoal += `
            <div class="soal-box" style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #e2e8f0;">
                <p><strong>Soal ${index + 1}:</strong> ${soal.soal}</p>
                <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
                    ${soal.opsi.map((pilihan, i) => `
                        <label>
                            <input type="radio" name="soal_${index}" value="${i}"> ${pilihan}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });

    htmlSoal += `<button id="btn-cek-skor" class="action-button" style="background:#88D4AB; color:#1E3A5F;">CEK SKOR</button>
                 <div id="hasil-skor" style="margin-top:15px; font-weight:bold; font-size:1.2rem;"></div>
                 </div>`;
                 
    return htmlSoal;
}

// 3. KOMPONEN PERTANYAAN ESENSIAL
export function buatKomponenPertanyaanEsensial(pertanyaan) {
    return `
        <div class="komponen-esensial">
            <h3>💡 Pemantik Pikiran</h3>
            <p style="font-size: 1.1rem; font-weight: bold; margin: 15px 0;">${pertanyaan}</p>
            <textarea id="jawaban-esensial" rows="5" placeholder="Ketik pendapatmu di sini..." style="width:100%; padding:15px; border-radius:8px; border:1px solid #ccc;"></textarea>
        </div>
    `;
}

// 4. KOMPONEN EKSPLORASI KONSEP (Menampilkan Slide Presentasi)
export function buatKomponenEksplorasiKonsep(linkSlide) {
    return `
        <div class="komponen-slide">
            <h3 style="margin-bottom: 15px;">🖥️ Eksplorasi Materi</h3>
            <iframe src="${linkSlide}" frameborder="0" width="100%" height="500" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>
        </div>
    `;
}

// 5, 6, 7 (Lanjutkan pola yang sama untuk For Learning, Penerapan, dan As Learning)
// ...