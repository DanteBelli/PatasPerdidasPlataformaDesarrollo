Alumno: Dante Bellizzi.

Materia: Plataforma de Desarrollo. 

Curso: ACN4AV. 

Profesor: Villafañe Victor Emanuel.


Proyecto: La idea del proyecto es crear una página web para facilitar la búsqueda de mascotas perdidas.
Para esto, se utilizará un mapa (OpenStreetMap es gratuita), en el cual el usuario, previamente logueado, podrá ingresar la ubicación donde perdió o encontró una mascota. 
Para las mascotas perdidas se utilizará en la marca un pin rojo, y para las encontradas, un pin azul. La idea es que al mirar el mapa se vean los diferentes puntos marcados, y al hacer clic sobre alguno de ellos se muestre un resumen con la información de la mascota. En una primera etapa, el proyecto contemplará las funciones básicas, con la posibilidad de seguir creciendo. 
Inicialmente, los usuarios podrán registrarse, hacer un ABM de su mascota, y en caso de haber un match entre una mascota perdida y una encontrada, se podrá cerrar el caso, eliminando los pines del mapa para mantenerlo ordenado. 
Algunos datos del formulario de carga de mascotas serán opcionales y otros obligatorios. Dentro de los obligatorios, algunas opciones estarán predeterminadas, ya que en el futuro se podría cruzar información automáticamente para buscar coincidencias mediante procesos internos.
Detalle de pantallas:
Pantalla 1: Será la pantalla de inicio de sesión (Login), con la opción de crear un usuario mediante correo electrónico o ingresar con Gmail/Facebook. 
Pantalla 2: Será la pantalla principal, donde se mostrará un mapa con los pines de mascotas cargadas. Al hacer clic sobre un pin, se abrirá una ventana con la información de la mascota. En esta pantalla también habrá una opción para agregar una nueva mascota.
Pantalla 3: Pantalla para la carga de mascotas, donde se solicitará especificar si la mascota fue perdida o encontrada, la ubicación del suceso, una foto y demás información relevante. 
Pantalla 4: En caso de que se confirme un match y la mascota regrese con sus dueños, desde esta pantalla se podrá cerrar el caso. Al hacerlo, se eliminarán automáticamente del mapa ambos pines, tanto el de pérdida como el de hallazgo.Esta pantalla solo tendran acceso los usuarios con rol de Administrador

Los usuarios Predeterminados para probar son los siguientes:
Usuario:  mascotaperdida@gmail.com
Contraseña: prueba123
ROL: Usuario con una mascota perdida ya cargada

Usuario2: mascotaencontrada@gmail.com
Contraseña: prueba123
Rol: Usuario con mascota encontrada ya cargada.

Usuario3; administrador@gmail.com
Contraseña: prueba123
Rol: Usuario administrador , habilitado para cerrar casos.

Instrucciones de uso
    Descargar el repositorio , a la computadora local usando git pull y la url.
    Luego en la terminal usar el comando npm install , y npm install leaflet react-leaflet(este mismo es una libreria para poder usar el OpenStreetMap), luego npm start para ejecutar el proyecto.
    Por  utlimo en la misma terminal escribir npm start , y se abrira una ventana del explorador con la pagina web.

Link de Entrega: https://github.com/DanteBelli/PatasPerdidasPlataformaDesarrollo.git

