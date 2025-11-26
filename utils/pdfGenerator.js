import PDFDocument from "pdfkit";

function escribirContenidoReceta(doc, receta) {
    //Cabecera
    doc.fontSize(20).text("Receta de Cocina", { underline: true, align: "center" })
    doc.moveDown(1.5);

    //Titulo
    doc.fontSize(18).text(receta.titulo, { align: "left" })
    doc.moveDown();

    //Ingredientes
    doc.fontSize(14).text("Ingredientes:", { underline: true })
    doc.fontSize(12).text(receta.ingredientes)
    doc.moveDown();

    //Instruciones
    doc.fontSize(14).text("Instrucciones:", { underline: true })
    doc.fontSize(12).text(receta.instrucciones)
    doc.moveDown()

    //Tiempo
    doc.fontSize(14).text("Tiempo de preparación:", { underline: true })
    doc.fontSize(12).text(`${receta.tiempo} minutos`)
    doc.moveDown(2)

    //Pie
    doc.fontSize(10).text(`ID de la receta: ${receta.id}`, { align: "right" })
}

// Funcion para descargar un pdf
export function generarPdfReceta(receta, ws) {
    const doc = new PDFDocument({ margin: 50 })

    doc.pipe(ws)
    escribirContenidoReceta(doc, receta)

    //Finalizar PDF
    doc.end();
}

export function generarPdfRecetaBuffer(receta) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 })
        const chunks = []

        doc.on("data", (chunk) => chunks.push(chunk))
        doc.on("end", () => resolve(Buffer.concat(chunks)))
        doc.on("error", (err) => reject(err))

        escribirContenidoReceta(doc, receta)
        doc.end()
    })
}
