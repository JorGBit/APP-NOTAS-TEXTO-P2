--------------NOTAS SOBRE EL PROYECTO------------------------------------------------------

Para la ejecución de este proyecto deberemos hacer lo siguiente :)

1-Crear una base de datos vacía en una instancia MySQL en local.

2-CREATE DATABASE IF NOT EXISTS "proyectobootcamp2";

3-Copiar el archivo  copia.env y renombrar como ".env". Después, rellenar las variables de entorno con sus datos necesarios. 

4-Crear la carpeta static en la raiz del proyecto con la subcarpeta static/notasImagen. Aquí el proyecto conservará las imágenes que los usuarios suban a las notas

5-Ejecutar npm i para instalar todas las dependencias necesarias que indique el package

6-El comando npm run db ejecutará la creación de las tablas. Deberás realizar las peticiones en postman para incluir nuevos datos en las bases de datos, ya que en el proyecto no incluímos datos de ejemplo. Haz la prueba importando datos de postman según los datos de las tablas de las bases de datos.

7-Ejecutar el comando npm run dev para poner a la escucha al servidor. Nos estará escuchando en el puerto 4000

8-Importar la colección PostmanCollection.json a la aplicación de Postman con todos los endpoints creados. Lo adjuntamos a continuación.

--------------ENDPOINTS APP NOTAS-----------------------------------------------------------

El proyecto realiza las siguientes funcionalidades

-------DE CARA A LOS USUARIOS:

POST[/register] - Registra un nuevo usuario.

POST[/login] - Login de usuario. (devuelve un token).

-------DE CARA A LAS NOTAS:

POST[/notes/new] - Inserta una nueva nota. Debemos estar logeados para poder crear una nueva nota. Debemos incluir los siguientes datos: Título, texto y categoria única.

PUT[/notesEdit/:idNotes] - Edita datos de una nota del usuario. El usuario debe estar logeado.

GET[/notes] - Lista todos las notas. Sólo se ven los títulos y el id. (ha faltado que sólo sea el usuario el que puede revisar sus notas...la lista la lanza de todas las existentes, ha faltado que sólo haga select en la base de datos si el logeo coincide con el id del usuario que ha creado la nota, lo programaremos para el próximo proyecto por falta de tiempo aunque la lógica la entendemos).

GET[/noteInfo/:idNote] - Ver información de una sola nota.

DELETE[/notes/:idNotes] - Elimina una nota. El usuario debe estar logeado.

POST[/notes/:idNotes/photo] - Añade una nueva foto a la nota. El usuario debe estar logeado.
