import Servicio from '../servicio/recetas.js'


class Controlador {
    #servicio = null

    constructor() {
        this.#servicio = new Servicio()
    }

    //**
    //Sí, la diferencia entre que funcione y no funcione es que una es arrow function y la otra no.
    //La arrow mantiene el this. La función normal lo pierde al pasarla como callback del router.
    //async obtenerTodas(req, res) {
    //     try {
    //         const recetas = await this.#servicio.obtenerTodas()
    //         res.json(recetas)
    //     } catch (error) {
    //         res.status(500).json({error:` Al querer leer todas las recetas ${error.message}` })
    //     }
    // }
    // */

    obtenerTodas = async (req,res) => {
        try{
            const productos = await this.#servicio.obtenerTodas()
            res.json(productos) 
        }catch(error) {
            res.status(500).json({error:` Al querer leer todas las recetas ${error.message}` })
        }
    }

    obtenerPorId = async (req,res) => {
        try{
            const { id } = req.params
            const producto = await this.#servicio.obtenerPorId(id)
            res.json(producto)
        }catch(error) {
            res.status(404).send(error.message)
        }
    }

    agregarReceta = async (req, res) => {
        try {
            //***Podriamos validar que no este vacío el obj recibido en el cuerpo de de la petición (req.body) */
            const nuevaReceta = await this.#servicio.agregarReceta(req.body)
            res.json(nuevaReceta)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }


    editarReceta = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const recetaActualizada = await this.#servicio.editarReceta(id, req.body)
            if (!recetaActualizada) return res.status(404).json({ error: 'No se encontró la receta' })
            res.json(recetaActualizada)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    eliminarReceta = async (req, res) => {
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