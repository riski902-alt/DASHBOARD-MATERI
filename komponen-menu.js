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

// 2. KOMPONEN ASESMEN AWAL (Menggunakan Iframe)
export function buatKomponenAsesmenAwal(urlHalaman) {
    // Parameter urlHalaman akan berisi teks seperti "materi/kelas7/.../p1-asesmen.html"
    let htmlSoal = `
        <div class="kuis-container">
            <h3 style="margin-bottom: 20px;">📝 Asesmen Awal</h3>
            <!-- Menggunakan iframe untuk memuat file HTML dari dalam folder -->
            <iframe src="${urlHalaman}" width="100%" height="500px" style="border: 1px solid #e2e8f0; border-radius: 8px;"></iframe>
        </div>
    `;
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

// 4. KOMPONEN EKSPLORASI KONSEP
export function buatKomponenEksplorasiKonsep(linkSlide) {
    return `
        <div class="komponen-slide">
            <h3 style="margin-bottom: 15px;">🖥️ Eksplorasi Materi</h3>
            <iframe src="${linkSlide}" frameborder="0" width="100%" height="500" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>
        </div>
    `;
}

// 5. KOMPONEN FOR LEARNING (Kuis Formatif)
export function buatKomponenForLearning(dataSoalArray) {
    let htmlSoal = `<div class="kuis-container">
                        <h3 style="margin-bottom: 20px;">🎯 Kuis Formatif (For Learning)</h3>`;
    
    dataSoalArray.forEach((soal, index) => {
        htmlSoal += `
            <div class="soal-box" style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #e2e8f0;">
                <p><strong>Soal ${index + 1}:</strong> ${soal.soal}</p>
                <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
                    ${soal.opsi.map((pilihan, i) => `
                        <label>
                            <input type="radio" name="soal_for_${index}" value="${i}"> ${pilihan}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });

    htmlSoal += `<button id="btn-cek-skor-for" class="action-button" style="background:#88D4AB; color:#1E3A5F;">CEK SKOR & PEMBAHASAN</button>
                 <div id="hasil-skor-for" style="margin-top:15px; font-weight:bold; font-size:1.2rem;"></div>
                 </div>`;
                 
    return htmlSoal;
}

// 6. KOMPONEN PENERAPAN KONSEP (Tugas Praktik)
export function buatKomponenPenerapanKonsep(instruksi) {
    return `
        <div class="komponen-penerapan">
            <h3 style="color: #4A7298; border-bottom: 2px solid #88D4AB; padding-bottom: 10px;">🛠️ Penerapan Konsep</h3>
            <p style="font-size: 1.1rem; margin: 15px 0;">${instruksi}</p>
            <textarea id="jawaban-penerapan" rows="6" placeholder="Ketik hasil kerja / tautan tugasmu di sini..." style="width:100%; padding:15px; border-radius:8px; border:1px solid #ccc;"></textarea>
        </div>
    `;
}

// 7. KOMPONEN AS LEARNING (Refleksi)
export function buatKomponenAsLearning(refleksi) {
    return `
        <div class="komponen-refleksi">
            <h3 style="color: #4A7298; border-bottom: 2px solid #88D4AB; padding-bottom: 10px;">🌱 Refleksi Diri (As Learning)</h3>
            <p style="font-size: 1.1rem; font-weight: bold; margin: 15px 0;">${refleksi}</p>
            <textarea id="jawaban-refleksi" rows="5" placeholder="Tuliskan refleksimu hari ini..." style="width:100%; padding:15px; border-radius:8px; border:1px solid #ccc;"></textarea>
        </div>
    `;
}
