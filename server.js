const express = require('express');
const morgan = require('morgan'); //esto envía más información sobre las consultas realizadas en postman
const canEditNote = require('./middlewares/canEditNote');
const fileUpload = require('express-fileupload');

require('dotenv').config();
///Conexión a la base de datos
const app = express();

//Deserializar body formato raw
app.use(express.json()); //super necesario para poder leer los json del body de postman raw. "deserializar"
app.use(morgan('dev'));
app.use(express.static('static'));
//leer body fomrato form-data
app.use(fileUpload());
//MIDDLEWARES*******************************
const isAuth = require('./middlewares/isAuth');

//CONTROLADORES DE USUARIOS**************************************************
const newUser = require('./controllers/usuarios/newUser');
const loginUser = require('./controllers/usuarios/loginUser');
const getUser = require('./controllers/usuarios/getUser');

//Endpoints. COMENZAMOS AQUÍ A INCLUIR LOS ENDPOINTS DEL PROYECTO
//REGISTRO DE USUARIO
app.post('/register', newUser);

//LOGIN DE USUARIO
app.post('/login', loginUser);

//DEVOLVER INFO DE UN USUARIO
app.get('/users/:idUser', getUser);

//MODIFICAR EMAIL O USUARIO
app.put('/users/:idUser', isAuth);

//gestión de errores: Error y Not Found (Middleware de errory not found)

//LISTAR LAS NOTAS

const listNotes = require('./controllers/notas/listNotes');
app.get('/notes', isAuth, listNotes);

//######################################-NOTAS-
//CONTROLADORES
const newNotes = require('./controllers/notas/newNotes');
const addNotesPhoto = require('./controllers/notas/addNotesPhoto');
const editNote = require('./controllers/notas/editNote');
//MIDDLEWEARES
//######################################

//INSERTAR UNA NUEVA NOTA
app.post('/notas/new', isAuth, newNotes);
//hace falta un middleware que se llame así

//EDITAR DATOS DE LAS NOTAS
app.put('/notes/:idNotes', isAuth, canEditNote, editNote);
//Añadir nueva foto de producto
app.post('/notes/:idNotes/photo', isAuth, canEditNote, addNotesPhoto);
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
