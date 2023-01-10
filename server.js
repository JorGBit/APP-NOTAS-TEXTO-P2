const express = require('express');
const morgan = require('morgan'); //esto envía más información sobre las consultas realizadas en postman
const canEditNote = require('./middlewares/canEditNote');
const fileUpload = require('express-fileupload');

require('dotenv').config();

const app = express();

//Deserializar body formato raw
app.use(express.json()); //super necesario para poder leer los json del body de postman raw. "deserializar"
app.use(morgan('dev'));
app.use(express.static('static'));
//leer body fomrato form-data
app.use(fileUpload());

//*******************************
const isAuth = require('./middlewares/isAuth');
const newUser = require('./controllers/usuarios/newUser');
const loginUser = require('./controllers/usuarios/loginUser');
const getUser = require('./controllers/usuarios/getUser');

//REGISTRO DE USUARIO
app.post('/register', newUser);
//LOGIN DE USUARIO
app.post('/login', loginUser);
//DEVOLVER INFO DE UN USUARIO
app.get('/users/:idUser', getUser);
//MODIFICAR EMAIL O USUARIO
app.put('/users/:idUser', isAuth);

//######################################-NOTAS-
//CONTROLADORES
const newNotes = require('./controllers/notas/newNotes');
const addNotesPhoto = require('./controllers/notas/addNotesPhoto');
const editNote = require('./controllers/notas/editNote');
const listNotes = require('./controllers/notas/listNotes');
const noteInfo = require('./controllers/notas/noteInfo');
const deleteNotes = require('./controllers/notas/deleteNotes');
//MIDDLEWEARES
//######################################

//INSERTAR UNA NUEVA NOTA
app.post('/notes/new', isAuth, newNotes);
//hace falta un middleware que se llame así

//DEVOLVER INFORMACIÓN DE LA NOTA .. hay que hacerlo con el logeo.
app.get('/noteInfo/:idNote', noteInfo);

//EDITAR DATOS DE LAS NOTAS
app.put('/notesEdit/:idNotes', isAuth, canEditNote, editNote);

//Añadir nueva foto de nota
app.post('/notes/:idNotes/photo', isAuth, canEditNote, addNotesPhoto);

// //Eliminamos una nota
app.delete('/notes/:idNotes', isAuth, canEditNote, deleteNotes);
//Lista de notas
app.get('/notes', isAuth, listNotes);

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

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
