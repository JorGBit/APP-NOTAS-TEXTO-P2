const getDB = require('./getDB');

async function main() {
    let connection;

    try {
        connection = await getDB();

        console.log('Eliminando tablas en caso de que existan');

        await connection.query(`DROP TABLE IF EXISTS photo_notes`);
        await connection.query(`DROP TABLE IF EXISTS notes`);
        await connection.query(`DROP TABLE IF EXISTS user`);

        console.log('Tablas eliminadas');

        console.log('Creando tablas...');

        await connection.query(
            `CREATE TABLE IF NOT EXISTS user (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(100) UNIQUE,
                name VARCHAR (50),
                lastname VARCHAR(100),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                avatar VARCHAR(255),
                birthday DATE
                
            )`
        );

        await connection.query(
            `CREATE TABLE IF NOT EXISTS notes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idNota INT UNSIGNED NOT NULL,
                titulo_nota VARCHAR(200) NOT NULL,
                texto_nota VARCHAR(1000),
                FOREIGN KEY (id) REFERENCES Usuario(id)
            )`
        );

        await connection.query(
            `CREATE TABLE IF NOT EXISTS photo_notes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(255) NOT NULL,
                idNota INT UNSIGNED NOT NULL,
                FOREIGN KEY (idNota) REFERENCES notas(id)
            )`
        );
        console.log('Tablas creadas');

        // INSERTAMOS LOS DATOS CUANDO TENGAMOS CLARO EL FUNCIONAMIENTO DE LA BASE DE DATOS

        // console.log('Insertamos unos datos de prueba');

        // await connection.query(
        //     `INSERT INTO user (username, email, password)
        //     VALUES ('userPrueba', 'prueba@gmail.com', '123456')`
        // );

        // await connection.query(
        //     `INSERT INTO notes (username, email, password)
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
