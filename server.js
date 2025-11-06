import { express } from "express"
import RouterRecetas from "./router/recetas.js"


class Server {
    #port = null
    #routerRecetas = null

    constructor(port) {
        this.#port = port
        this.#routerRecetas = new RouterRecetas().config()
    }

    start() {
        const app = express()
        app.use(express.json)
        app.use(urlencoded({ extended: true }))
        app.use(express.static(`public`))
        app.use("/api/recetas", this.#routerRecetas)
        app.listen(this.#port, () => { console.log(`Servidor express escuchando en http://localhost${this.#port}`) })
    }
}

export default Server