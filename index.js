import { config } from "dotenv"
import Server from "./server.js"

const PORT = config.PORT

const server = new Server(PORT)

server.start()