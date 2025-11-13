import RecetaFile from "./recetas.ja"

Class FabricaModelos{

    static get(tipo) {
        switch (tipo) {
            case "MEM":
                console.log("Modelo en memoria con FS activado")
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