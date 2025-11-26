import { expect } from "chai"
import supertest from "supertest"
import Server from "../server.js"
import fs from "fs"

describe("TEST API Clientes (interno)", () => {
    
    let app = null
    let request = null
    let idExistente = null
    let server = null

    before(async () => {
        server = new Server(8085)   // puerto alternativo para test
        app = server.start()
        request = supertest(app)

        // Obtener un ID existente para pruebas
        const data = JSON.parse(fs.readFileSync("./clientes.json", "utf-8"))
        if (data.length > 0) {
            idExistente = data[0].id || data[0]._id
        }
    })

    after(() => {
        server.stop()
    })

    describe("GET /api/clientes", () => {
        it("debería retornar 200 y un array de clientes", async () => {
            const response = await request.get("/api/clientes")
            expect(response.status).to.eql(200)
            expect(response.body).to.be.an("array")
        })
    })

    describe("GET /api/clientes/:id", () => {
        it("debería retornar un cliente válido si el ID existe", async () => {
            if (!idExistente) return this.skip()

            const response = await request.get(`/api/clientes/${idExistente}`)
            expect(response.status).to.eql(200)
            expect(response.body).to.be.an("object")
        })

        it("debería retornar 404 si el ID NO existe", async () => {
            const response = await request.get("/api/clientes/999999")
            expect(response.status).to.eql(404)
        })
    })

    describe("POST /api/clientes", () => {
        it("debería crear un nuevo cliente y devolverlo", async () => {
            const nuevoCliente = {
                nombre: "Cliente Test",
                apellido: "Prueba",
                mail: "test@mail.com"
            }

            const response = await request.post("/api/clientes").send(nuevoCliente)

            expect(response.status).to.eql(200)
            expect(response.body).to.include.keys("nombre", "apellido", "mail")
            expect(response.body.nombre).to.eql(nuevoCliente.nombre)
        })

        it("debería fallar si el body está vacío", async () => {
            const response = await request.post("/api/clientes").send({})
            expect(response.status).to.eql(404)
        })
    })

    describe("PUT /api/clientes/:id", () => {
        it("debería editar un cliente existente", async () => {
            if (!idExistente) return this.skip()

            const cambios = { nombre: "Nombre Editado" }

            const response = await request.put(`/api/clientes/${idExistente}`).send(cambios)

            expect(response.status).to.eql(200)
            expect(response.body.nombre).to.eql("Nombre Editado")
        })
    })

    describe("DELETE /api/clientes/:id", () => {
        it("debería retornar 404 si se intenta eliminar un ID inexistente", async () => {
            const response = await request.delete("/api/clientes/987654")
            expect(response.status).to.eql(404)
        })
    })
})