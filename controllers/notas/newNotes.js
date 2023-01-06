// Insertar nueva nota

const getDB = require('../../db/getDB');
const { generateError, validateSchema } = require('../../helpers');
const newNoteSchema = require('../../schemas/newNoteSchema');
const newNotes = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();
        // Recuperamos el id del usuario loguiado
        const idUserAuth = req.userAuth.id;

        await validateSchema(newNoteSchema, req.body);

        const { tittle, category, text } = req.body;
        // Recuperamos los datos de la nota
        await connection.query(
            `
            INSERT INTO notes (tittle, category, text, id)
            VALUES (?, ?, ?, ?)
        `,
            [tittle, category, text, idUserAuth]
        );
        // const { titulo_nota, categoria, texto_nota } = req.body;
        // if (!titulo_nota || !categoria || !texto_nota) {
        //     throw generateError(
        //         '¡El título de la nota, la categoría y el texto de la nota son datos necesarios para crear la nota!',
        //         400
        //     );
        // }
        res.send({
            status: 'ok',
            message: '¡La nota ha sido creada correctamente!',
            data: { tittle, category, text },
            // datos: { titulo_nota, categoria, texto_nota },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};
module.exports = newNotes;
