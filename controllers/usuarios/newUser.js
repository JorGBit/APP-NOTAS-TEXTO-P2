const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const bcrypt = require('bcrypt');
let saltRounds = 15;

const newUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { username, name, lastname, email, password } = req.body;
        if (!email || !password) {
            throw generateError('faltan datos obligatorios del usuario', 400);
        }
        const [userMail] = await connection.query(
            `SELECT id FROM user WHERE email = ?`,
            [email]
        );

        if (userMail.length > 0) {
            throw generateError(`Usuaro ya existe en la base de datos`, 409);
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);

        await connection.query(
            `INSERT INTO user (username, name, lastname, email, password) VALUES( ?, ?, ?, ?, ?)`,
            [username, name, lastname, email, hashedPassword]
        );

        res.send({
            status: 'Ok',
            message: '¡Usuario registrado con éxito!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newUser;

