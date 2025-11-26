import Servicio from '../servicio/recetas.js'
import { generarPdfReceta } from '../utils/pdfGenerator.js'

//**
//*********VALIDACIONES DEL CONTROLADOR******* */
//Las validaciones del controlador son genericas, por ejemplo que el dato recibido no sea vacia
// */

class Controlador {
    #servicio = null

    constructor() {
        this.#servicio = new Servicio()
    }

    obtenerTodas = async (req, res) => {
        try {
            const recetas = await this.#servicio.obtenerTodas()
            res.json(recetas)
        } catch (error) {
            res.status(500).json({ error: ` Al querer leer todas las recetas ${error.message}` })
        }
    }

    obtenerPorId = async (req, res) => {
        try {
            const { id } = req.params
            const recetas = await this.#servicio.obtenerPorId(id)
            if(!recetas){
                return res.status(404).json({ error: `Receta con id ${id} no encontrada` })
            }   //Aca tuve que modificar el servicio para que devuelva null si no encuentra la receta
            res.json(recetas) // Cuando estaba esto solo, el test fallaba porque no manejaba el caso de no encontrar la receta
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    descargarPdf = async (req, res) => {
        try {
            const { id } = req.params
            const receta = await this.#servicio.obtenerRecetaParaPdf(id)
            if (!receta) {
                return res.status(404).json({ error: `Receta no encontrada` })
            }

            res.setHeader("Content-Type", "application/pdf")
            res.setHeader("Content-Disposition", `attachment; filename=receta_${id}.pdf`)

            //Generar PDF directo al response 
            generarPdfReceta(receta, res)

        } catch (err) {
            console.error("Error al generar PDF: ", err)
            res.status(500).json({ error: err.message })
        }
    }

    enviarPdfPorEmail = async (req, res) => {
        try {
            const { id } = req.params
            const { destinatario, asunto, mensaje } = req.body

            if (!destinatario) {
                return res.status(400).json({ error: "Debe indicar un destinatario" })
            }

            const resultado = await this.#servicio.enviarRecetaPorMail(id, { destinatario, asunto, mensaje })
            res.json({ mensaje: `Receta enviada a ${resultado.destinatario}`, recetaId: resultado.recetaId })
        } catch (error) {
            const status = error.message.includes("no encontrada") ? 404 : 500
            res.status(status).json({ error: error.message })
        }
    }

    agregarReceta = async (req, res) => {
        try {
            const receta = req.body
            //Object.key: validamos que el objeto no este vacío
            if (!Object.keys(receta).length) throw new Error("El objeto receta esta vacío")
            const recetaGuardada = await this.#servicio.agregarReceta(receta)
            res.json(recetaGuardada)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }


    editarReceta = async (req, res) => {
        try {
            // const id = parseInt(req.params.id) //Me rompia con el ObjectId de MONGODB
            const id = req.params.id
            const data = req.body
            const recetaActualizada = await this.#servicio.editarReceta(id, data)
            if (!recetaActualizada) return res.status(404).json({ error: 'No se encontró la receta' })
            res.json(recetaActualizada)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    eliminarReceta = async (req, res) => {
        try {
            // const id = parseInt(req.params.id) //Me rompia con el ObjectId de MONGODB
            const id = req.params.id
            const recetaEliminada = await this.#servicio.eliminarReceta(id)
            if (!recetaEliminada) return res.status(404).json({ error: 'No se encontró la receta' })
            res.json({ mensaje: 'Receta eliminada correctamente', recetaEliminada: recetaEliminada })
            //Se retorna un msj o el objeto eliminado ? 
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}


export default Controlador;