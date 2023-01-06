const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const addNotesPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idNotes } = req.params;

        //Vamos a permitir UNA ÚNICA FOTO por producto

        const [photos] = await connection.query(
            `SELECT * FROM photo_notes WHERE id =? `,
            [idNotes]
        );

        if (photos.length > 1) {
            throw generateError(
                'La nota ya tiene una fotografía asociada. No pueden incluirse más',
                403
            );
        }

        //Comprobamos que nos envia una nueva foto para añadir

        if (!req.files || !req.files.NotesPhoto) {
            throw generateError(
                'Indica la nueva foto a integrar en la nota',
                400
            );
        }
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addNotesPhoto;
