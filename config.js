
const PORT = 8080
const PERSISTENCIA = "FILE" // FILE - MEM - MONGODB
const STRCNX = 'mongodb://localhost:27017'
const BASE = "mibase"

const SMTP = {
    HOST: process.env.SMTP_HOST || "smtp.gmail.com",
    PORT: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    SECURE: process.env.SMTP_SECURE === "false",
    USER: process.env.SMTP_USER || "wainerbrian@gmail.com",
    PASS: process.env.SMTP_PASS || "pycw ivks jbyi bdhr",
    FROM: process.env.SMTP_FROM || process.env.SMTP_USER || "wainerbrian@gmail.com"
}

export default {
    PORT,
    PERSISTENCIA,
    SMTP, 
    STRCNX,
    BASE
}
