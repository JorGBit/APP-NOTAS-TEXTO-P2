const getDB = require('../../db/getDB');

const listNotes = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { search, order, direction } = req.query;

        const validOrderOptions = ['tittle', 'category', 'created'];

        const validDirectionOptions = ['ASC', 'DESC'];

        const orderBy = validDirectionOptions.includes(order)
            ? order
            : 'created';

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'ASC';

        let notes;

        if (search) {
            //realizamos consulta filtrando la nota por su título
            [notes] = await connection.query(
                `SELECT * FROM notes WHERE tittle LIKE ? ORDER BY ${orderBy} ${orderDirection}`,
                [`%${search}%`]
            );
        } else {
            [notes] = await connection.query(
                `SELECT * FROM notes ORDER BY ${orderBy} ${orderDirection}`
            );
        }

        const data = [];

        for (let i = 0; i < notes.length; i++) {
            const [photos] = await connection.query(
                `SELECT id, name FROM photo_notes WHERE idNotes = ?`,
                [notes[i].id]
            );

            //variable que guardará los datos de las notass

            data.push({
                ...notes[i],
                photos,
            });
        }
        res.send({
            status: 'Ok',
            message: 'Lista de notas creada',
            notes: data,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listNotes;
