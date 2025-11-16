import { Router } from "express"
import ControladorRecetas from "../controlador/recetas.js"

class RouterRecetas {

    //Variables
    #controlador = null

    constructor() {
        this.#controlador = new ControladorRecetas()
    }

    //Configuracion de ruteo
    config() {
        const router = Router()
        router.get("/", this.#controlador.obtenerTodas)
        router.get("/:id", this.#controlador.obtenerPorId)
        router.post("/", this.#controlador.agregarReceta)
        router.put("/:id", this.#controlador.editarReceta)
        router.delete("/:id", this.#controlador.eliminarReceta)

        //Descarga de PDF
        router.get("/:id/pdf", this.#controlador.descargarPdf)
        router.post("/:id/enviar", this.#controlador.enviarPdfPorEmail)

        //Envio de PDF por mail
        
        return router
    }
}

export default RouterRecetas