//Registro de un nuevo usuario
const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const bcrypt = require('bcrypt');
let saltRounds = 10; //para encriptar la contraseña, nivel de complejidad

const getUserById = async (id) => {
    let = connection;

    try {
        connection = await getDB();

        const [result] = await connection.query(
            `SELECT id, email FROM users WHERE id=?`,
            [id]
        );

        if (result.length === 0) {
            throw generateError('No existe ningun usuario con ese id', 404);
        }

        return result[0];
    } finally {
        if (connection) connection.release();
    }
};

const newUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB(); //abrimos conexión a base de datos

        const { username, email, password } = req.body; //obtenemos campos del req.body
        console.log(username);
        console.log(email);
        console.log(password);
        //comprobar si se han introducido los datos obligatorios
        if (!username || !email || !password) {
            throw generateError('faltan datos obligatorios del usuario', 400);
        }
        const [user] = await connection.query(
            //consulta a la base de datos para comprobar q no está el email de antes
            `SELECT id FROM user WHERE email = ?`, //interrogante para evitar inyección de código SQL, así no se puede modificar la consulta
            [email]
        );

        console.log(username);

        if (user.length > 0) {
            //si ya hay + de 1 email igual, es que ya está registrado el usuario. es una consulta a la base de datos
            throw generateError('Ya existe un usuario con ese email', 409);
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);

        //Si todo funciona, guardamos al usuario en la base de datos

        await connection.query(
            `INSERT INTO user (username, email, password) VALUES(?, ?, ?)`,
            [
                username,
                email,
                hashedPassword, //introduce al usuario en la base de datos
            ]
        );

        res.send({
            //si todo lo anterior es correcto, se lanza este mensaje
            status: 'Ok',
            message: '¡Usuario registrado!',
        });
    } catch (error) {
        //por si ocurre algún error en el código
        next(error);
    } finally {
        if (connection) connection.release(); //siempre cerramos la conexión al final
    }
};

(module.exports = newUser), getUserById; //exportamos newuser al server.js
