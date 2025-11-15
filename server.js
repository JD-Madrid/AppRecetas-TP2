import express from "express"
import RouterRecetas from "./router/recetas.js"
import RouterClientes from "./router/clientes.js"

class Server {
    //Variables
    #port = null
    #routerRecetas = null
    #routerClientes = null

    constructor(port) {
        this.#port = port
        this.#routerRecetas = new RouterRecetas().config()
        this.#routerClientes = new RouterClientes().config()
    }

    start() {
        //****Inicialización de Express****
        const app = express()

        //****MIDDLEWARE DE CONFIGURACIÓN****/
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(express.static(`public`))

        /****RUTAS DE LA API RESTfull: Recetas y Clientes****/
        app.use("/api/recetas", this.#routerRecetas)
        app.use("/api/clientes", this.#routerClientes)

        /****INICIALIZACION DEL SERVIDOR EXPRESS*****/
        const server = app.listen(this.#port, () => {
            console.log(`Servidor express escuchando en http://localhost:${this.#port}`)
        })

        //Manejo de errores durante la puesta en marcha
        server.on("error", (error) => {
            console.error("❌ Error en el servidor:", error)
        })
    }
}

export default Server