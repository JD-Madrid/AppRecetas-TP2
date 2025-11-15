import config from "./config.js"
import Server from "./server.js"

const PORT = config.PORT

const server = new Server(PORT)

server.start()