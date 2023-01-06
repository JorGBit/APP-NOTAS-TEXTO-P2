//Enviar información de un usuario cuyo id se obtiene por path URLSearchParams

const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
        const { idUser } = req.params;

        //comprobamos que usuario existe en base de datos

        const [user] = await connection.query(`SELECT * FROM user WHERE id=?`, [
            idUser,
        ]);

        //si la nonsulta no devuelve valor, usuario no existe

        if (user.length < 1) {
            throw generateError(`El usuario con id ${idUser} no existe`, 404);
        }

        const responseUser = {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
            name: user[0].name || '',
            lastname: user[0].lastname || '',
            birthday: user[0].birthday || '',
        };
        res.send({
            status: 'Ok',
            user: responseUser,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUser;

