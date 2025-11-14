import  express from "express"
import RouterRecetas from "./router/recetas.js"
import RouterClientes from "./router/clientes.js"

class Server {
    #port = null
    #routerRecetas = null
    #routerClientes = null

    constructor(port) {
        this.#port = port
        this.#routerRecetas = new RouterRecetas().config()
        this.#routerClientes = new RouterClientes().config()    
    }

    start() {
        //****API EXPRESS****/
        const app = express()

        //****MIDDLEWARE DE CONFIGURACIÓN****/
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(express.static(`public`))

        /****API RESTful: Recetas****/
        app.use("/api/recetas", this.#routerRecetas)
        /****API RESTful: Clientes****/
        app.use("/api/clientes", this.#routerClientes)

        /****INICIALIZACION DEL SERVIDOR EXPRESS*****/
        app.listen(this.#port, () => { console.log(`Servidor express escuchando en http://localhost:${this.#port}`) })
    }
}

export default Server