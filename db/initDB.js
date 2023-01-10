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
                password VARCHAR(255) NOT NULL              
            )`
        );

        await connection.query(
            `CREATE TABLE IF NOT EXISTS notes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INT UNSIGNED,
                FOREIGN KEY (idUser) REFERENCES user(id) ON DELETE NO ACTION ON UPDATE CASCADE,
                category ENUM('trabajo' , 'estudio' , 'finanzas' , 'viajes' , 'salud' , 'cocina' , 'jardineria' , 'ejercicio' , 'moda' , 'relaciones', 'mascotas', 'Viaje de negocios', 'proyectos', 'desarrollo personal') NOT NULL,
                tittle VARCHAR(200) NOT NULL,
                text VARCHAR(1000),
                publicPrivate TINYINT DEFAULT 0,
                created TIMESTAMP DEFAULT CURRENT_TIMESTAMP                
            )`
        );

        await connection.query(
            `CREATE TABLE IF NOT EXISTS photo_notes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                idNotes INT UNSIGNED,
                FOREIGN KEY (idNotes) REFERENCES notes(id) ON DELETE NO ACTION ON UPDATE CASCADE
            )`
        );
        console.log('Tablas creadas');
    } catch (error) {
        console.error(error.message);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
