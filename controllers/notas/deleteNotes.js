const getDB = require('../../db/getDB');
const { deletePhoto } = require('../../helpers');
const deleteNotes = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();
        const { idNotes } = req.params;
        const [photos] = await connection.query(
            `SELECT name FROM photo_notes WHERE idNotes = ?`,
            [idNotes]
        );
        for (let i = 0; i < photos.length; i++) {
            await deletePhoto(photos[i].name);
        }
        await connection.query(`DELETE FROM photo_notes WHERE idNotes =?`, [
            idNotes,
        ]);

        await connection.query(`DELETE FROM notes WHERE id=?`, [idNotes]);
        res.send({
            status: 'Ok',
            message: 'Nota eliminada con éxito',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteNotes;
