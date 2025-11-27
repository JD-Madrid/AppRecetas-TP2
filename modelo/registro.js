//FILE SYSTEM
import RecetasFS from "./DAOs/recetas/recetas.fs.dao.js"
import ClientesFS from "./DAOs/clientes/clientes.fs.dao.js"

//MEMORIA
//import RecetasMEM from "./DAOs/recetas.mem.dao.js"
//import ClientesMEM from "./DAOs/clientes.mem.dao.js"

//MONGO DB
import RecetasMONGODB from "./DAOs/recetas/recetas.mongo.dao.js"
import ClientesMONGODB from "./DAOs/clientes/clientes.mongo.dao.js"

export const MODELOS = {
    FILE: {
        recetas: RecetasFS,
        clientes: ClientesFS
    }
    ,MONGODB: {
        recetas: RecetasMONGODB,
        clientes: ClientesMONGODB
    }
    // ,MEMORIA: {
    //     recetas: RecetasMEM,
    //     clientes: ClientesMEM
    // }
}