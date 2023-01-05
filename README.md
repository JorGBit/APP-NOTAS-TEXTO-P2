--------------NOTAS SOBRE EL PROYECTO------------------------------------------------------

Para la ejecución de este proyecto seguir los siguientes pasos:

1-Crear una base de datos vacía en una instancia MySQL en local.
2-CREATE DATABASE IF NOT EXISTS "proyectobootcamp2";
3-Copiar el archivo .env y rellenar las variables de entorno con sus datos necesarios.
4-Crear la carpeta static en la raiz del proyecto con las subcarpetas static/avatar y static/nota.
5-Ejecutar npm i para instalar todas las dependencias necesarias.
6-El comando npm run db ejecutará la creación de las tablas e inserción de algunos datos de ejemplo.
7-Ejecutar el comando npm run dev para poner a la escucha al servidor.
8-Importar la colección PostmanCollection.json a la aplicación de Postman con todos los endpoints creados.

--------------ENDPOINTS APP NOTAS-----------------------------------------------------------

ENDPOINTS PROYECTO✅

USUARIOS ✅✅✅


* POST[/register] - Registra un nuevo usuario. ✅

* POST[/login] - Login de usuario. (devuelve un token). ✅


NOTAS ✅✅✅


* POST[/products/new] - Inserta una nueva nota. TOKEN (hace falta que usuario haya iniciado sesión, crear su Middleware). Crear una nueva nota. Título, texto y categoria única (las categorías son fijas, no se pueden editar) 

* PUT[/products/:idnotas] - Edita datos de una nota del usuario. TOKEN. 

* GET[/notas] - Lista todos las notas. Ver listado de todas las notas del usuario (sólo ver títulos, cada usuario solo ve sus notas) 

* GET[/notas] - Ver una sola nota  

(OPCIONALES)

* DELETE[/products/:idnotas] - Elimina una nota. TOKEN. 

* POST[/products/:idnotas/photo] - Añade una nueva foto a la nota. TOKEN. 

* Marcar una nota como pública. TODAS SON POR DEFECTO PRIVADAS

* Crear, editar y borrar categorías.
