const getDB = require('../../db/getDB');
const { generateError, savePhoto } = require('../../helpers');

const addNotesPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idNotes } = req.params;

        const [photos] = await connection.query(
            `SELECT * FROM photo_notes WHERE idNotes =? `,
            [idNotes]
        );

        if (photos.length >= 1) {
            throw generateError(
                'La nota ya tiene una fotografía asociada. No pueden incluirse más',
                403
            );
        }

        if (!req.files || !req.files.NotesPhoto) {
            throw generateError(
                'Indica la nueva foto a integrar en la nota',
                400
            );
        }

        const photoName = await savePhoto(req.files.NotesPhoto);

        await connection.query(
            `INSERT INTO  photo_notes (name, idNotes) VALUES (?, ?)`,
            [photoName, idNotes]
        );

        res.send({
            status: 'Ok',
            message: 'Foto de producto añadida con éxito',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addNotesPhoto;
