import { writeFile } from "node:fs"
import fs from "node:fs/promises"

class ModeloClientes {
    #ruta = ""

    constructor() {
        this.#ruta = "clientes.json"
    }

    //METODOS PRIVADOS
    #leerArchivos = async () => {
        try {
            const data = await fs.readFile(this.#ruta, "utf-8")
            return JSON.parse(data)
        } catch (error) {
            if (error.code === "ENOENT") {
                await fs.writeFile(this.#ruta, "[]", "utf-8")
                return []
            } else {
                console.error('Error al leer archivo:', error.message)
                return []
            }
        }
    }

    #escribirArchivos = async (data) => {
        await fs.writeFile(this.#ruta, JSON.stringify(data, null, 2))
    }

    obtenerTodos = async () => {
        const clientes = await this.#leerArchivos()
        return clientes
    }

    obtenerClientePorId = async (id) => {
        const clientes = await this.#leerArchivos()
        const cliente = clientes.find((c) => c.id === Number(id))
        return cliente
    }

    // agregarCliente = async (cliente) => {
    //     const clientes = await this.#leerArchivos()
    //     const total = clientes.length
    //     cliente.id = total > 0 ? clientes[total - 1].id + 1 : 1
    //     clientes.push(cliente)
    //     await this.#escribirArchivos(clientes)
    //     return cliente
    // }

     agregarCliente = async (cliente) => {
        const clientes = await this.#leerArchivos()
        const total = clientes.length
        const id = total > 0 ? clientes[total - 1].id + 1 : 1
        const clienteNuevo = {id, ...cliente}
        clientes.push(clienteNuevo)
        await this.#escribirArchivos(clientes)
        return clienteNuevo
    }


    editarCliente = async (id, data) => {
        const clientes = await this.#leerArchivos()
        const index = clientes.findIndex((c) => c.id == id)
        if (index === -1) throw new Error(`el id ingresado es invalido`)
        clientes[index] = { ...clientes[index], ...data }
        await this.#escribirArchivos(clientes)
        return clientes[index]
    }

    eliminarCliente = async (id) => {
        const clientes = await this.#leerArchivos()
        const index = clientes.findIndex((c) => c.id == id)

        if(index === -1) throw new Error("El id no existe")

        const eliminado = clientes[index]
        const nuevosClientes = clientes.filter((c) => c.id != id)
        await this.#escribirArchivos(nuevosClientes)
        return eliminado
    }

}

export default ModeloClientes