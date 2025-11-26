import { MongoClient } from "mongodb"
import config from "../config.js"

class CnxMongoDB {
    static connectionOK = false
    static db = null

    static conectar = async () => {
        try {
            console.log("Conectando con la base de datos...")
            const client = new MongoClient(config.STRCNX)
            await client.connect()
            console.log("Base de datos conectada!")

            CnxMongoDB.db = client.db(config.BASE)

            CnxMongoDB.connectionOK = true
        } catch (error) {
            console.log("Error en conexion de base de datos", error.message)
        }
    }
}

export default CnxMongoDB