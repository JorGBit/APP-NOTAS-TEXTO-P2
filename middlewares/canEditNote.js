//Comprobamos que el producto pertenece al usuario que tiene la sesión iniciada

const getDB = require('../db/getDB');
const { generateError } = require('../helpers');
const { note } = require('../schemas/newNoteSchema');

const canEditNote = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
        const idUserAuth = req.userAuth.id;
        const { idNotes } = req.params;
        //si la consulta no devuelve ningun valor es que el producto no pertenecfe al usuario
        //que tiene la sesion iniciada
        const [notes] = await connection.query(
            `SELECT * FROM notes WHERE id =? AND idUser = ?`,
            [idNotes, idUserAuth]
        );

        if (notes.length < 1) {
            //si la consulta no devuelve nada significa que el producto no pertenece al usuario con la sesion iniciada
            throw generateError(
                'La nota que quieres editar no te pertenece',
                401
            );
        }
        //Si no salta el error, puedes editarlo

        next(); //ejecutamos
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = canEditNote;
