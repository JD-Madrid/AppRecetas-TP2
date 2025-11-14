import FabricaModelos from "../modelo/DAOs/FabricaModelos";
import Config from "../config";

class Servicio {
    #modelo = null

    constructor() {
        this.#modelo = FabricaModelos.get(Config.PERSISTENCIA)
    }
}