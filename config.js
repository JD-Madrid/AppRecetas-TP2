import dotenv from "dotenv"

dotenv.config()

const PORT = process.nextTick.PORT || 8080
const PERSISTENCIA = process.env.PERSISTENCIA || "FILE"

export default {
    PORT,
    PERSISTENCIA
}
