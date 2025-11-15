import Joi from "joi"

export const validar = cliente => {
    const clienteSchema = Joi.object({
        nombre: Joi.string().min(1).max(25).required(),
        apellido: Joi.string().min(1).max(25).required(),
        mail: Joi.string().email().required()
    })

    const { error } = clienteSchema.validate(cliente)
    if (error) {
        return { result: false, error }
    } else {
        return { result: true }
    }
}

