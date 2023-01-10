const getDB = require('../db/getDB');
const { generateError } = require('../helpers');
const jwt = require('jsonwebtoken');
require('dotenv').config(); //dependencia necesaria para leer la variable de entorno SECRET

const isAuth = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Recuperar cabecera de autorización
        const { authorization } = req.headers;

        console.log(authorization);

        if (!authorization) {
            throw generateError('Falta la cabecera de autorización', 401);
        }

        let tokenInfo;

        try {
            //desencriptamos el token
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (error) {
            throw generateError('El token no es válido', 401);
        }

        //comprobamos que el id del usuario token existe en la base de datos, ya que un usuario puede ser eliminado

        const [user] = await connection.query(`SELECT * FROM user WHERE id=?`, [
            tokenInfo.id,
        ]);
        if (user.length < 1) {
            throw generateError('El token no es válido', 401);
        }

        req.userAuth = tokenInfo;

        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = isAuth;
