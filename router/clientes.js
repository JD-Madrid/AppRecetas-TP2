import {Router} from "express"
import ControladorCliente from "../controlador/clientes.js"

class RouterClientes {

    //Variables
    #controlador = null

    constructor(){
        this.#controlador = new ControladorCliente()
    }

    //Configuracion de ruteo
    config() {
        const router = Router()
        router.get("/", this.#controlador.obtenerTodos)
        router.get("/:id", this.#controlador.obtenerClientePorId)
        router.post("/", this.#controlador.agregarCliente)
        router.put("/:id", this.#controlador.editarCliente)
        router.delete("/:id", this.#controlador.eliminarCliente)
        return router
    }
}

export default RouterClientes