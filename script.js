// script.js
function exportToPDF() {
    const element = document.querySelector('.container');
    const exportBtn = document.querySelector('.export-btn');
    exportBtn.style.display = 'none';

    // Asegura que la página esté arriba para que los getBoundingClientRect sean correctos
    window.scrollTo(0, 0);

    html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        const pdfWidth = 595.28;   // A4 width in pt
        const pdfHeight = 841.89;  // A4 height in pt

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const imgProps = {
            width: canvas.width,
            height: canvas.height
        };
        const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);

        const imgWidth = imgProps.width * ratio;
        const imgHeight = imgProps.height * ratio;
        const x = (pdfWidth - imgWidth) / 2;
        const y = (pdfHeight - imgHeight) / 2;

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'pt', 'a4');

        // Fondo azul
        pdf.setFillColor(44, 62, 80);
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

        // Imagen del CV
        pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);

        // --- Enlaces automáticos robustos ---
        // 1. Buscar todos los <a> dentro de .container
        const links = element.querySelectorAll('a[href]');
        const containerRect = element.getBoundingClientRect();

        links.forEach(link => {
            const rect = link.getBoundingClientRect();

            // Posición y tamaño relativo al .container
            const relX = ((rect.left - containerRect.left) / containerRect.width) * imgWidth + x;
            const relY = ((rect.top - containerRect.top) / containerRect.height) * imgHeight + y;
            const relW = (rect.width / containerRect.width) * imgWidth;
            const relH = (rect.height / containerRect.height) * imgHeight;

            // Solo enlaces http(s) o mailto
            if (/^(https?:|mailto:)/.test(link.href)) {
                pdf.link(relX, relY, relW, relH, { url: link.href });
            }
        });

        pdf.save('CV_Esteban_Martinez_Palacios.pdf');
        exportBtn.style.display = '';
    }).catch(() => {
        exportBtn.style.display = '';
        alert('Error al exportar PDF');
    });
}

// Mejorar la experiencia de carga
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});