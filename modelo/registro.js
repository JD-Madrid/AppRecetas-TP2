//FILE SYSTEM
import RecetasFS from "./DAOs/recetas.fs.dao.js"
import ClientesFS from "./DAOs/clientes.fs.dao.js"

//MEMORIA
//import RecetasMEM from "./DAOs/recetas.mem.dao.js"
//import ClientesMEM from "./DAOs/clientes.mem.dao.js"

//MONGO DB
//import RecetasMONGODB from "./DAOs/recetas.mongodb.dao.js"
//import ClientesMONGODB from "./DAOs/clientes.mongodb.dao.js"

export const MODELOS = {
    FILE: {
        recetas: RecetasFS,
        clientes: ClientesFS
    }
    // ,MONGODB: {
    //     recetas: RecetasMONGODB
    //     clientes: ClientesMONGODB
    // }
    
}