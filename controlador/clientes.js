import ServicioClientes from "../servicio/clientes.js"

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
            //Object.key: validamos que el objeto no este vacío
            if (!Object.keys(cliente).length) throw new Error("El objeto cliente esta vacío")
            const clienteGuardado = await this.#servicio.agregarCliente(cliente)
            res.json(clienteGuardado)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    editarCliente = async (req, res) => {
        try {
            const { id } = req.params
            const data = req.body
            const cliente = await this.#servicio.editarCliente(id, data)
            res.json(cliente)
        } catch (error) {
            res.status(404).json({ error: `${error.message}` })
        }
    }

    eliminarCliente = async (req, res) => {
        try {
            const { id } = req.params
            const clienteEliminado = await this.#servicio.eliminarCliente(id)
            if (!clienteEliminado) return res.status(404).json({ error: `ID inexistente` })
            res.json({ mensaje: `El cliente con el id ${id} ha sido eliminado exitosamente`, clienteEliminado: clienteEliminado })
        } catch (error) {
            res.status(404).json({ error: `${error.message}` })
        }
    }

}

export default Controlador