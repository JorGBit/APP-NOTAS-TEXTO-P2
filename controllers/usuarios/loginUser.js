const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginUser = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB(); //abrimos conexion con base de datos

        const { email, password } = req.body;

        //Si no hay email o contraseña, tiene que salir un error
        if (!email || !password) {
            throw generateError('Faltan algunos campos obligatorios', 400);
        }
        //comprobamos que usuario exista en base de datos
        const [user] = await connection.query(
            `SELECT * FROM user WHERE email = ?`,
            [email]
        );
        //si no hay usuario con ese correo, lanzamos error

        // if (user.length < 1) {
        //     throw generateError(
        //         'No existe un usuario con ese email en la base de datos',
        //         404
        //     );
        // }

        let validPassword;
        if (user.length > 0) {
            validPassword = await bcrypt.compare(password, user[0].password);
        }

        if (user.length < 1 || !validPassword) {
            throw generateError(
                'El email o la contraseña son incorrectos. Por favor, inténtelo de nuevo',
                401
            );
        }

        //generamos el token del usuario con el secreto. hemos instalado su dependencia

        const tokenInfo = {
            id: user[0].id,
        };
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '10d',
        });
        res.send({
            status: 'Ok',
            message: 'Sesión iniciada con éxito',
            authToken: token,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = loginUser;

