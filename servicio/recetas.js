import Modelo from '../modelo/recetas.js' 

class Servicio {
    #modelo = null

    constructor() {
        this.#modelo = new Modelo()
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