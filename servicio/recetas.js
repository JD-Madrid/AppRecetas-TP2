// import Modelo from '../modelo/recetas.js' 
import FabricaModelos from '../modelo/FabricaModelos.js'
import Config from "../config.js"

class Servicio {
    #modelo = null

    constructor() {
        this.#modelo = FabricaModelos.get(Config.PERSISTENCIA)
    }

        async obtenerTodas() {
            return await this.#modelo.obtenerTodas()
        }

        async obtenerPorId(id) {
            return await this.#modelo.obtenerPorId(id)
        }

        async agregarReceta(receta) {
            return await this.#modelo.agregarReceta(receta)
        }

        async editarReceta(id,data) {
            return await this.#modelo.editarReceta(id,data)
        }

        async eliminarReceta(id) {
            return await this.#modelo.eliminarReceta(id)
        }
}

export default Servicio;