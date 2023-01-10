const getDB = require('../db/getDB');
const { generateError } = require('../helpers');

const canEditNote = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
        const idUserAuth = req.userAuth.id;
        const { idNotes } = req.params;

        const [notes] = await connection.query(
            `SELECT * FROM notes WHERE id =?`,
            [idNotes]
        );

        if (notes.length < 1) {
            throw generateError('La nota que quieres editar no existe', 404);
        }

        if (notes[0].idUser !== idUserAuth) {
            throw generateError(
                'La nota que quieres editar no te pertenece',
                403
            );
        }

        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = canEditNote;
