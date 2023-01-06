//Schema que controla el tipo de dato de
//texto, titulo y categoría

const Joi = require('joi');
const newNoteSchema = Joi.object().keys({
    tittle: Joi.string()
        .required()
        .min(1)
        .max(40)
        .error((errors) => {
            if (
                errors[0].code === 'any.required' ||
                errors[0].code === 'string.empty'
            ) {
                return new Error('El título es requerido');
            } else {
                return new Error(
                    'El título debe tener entre 5 y 70 caracteres de longitud'
                );
            }
        }),
    category: Joi.string()
        .required()
        .min(3)
        .max(20)
        .error((errors) => {
            if (
                errors[0].code === 'any.required' ||
                errors[0].code === 'string.empty'
            ) {
                return new Error('Incluir la categoría es obligatorio');
            } else {
                return new Error(
                    'La categoría debe tener un mínimo de 3 y un máximo de 20 caracteres'
                );
            }
        }),
    text: Joi.string()
        .required()
        .min(1)
        .max(900)
        .error((errors) => {
            if (
                errors[0].code === 'any.required' ||
                errors[0].code === 'string.empty'
            ) {
                return new Error('Debe haber algo de texto en la nota');
            } else {
                return new Error(
                    'El texto debe tener entre 1 y 900 caracteres'
                );
            }
        }),
});

module.exports = newNoteSchema;
