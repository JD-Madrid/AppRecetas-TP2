import  express from "express"
import RouterRecetas from "./router/recetas.js"


class Server {
    #port = null
    #routerRecetas = null

    constructor(port) {
        this.#port = port
        this.#routerRecetas = new RouterRecetas().config()
    }

    start() {
        //****API EXPRESS****/
        const app = express()

        //****MIDDLEWARE****/
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(express.static(`public`))

        /****API RESTful: Recetas****/
        app.use("/api/recetas", this.#routerRecetas)

        /****INICIALIZACION DEL SERVIDOR EXPRESS*****/
        app.listen(this.#port, () => { console.log(`Servidor express escuchando en http://localhost:${this.#port}`) })
    }
}

export default Server