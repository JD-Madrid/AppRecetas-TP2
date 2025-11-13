import Servicio from '../servicio/recetas.js'


class Controlador {
    #servicio = null

    constructor() {
        this.#servicio = new Servicio()
    }

    async obtenerTodas(req, res) {
        try {
            const recetas = await this.#servicio.obtenerTodas()
            res.json(recetas)
        } catch (error) {
            res.status(500).json({ error:` Al querer leer todas las recetas ${error.message}` })
        }
    }


    async obtenerPorId(req, res) {
        try {
            const id = parseInt(req.params.id)
            const receta = await this.#servicio.obtenerPorId(id)
            if (!receta) return res.status(404).json({ error: 'No se encontró la receta' })
            res.json(receta)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async agregarReceta(req, res) {
        try {
            const nuevaReceta = await this.#servicio.agregarReceta(req.body)
            //***Podriamos validar que no este vacío el obj recibido en el cuerpo de de la petición (req.body) */
            res.json(nuevaReceta)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }


    async editarReceta(req, res) {
        try {
            const id = parseInt(req.params.id)
            const recetaActualizada = await this.#servicio.editarReceta(id, req.body)
            if (!recetaActualizada) return res.status(404).json({ error: 'No se encontró la receta' })
            res.json(recetaActualizada)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async eliminarReceta(req, res) {
        try {
            const id = parseInt(req.params.id)
            const recetaEliminada = await this.#servicio.eliminarReceta(id)
            if (!recetaEliminada) return res.status(404).json({ error: 'No se encontró la receta' })
            res.json({ mensaje: 'Receta eliminada correctamente' })
            //Se retorna un msj o el objeto eliminado ? 
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default Controlador;