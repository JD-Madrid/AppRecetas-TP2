import Joi from "joi"

export const validar = receta => {
    const recetaSchema = Joi.object({
        titulo: Joi.string().min(3).max(200).required(),
        ingredientes: Joi.string().min(3).max(200).required(),
        instrucciones: Joi.string().min(5).max(350).required(),
        tiempo: Joi.number().integer().min(1).max(1000).required()
    })
    
    const {error} = recetaSchema.validate(receta)
    if(error){
        return {result: false, error}
    }else{
        return {result: true}
    }
}