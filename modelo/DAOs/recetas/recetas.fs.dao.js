import fs from 'fs/promises'

class ModeloRecetas {
  #ruta = ''

  constructor() {
    this.#ruta = 'recetas.json'
  }

  //**METODOS PRIVADOS**/
  async #leerArchivo() {
    try {
      const data = await fs.readFile(this.#ruta, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Si el archivo no existe, lo creo vacío
        await fs.writeFile(this.#ruta, '[]')
        return []
      } else {
        console.error('Error al leer archivo:', error.message)
        return []
      }
    }
  }

  async #escribirArchivo(recetas) {
    await fs.writeFile(this.#ruta, JSON.stringify(recetas, null, 2))
  }

  //********CRUD*********/
  async obtenerTodas() {
    return await this.#leerArchivo()
  }

  async obtenerPorId(id) {
    const recetas = await this.#leerArchivo()
    return recetas.find(r => r.id == id)
  }


  async agregarReceta(receta) {
    const recetas = await this.#leerArchivo()
    const id = recetas.length > 0 ? recetas[recetas.length - 1].id + 1 : 1
    const nuevaReceta = { id, ...receta }
    recetas.push(nuevaReceta)
    await this.#escribirArchivo(recetas)
    return nuevaReceta
  }

  async editarReceta(id, data) {
    const recetas = await this.#leerArchivo()
    const index = recetas.findIndex(r => r.id == id)
    if (index === -1) return null
    recetas[index] = { ...recetas[index], ...data }
    await this.#escribirArchivo(recetas)
    return recetas[index]

  }


  async eliminarReceta(id) {
    const recetas = await this.#leerArchivo()
    const filtradas = recetas.filter(r => r.id != id)
    if (filtradas.length === recetas.length) return null
    await this.#escribirArchivo(filtradas)
    return true
  }
}

export default ModeloRecetas;