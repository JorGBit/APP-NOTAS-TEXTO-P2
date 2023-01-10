const getDB = require('../../db/getDB');
// const { validateSchema, generateError } = require('../../helpers');
// const { note } = require('../../schemas/newNoteSchema');
const { generateError } = require('../../helpers');
// const newNoteSchema = require('../../schemas/newNoteSchema');

const editNote = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idNotes } = req.params;

        const { tittle, category, text } = req.body;

        if (!tittle && !category && !text) {
            throw generateError('No has incluido ningún dato a modificar', 400);
        }

        const [notes] = await connection.query(
            `SELECT tittle, category, text FROM notes WHERE id=?`,
            [idNotes]
        );

        if (notes.length < 1) {
            throw generateError('La nota que quieres modificar no existe', 404);
        }
        //si los encuentra, modificamos los datos del producto
        await connection.query(
            `UPDATE notes SET tittle = ?, category = ?, text = ? WHERE id = ?`,
            [
                tittle || notes[0].tittle,
                category || notes[0].category,
                text || notes[0].text,
                idNotes,
            ]
        );

        //respondemos
        res.send({
            status: 'Ok',
            message:
                'Nota modificada con éxito. Te mostramos los nuevos datos:',
            note: {
                id: idNotes,
                tittle: tittle || notes[0].tittle,
                category: category || notes[0].category,
                text: text || notes[0].text,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editNote;
