import fs from 'fs/promises'
import CnxMongoDB from "../../DBMongo.js"
import { ObjectId } from 'mongodb'

class ModeloClientes {
  #ruta = ''

  constructor() {
    this.#ruta = 'clientes.json'
  }

  //METODOS PRIVADOS
  //   #leerArchivos = async () => {
  //       return []
  //   }

  //   #escribirArchivos = async (data) => {
  //     await {}
  // }

  //********CRUD*********/
  obtenerTodos = async () => {
    if (!CnxMongoDB.connectionOK) throw new Error(`Error CNX BASE DE DATOS`)
    const clientes = await CnxMongoDB.db.collection(`clientes`).find({}).toArray()
    // console.log(clientes)
    return clientes
  }

  obtenerClientePorId = async (id) => {
    if (!CnxMongoDB.connectionOK) throw new Error(`Error CNX BASE DE DATOS`)

    const cliente = await CnxMongoDB.db.collection("clientes").findOne({ _id: ObjectId.createFromHexString(id) })
    // console.log(cliente)
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
    if (!CnxMongoDB.connectionOK) throw new Error(`Error CNX BASE DE DATOS`)

    await CnxMongoDB.db.collection("clientes").insertOne(cliente)
    return cliente
  }


  editarCliente = async (id, data) => {
    if (!CnxMongoDB.connectionOK) throw new Error(`Error CNX BASE DE DATOS`)

    await CnxMongoDB.db.collection("clientes").updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: data }
    )

    const clienteActualizado = await this.obtenerClientePorId(id)
    return { clienteActualizado }
  }

  eliminarCliente = async (id) => {
    if (!CnxMongoDB.connectionOK) throw new Error(`Error CNX BASE DE DATOS`)
 
    const clienteEliminado = await CnxMongoDB.db.collection("clientes").deleteOne({ _id: ObjectId.createFromHexString(id) })
    return clienteEliminado
  }
}

export default ModeloClientes