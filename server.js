const express = require('express');
const newUser = require('./controllers/usuarios/newUser');
const {
    getUserController,
} = require('./controllers/usuarios/getUserController');
const { loginController } = require('./controllers/usuarios/login_user');
const morgan = require('morgan'); //esto envía más información sobre las consultas realizadas en postman

require('dotenv').config();
///Conexión a la base de datos
const app = express();

//Deserializar body formato raw
app.use(express.json()); //super necesario para poder leer los json del body de postman raw. "deserializar"
app.use(morgan('dev'));
//Endpoints. COMENZAMOS AQUÍ A INCLUIR LOS ENDPOINTS DEL PROYECTO

app.post('/register', newUser);
app.get('/user/:id', getUserController);
app.post('/login', loginController);

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
