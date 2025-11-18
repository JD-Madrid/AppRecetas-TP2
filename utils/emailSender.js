import nodemailer from "nodemailer"
import Config from "../config.js"

function validarConfiguracionSMTP() {
    const { SMTP } = Config
    const camposObligatorios = ["HOST", "USER", "PASS"]
    const faltantes = camposObligatorios.filter((campo) => !SMTP[campo])

    if (faltantes.length) {
        throw new Error(`Configuración SMTP incompleta. Faltan: ${faltantes.join(", ")}`)
    }

    return SMTP
}

export async function enviarPdfPorMail({ destinatario, asunto, mensaje, pdfBuffer, nombreArchivo }) {
    if (!destinatario) throw new Error("Es necesario indicar un destinatario de correo")

    const SMTP = validarConfiguracionSMTP()

    const transporter = nodemailer.createTransport({
        host: SMTP.HOST,
        port: SMTP.PORT,
        secure: SMTP.SECURE,
        auth: { user: SMTP.USER, pass: SMTP.PASS }
    })

    try {
        await transporter.sendMail({
            from: SMTP.FROM || SMTP.USER,
            to: destinatario,
            subject: asunto || "Receta en PDF",
            text: mensaje || "Te enviamos la receta solicitada. El PDF está adjunto.",
            attachments: [
                {
                    filename: nombreArchivo || "receta.pdf",
                    content: pdfBuffer,
                    contentType: "application/pdf"
                }
            ]
        })
    } catch (error) {
        let detalle = error.message
        if (error.response) {
            detalle += ` | Respuesta: ${error.response}`
        }
        console.error("Error al enviar correo:", detalle)
        throw new Error(`No se pudo enviar el correo: ${error.message}`)
    }
}

