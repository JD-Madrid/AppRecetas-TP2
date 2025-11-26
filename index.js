import config from "./config.js"
import CnxMongoDB from "./modelo/DBMongo.js"
import Server from "./server.js"

const PORT = config.PORT

//Si el tipo de persistencias en con MongoDb nos aseguramos que primero haga la conexion 
//y luego levantamos el SERVIDOR, conectar nos devuelve una promesa por eso la esperamos con el await
if(config.PERSISTENCIA == "MONGODB"){
    await CnxMongoDB.conectar()  //top level await 
}

const server = new Server(PORT)
server.start()