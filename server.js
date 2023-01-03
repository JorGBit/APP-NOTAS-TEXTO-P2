const express = require('express');
// const newUser = require('./controllers/usuarios/newUser');
const morgan = require('morgan'); //esto envía más información sobre las consultas realizadas en postman
// const newNote = require('./controllers/notas/newNotes');

require('dotenv').config();
///Conexión a la base de datos
const app = express();

//Deserializar body formato raw
app.use(express.json()); //super necesario para poder leer los json del body de postman raw. "deserializar"
app.use(morgan('dev'));

//CONTROLADORES DE USUARIOS**************************************************
const newUser = require('./controllers/usuarios/newUser');
const loginUser = require('./controllers/usuarios/loginUser');

//Endpoints. COMENZAMOS AQUÍ A INCLUIR LOS ENDPOINTS DEL PROYECTO
//REGISTRO DE USUARIO
app.post('/register', newUser);

//LOGIN DE USUARIO
app.post('/login', loginUser);
//gestión de errores: Error y Not Found (Middleware de errory not found)

//######################################-NOTAS-
//CONTROLADORES
// const newNote = require('./controllers/notas/newNotes');

//MIDDLEWEARES
//######################################

//INSERTAR UNA NUEVA NOTA
// app.post('/note/new', isAuth, newNote); //hace falta un middleware que se llame así

//#################

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
