const { notDeepEqual } = require('assert');
const { unlink } = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

const notesDir = path.join(__dirname, 'static', 'notasImagen');

function generateError(message, code) {
    const error = new Error(message);
    error.httpStatus = code;
    return error;
}
let photoPath;
//Funcion que elimina imagen del servidor
async function deletePhoto(photoName) {
    try {
        const photoPath = path.join(notesDir, photoName);

        await unlink(photoPath);
    } catch (error) {
        throw new error('Error al procesar la imagen del servidor');
    }
}
//Funcion que guarda nueva foto en el servidor y da hombre unico para la imagen
async function savePhoto(imagen) {
    try {
        const sharpImage = sharp(imagen.data);

        const imageName = uuid.v4() + '.jpg';

        const photoPath = path.join(notesDir, imageName);
        sharpImage.toFile(photoPath);
        return imageName;
    } catch (error) {
        throw new Error('Error al procesar la imagen');
    }
}

//Función que valida el esquema que se envíe

async function validateSchema(schema, data) {
    try {
        //intenta validar los datos con el schema que le pasemos
        await schema.validateAsync(data);
    } catch (error) {
        error.httpStatus = 400;
        throw error;
    }
}

module.exports = {
    generateError,
    deletePhoto,
    savePhoto,
    validateSchema,
};
