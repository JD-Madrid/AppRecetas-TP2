import FabricaModelos from "../modelo/FabricaModelos.js";
import Config from "../config.js";

//Validaciones con Joi - con {} porque lo exportamos en la declaracion y no con expor default
import { validar } from './validaciones/clientes.js'

class ServicioCliente {
    
    //Variables
    #modelo = null

    constructor() {
        this.#modelo = FabricaModelos.get(Config.PERSISTENCIA, "clientes")
    }

    obtenerTodos = async () => {
        const clientes = await this.#modelo.obtenerTodos()
        return clientes
    }

    obtenerClientePorId = async (id) => {
        return await this.#modelo.obtenerClientePorId(id)
    }

    agregarCliente = async (cliente) => {
        const res = validar(cliente)

        if (res.result) {
            const clienteGuardado = await this.#modelo.agregarCliente(cliente)
            return clienteGuardado
        } else {
            throw new Error(res.error.details[0].message)
        }
    }

    editarCliente = async (id, data) => {
        return await this.#modelo.editarCliente(id, data)
    }

    eliminarCliente = async (id) => {
        return await this.#modelo.eliminarCliente(id)
    }
}

export default ServicioCliente;