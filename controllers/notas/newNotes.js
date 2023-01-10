const getDB = require('../../db/getDB');
const { generateError, validateSchema } = require('../../helpers');
const newNoteSchema = require('../../schemas/newNoteSchema');

const newNotes = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const idUserAuth = req.userAuth.id;

        await validateSchema(newNoteSchema, req.body);

        const { tittle, category, text } = req.body;
        // Recuperamos los datos de la nota
        await connection.query(
            `
            INSERT INTO notes (tittle, category, text, idUser)
            VALUES (?, ?, ?, ?)
        `,
            [tittle, category, text, idUserAuth]
        );

        res.send({
            status: 'ok',
            message: '¡La nota ha sido creada correctamente!',
            data: { idUserAuth, category, tittle, text },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};
module.exports = newNotes;
