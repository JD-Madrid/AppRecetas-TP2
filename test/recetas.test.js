import { expect } from "chai"
import supertest from "supertest"
import Server from "../server.js"
import fs from "fs"

describe("TEST API Recetas (interno)", () => {
    
    let app = null
    let request = null
    let idExistente = null
    let server = null

    before(async () => {
        server = new Server(8086)
        app = server.start()
        request = supertest(app)

        // Obtener un ID existente para pruebas
        const data = JSON.parse(fs.readFileSync("./recetas.json", "utf-8"))
        if (data.length > 0) {
            idExistente = data[0].id
        }
    })

    after(() => {
        server.stop()
    })

    describe("GET /api/recetas", () => {
        it("debería retornar 200 y un array de recetas", async () => {
            const response = await request.get("/api/recetas")
            expect(response.status).to.eql(200)
            expect(response.body).to.be.an("array")
        })
    })

    describe("GET /api/recetas/:id", () => {
        it("debería retornar una receta válida si el ID existe", async () => {
            if (!idExistente) return this.skip()

            const response = await request.get(`/api/recetas/${idExistente}`)
            expect(response.status).to.eql(200)
            expect(response.body).to.be.an("object")
            expect(response.body).to.have.property("titulo")
        })

        it("debería retornar 404 si el ID NO existe", async () => {
            const response = await request.get("/api/recetas/999999")
            expect(response.status).to.eql(404)
        })
    })

    describe("POST /api/recetas", () => {
        it("debería crear una nueva receta y devolverla", async () => {
            const nuevaReceta = {
                titulo: "Receta Test",
                ingredientes: "Ingrediente 1, Ingrediente 2",
                instrucciones: "Mezclar todo y cocinar por 10 minutos",
                tiempo: 45
            }

            const response = await request.post("/api/recetas").send(nuevaReceta)

            expect(response.status).to.eql(200)
            expect(response.body).to.include.keys("titulo", "ingredientes", "instrucciones", "tiempo")
            expect(response.body.titulo).to.eql(nuevaReceta.titulo)
        })

        it("debería fallar si el body está vacío", async () => {
            const response = await request.post("/api/recetas").send({})
            expect(response.status).to.eql(500)
        })

        it("debería fallar con validación Joi si los datos son inválidos", async () => {
            const recetaInvalida = {
                titulo: "Re",
                ingredientes: "In",
                instrucciones: "Ins",
                tiempo: -5
            }

            const response = await request.post("/api/recetas").send(recetaInvalida)
            expect(response.status).to.eql(500)
            expect(response.body).to.have.property("error")
        })
    })

    describe("PUT /api/recetas/:id", () => {
        it("debería editar una receta existente", async () => {
            if (!idExistente) return this.skip()

            const cambios = { titulo: "Titulo Editado Test" }

            const response = await request.put(`/api/recetas/${idExistente}`).send(cambios)

            expect(response.status).to.eql(200)
            expect(response.body.titulo).to.eql("Titulo Editado Test")
        })

        it("debería retornar 404 si se intenta editar un ID inexistente", async () => {
            const response = await request.put("/api/recetas/999999").send({ titulo: "Test" })
            expect(response.status).to.eql(404)
        })
    })

    describe("DELETE /api/recetas/:id", () => {
        it("debería retornar 404 si se intenta eliminar un ID inexistente", async () => {
            const response = await request.delete("/api/recetas/987654")
            expect(response.status).to.eql(404)
        })
    })
})