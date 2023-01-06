const getDB = require('../../db/getDB');

//controlador
const listNotes = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { search, order, direction } = req.query;

        const validOrderOptions = ['tittle', 'categoria', 'createdAt'];

        const validDirectionOptions = ['ASC', 'DESC'];

        //variable que guarda el valor para ordenar los productos, por defecto

        const orderBy = validDirectionOptions.includes(order)
            ? order
            : 'createdAt';

        //variable para establecer la direccion en la que ordenaremos
        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'ASC';

        //variable qe guardará la consulta a la base de datos
        let notes;

        if (search) {
            //realizamos consulta filtrando la nota por su título
            [notes] = await connection.query(
                `SELECT * FROM notes WHERE tittle LIKE ? ORDER BY ${orderBy} ${orderDirection}`,
                [`%${search}%`]
            );
        } else {
            [notes] = await connection.query(
                `SELECT * FROM notes ORDER BY ${orderBy} ${orderDirection}`
            );
        }

        //variable que guardará los datos de las notass

        const data = [];

        //al array de datos le vamos a pushear una copia del producto
        data.push({
            ...notes[i],
        });

        res.send({
            status: 'Ok',
            message: 'Lista de notas creada',
            notes: data,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listNotes;
