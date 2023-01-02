const express = require('express');
require('dotenv').config();
//Conexión a la base de datos
const app = express();

//Endpoints. COMENZAMOS AQUÍ A INCLUIR LOS ENDPOINTS DEL PROYECTO

//gestión de errores: Error y Not Found (Middleware de errory not found)
app.use((error, req, res, _) => {
    console.error(error);
    res.status(error.httpStatus || 500);
    res.send({
        status: 'Error',
        message: error.message,
    });
});

app.use((req, res) => {
    res.status(404);
    res.send({
        status: 'Error',
        message: 'Not found',
    });
});

//Ponemos a la escucha el servidor
app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
