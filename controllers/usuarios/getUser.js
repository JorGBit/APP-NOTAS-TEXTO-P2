const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
        const { idUser } = req.params;

        const [user] = await connection.query(`SELECT * FROM user WHERE id=?`, [
            idUser,
        ]);

        if (user.length < 1) {
            throw generateError(`El usuario con id ${idUser} no existe`, 404);
        }

        const responseUser = {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
            name: user[0].name || '',
            lastname: user[0].lastname || '',
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
