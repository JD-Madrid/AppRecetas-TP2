import Recetas from "./recetas.js"


class FabricaModelos{

    static get(tipo) {
        switch (tipo) {
            case "FILE":
                console.log("Modelo en Memoria con FS activado")
                return new Recetas()
                break
            case "MongoDB": 
                console.log("Modelo en MongoDB activado")
                break
            default: 
                console.log("Modelo de memoria con FS activado")
        }
    }
}

export default FabricaModelos