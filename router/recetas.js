import Router from "express"
import ControladorRecetas from "../controlador/recetas.js"

class RouterRecetas {

    #controlador = null

    constructor() {
        this.#controlador = new ControladorRecetas()
    }

    config() {
        const router = Router()
        router.get("/", (req, res) => { this.#controlador.obtenerTodas(req, res) })
        router.get("/:id", (req, res) => { this.#controlador.obtenerPorId(req, res) })
        router.post("/", (req, res) => { this.#controlador.agregarReceta(req, res) })
        router.put("/:id", (req, res) => { this.#controlador.editarReceta(req, res) })
        router.delete("/:id", (req, res) => { this.#controlador.eliminarReceta(req, res) })
        return router
    }


}


export default RouterRecetas