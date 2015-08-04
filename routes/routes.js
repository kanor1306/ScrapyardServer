/**
 * Created by nicanor.gutierrez on 10/01/14.
 *
 * En esta fichero se invoca a los diferentes ficheros que gestionan las peticiones.
 * Se dividen según el contexto de las peticiones que manejan.
 *
 */

exports.index = require('./index');

//Router genre WS
exports.genre = require('./genre');
exports.genre_type = require('./genre_type');


