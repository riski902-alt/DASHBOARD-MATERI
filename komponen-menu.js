// 1. KOMPONEN ATP
// ATP langsung mencetak teks HTML dari JSON, tidak menggunakan iframe
export function buatKomponenATP(teksHtml) {
    return `
        <div class="materi-container" style="padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="margin-bottom: 15px;">🎯 Alur Tujuan Pembelajaran</h3>
            ${teksHtml} 
        </div>
    `;
}

// 3. KOMPONEN PERTANYAAN ESENSIAL (Menggunakan Iframe)
export function buatKomponenPertanyaanEsensial(urlHalaman) {
    return `
        <div class="materi-container">
            <h3 style="margin-bottom: 20px;">💡 Pertanyaan Esensial</h3>
            <iframe src="${urlHalaman}" width="100%" height="500px" style="border: 1px solid #e2e8f0; border-radius: 8px;"></iframe>
        </div>
    `;
}

// 4. KOMPONEN EKSPLORASI KONSEP (Menggunakan Iframe)
export function buatKomponenEksplorasiKonsep(urlHalaman) {
    return `
        <div class="materi-container">
            <h3 style="margin-bottom: 20px;">🧭 Eksplorasi Konsep</h3>
            <iframe src="${urlHalaman}" width="100%" height="500px" style="border: 1px solid #e2e8f0; border-radius: 8px;"></iframe>
        </div>
    `;
}

// 5. KOMPONEN FOR LEARNING (Menggunakan Iframe)
export function buatKomponenForLearning(urlHalaman) {
    return `
        <div class="materi-container">
            <h3 style="margin-bottom: 20px;">📝 For Learning</h3>
            <iframe src="${urlHalaman}" width="100%" height="500px" style="border: 1px solid #e2e8f0; border-radius: 8px;"></iframe>
        </div>
    `;
}

// 6. KOMPONEN PENERAPAN KONSEP (Menggunakan Iframe)
export function buatKomponenPenerapanKonsep(urlHalaman) {
    return `
        <div class="materi-container">
            <h3 style="margin-bottom: 20px;">🛠️ Penerapan Konsep</h3>
            <iframe src="${urlHalaman}" width="100%" height="500px" style="border: 1px solid #e2e8f0; border-radius: 8px;"></iframe>
        </div>
    `;
}

// 7. KOMPONEN AS LEARNING (Menggunakan Iframe)
export function buatKomponenAsLearning(urlHalaman) {
    return `
        <div class="materi-container">
            <h3 style="margin-bottom: 20px;">🌱 As Learning</h3>
            <iframe src="${urlHalaman}" width="100%" height="500px" style="border: 1px solid #e2e8f0; border-radius: 8px;"></iframe>
        </div>
    `;
}
