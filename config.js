// Descargo la dependencia dotenv para que me acople las variable acá declaradas como si me las pasara el sitema operativo
// Esto protege la informacion de la conexion a la base de datos para cuando subamos nuestro codigo a un repositorio 
import dotenv from "dotenv"

//Este metodo lee el archivo ".env" y pasa las variable ahi definidad a variables de enviroment con sus respectivos valores
dotenv.config()

// console.log(process.env) // Listamos todas las variables de enviroment (en este punto deberiamos ver PORT y PERSISTENCIA definidas)
// console.log(process.env.PORT)
// console.log(process.env.PERSISTENCIA)

const PORT = process.env.PORT || 8080
const PERSISTENCIA = process.env.PERSISTENCIA || "FILE"

export default {
    PORT,
    PERSISTENCIA
}
