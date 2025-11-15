import { MODELOS } from "./registro.js"

class FabricaModelos {

    static get(tipoPersistencia, entidad) {
        const grupo = MODELOS[tipoPersistencia]
        if (!grupo) {
            throw new Error(`Persistencia no importada: ${tipoPersistencia}`)
        }

        const Modelo = grupo[entidad]
        if (!Modelo) {
            throw new Error(`Entidad ${entidad} no existe para ${tipoPersistencia}`)
        }

        return new Modelo()
    }
}

export default FabricaModelos