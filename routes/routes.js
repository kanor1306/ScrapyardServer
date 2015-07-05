/**
 * Created by nicanor.gutierrez on 10/01/14.
 *
 * En esta fichero se invoca a los diferentes ficheros que gestionan las peticiones.
 * Se dividen según el contexto de las peticiones que manejan.
 *
 */

//Enrutador a los servicios web de dispositivos
exports.index = require('./index');

//Enrutador a los servicios web de dispositivos
exports.album = require('./album');

//Enrutador a los servicios web de aplicaciones
exports.game = require('./game');

//Enrutador a los servicios web de usuarios
exports.user = require('./user');
