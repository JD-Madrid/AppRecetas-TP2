import ServicioClientes from "../servicio/clientes.js"
import fs from "node:fs/promises"

//**
// CONSIDERAR VALIDACIONES MAS ESPECIFICAS EN TODAS LOS METODOS 
//*/

class Controlador {

    //Variables
    #servicio = null

    //Constructor
    constructor() {
        this.#servicio = new ServicioClientes()
    }

    obtenerTodos = async (req, res) => {
        try {
            const clientes = await this.#servicio.obtenerTodos()
            res.json(clientes)
        } catch (error) {
            res.status(404).json({ error: `en el pedido de todos los clientes: ${error.message}` })
        }
    }

    obtenerClientePorId = async (req, res) => {
        try {
            const { id } = req.params
            const cliente = await this.#servicio.obtenerClientePorId(id)
            if (!cliente) {
                return res.status(404).json({ error: `El id ingresado no corresponde a un registro válido` })
            }
            res.json(cliente)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    agregarCliente = async (req, res) => {
        try {
            const cliente = req.body
            const nuevoCliente = await this.#servicio.agregarCliente(cliente)
            res.json(nuevoCliente)
        } catch (error) {
            res.status(404).json({ error: `${error.message}` })
        }
    }

    editarCliente = async (req, res) => {
        try {
            const { id } = req.params
            const cliente = await this.#servicio.editarCliente(id)
            res.json(cliente)
        } catch (error) {
            res.status(404).json({ error: `${error.message}` })
        }
    }

    eliminarCliente = async (req, res) => {
        try {
            const { id } = req.params
            const cliente = await this.#servicio.eliminarCliente(id)
            if (!cliente) return res.status(404).json({ error: `ID inexistente` })
            res.json({ mensaje: `El cliente con el id ${id} ha sido eliminado exitosamente` })
        } catch (error) {
            res.status(404).json({ error: `${error.message}` })
        }
    }

}

export default Controlador