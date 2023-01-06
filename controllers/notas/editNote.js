const getDB = require('../../db/getDB');
const { validateSchema, generateError } = require('../../helpers');
const { note } = require('../../schemas/newNoteSchema');
const newNoteSchema = require('../../schemas/newNoteSchema');

const editNote = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUserAuth = req.idUserAuth.id;

        //recuperamos id del producto con path params
        const { idNote } = req.params;

        await validateSchema(newNoteSchema, req.body);
        const { tittle, category, text } = req.body;

        if (!tittle && !category && !text) {
            throw generateError('No has incluido ningún dato a modificar', 400);
        }
        //sekeccionamos los datos antiguos del producto
        const [product] = await connection.query(
            `SELECT tittle, category, text FROM notes WHERE id=?`,
            [idNote]
        );

        //Si no devuelve ningún dato
        if (product.length < 1) {
            throw generateError('La nota que quieres modificar no existe', 404);
        }
        //si los encuentra, modificamos los datos del producto
        await connection.query(
            `UPDATE notes SET tittle = ?, category = ?, text = ?, WHERE id = ?`,
            [
                tittle || note[0].tittle,
                category || note[0].category,
                text || note[0].text,
                idNote,
            ]
        );

        //respondemos
        res.send({
            status: 'Ok',
            message:
                'Nota modificada con éxito. Te mostramos los nuevos datos:',
            note: {
                tittle: tittle || note[0].tittle,
                category: category || note[0].category,
                text: text || note[0].text,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editNote;
