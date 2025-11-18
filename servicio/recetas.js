import FabricaModelos from '../modelo/FabricaModelos.js'
import Config from "../config.js"
import { generarPdfRecetaBuffer } from "../utils/pdfGenerator.js"
import { enviarPdfPorMail } from "../utils/emailSender.js"

//Validaciones con Joi
import { validar } from './validaciones/recetas.js'

class ServicioReceta {
    //Variables
    #modelo = null

    constructor() {
        this.#modelo = FabricaModelos.get(Config.PERSISTENCIA, "recetas")
    }

    async obtenerTodas() {
        return await this.#modelo.obtenerTodas()
    }

    async obtenerPorId(id) {
        return await this.#modelo.obtenerPorId(id)
    }

    async obtenerRecetaParaPdf(id) {
        const receta = await this.obtenerPorId(id)
        if (!receta) throw new Error(`Receta no encontrada`)
        return receta
    }

    async agregarReceta(receta) {
        const res = validar(receta)
        if (res.result) {
            const recetaGuardada = await this.#modelo.agregarReceta(receta)
            return recetaGuardada
        } else {
            throw new Error(res.error.details[0].message)
        }
    }

    async editarReceta(id, data) {
        return await this.#modelo.editarReceta(id, data)
    }

    async eliminarReceta(id) {
        return await this.#modelo.eliminarReceta(id)
    }

    async enviarRecetaPorMail(id, opcionesEmail = {}) {
        if (!opcionesEmail.destinatario) {
            throw new Error("Debe indicar un destinatario")
        }

        const receta = await this.obtenerRecetaParaPdf(id)
        const pdfBuffer = await generarPdfRecetaBuffer(receta)

        const asunto = opcionesEmail.asunto || `Receta: ${receta.titulo}`
        const mensaje = opcionesEmail.mensaje || `Te enviamos la receta "${receta.titulo}".`

        await enviarPdfPorMail({
            destinatario: opcionesEmail.destinatario,
            asunto,
            mensaje,
            pdfBuffer,
            nombreArchivo: `receta_${receta.id}.pdf`
        })

        return {
            destinatario: opcionesEmail.destinatario,
            recetaId: receta.id
        }
    }
}

export default ServicioReceta;