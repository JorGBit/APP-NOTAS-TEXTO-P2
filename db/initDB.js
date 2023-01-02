const getDB = require('./getDB');

async function main() {
    let connection;

    try {
        connection = await getDB();

        console.log('Eliminando tablas en caso de que existan');

        await connection.query(`DROP TABLE IF EXISTS foto_notas`);
        await connection.query(`DROP TABLE IF EXISTS notas`);
        await connection.query(`DROP TABLE IF EXISTS usuario`);

        console.log('Tablas eliminadas');

        console.log('Creando tablas...');

        await connection.query(
            `CREATE TABLE IF NOT EXISTS usuario (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                nombre_usuario VARCHAR(100) UNIQUE NOT NULL,
                nombre VARCHAR (50) NOT NULL,
                apellidos VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                contrasena VARCHAR(255) NOT NULL,
                avatar VARCHAR(255),
                fechacumple DATE
                
            )`
        );

        await connection.query(
            `CREATE TABLE IF NOT EXISTS notas (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idNota INT UNSIGNED NOT NULL,
                titulo_nota VARCHAR(200) NOT NULL,
                texto_nota VARCHAR(1000),
                FOREIGN KEY (id) REFERENCES Usuario(id)
            )`
        );

        await connection.query(
            `CREATE TABLE IF NOT EXISTS foto_notas (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(255) NOT NULL,
                idNota INT UNSIGNED NOT NULL,
                FOREIGN KEY (idNota) REFERENCES notas(id)
            )`
        );
        console.log('Tablas creadas');

        //INSERTAMOS LOS DATOS CUANDO TENGAMOS CLARO EL FUNCIONAMIENTO DE LA BASE DE DATOS

        // console.log('Insertamos unos datos de prueba');

        // await connection.query(
        //     `INSERT INTO usuario (nombre_usuario, email, contraseña)
        //     VALUES ('userPrueba', 'prueba@gmail.com', '123456')`
        // );

        // await connection.query(
        //     `INSERT INTO notas (nombre_usuario, email, contraseña)
        //     VALUES ('userPrueba', 'prueba@gmail.com', '123456')`
        // );

        // await connection.query(
        //     `INSERT INTO foto_notas (nombre_usuario, email, contraseña)
        //     VALUES ('userPrueba', 'prueba@gmail.com', '123456')`
        // );

        // console.log('Datos de prueba insertados con éxito');
    } catch (error) {
        console.error(error.message);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
