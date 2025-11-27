import fs from 'fs/promises'
import CnxMongoDB from "../../DBMongo.js"
import { ObjectId } from 'mongodb'

class ModeloRecetas {
    #ruta = ''

    constructor() {
        this.#ruta = 'recetas.json'
    }

    //**METODOS PRIVADOS**/
    // async #leerArchivo() {
    //     return []
    // }

    // async #escribirArchivo(recetas) {
    //     await {}
    // }

    //********CRUD*********/
    async obtenerTodas() {
        if (!CnxMongoDB.connectionOK) throw new Error(`Error CNX BASE DE DATOS`)
        const recetas = await CnxMongoDB.db.collection(`recetas`).find({}).toArray()
        //console.log(recetas)
        return recetas
    }

    async obtenerPorId(id) {
        if (!CnxMongoDB.connectionOK) throw new Error(`Error CNX BASE DE DATOS`)

        const receta = await CnxMongoDB.db.collection("recetas").findOne({ _id: ObjectId.createFromHexString(id) })
        console.log(receta)
        return receta
    }

    async agregarReceta(receta) {
        if (!CnxMongoDB.connectionOK) throw new Error(`Error CNX BASE DE DATOS`)

        await CnxMongoDB.db.collection("recetas").insertOne(receta)
        return receta
    }

    async editarReceta(id, data) {
        if (!CnxMongoDB.connectionOK) throw new Error(`Error CNX BASE DE DATOS`)

        await CnxMongoDB.db.collection("recetas").updateOne(
            { _id: ObjectId.createFromHexString(id) },
            { $set: data }
        )

        const recetaActualizado = await this.obtenerPorId(id)
        return recetaActualizado
    }

    async eliminarReceta(id) {
        if (!CnxMongoDB.connectionOK) throw new Error(`Error CNX BASE DE DATOS`)
        const receta = await CnxMongoDB.db.collection("recetas").deleteOne({ _id: ObjectId.createFromHexString(id) })
        return receta
    }
}

export default ModeloRecetas;