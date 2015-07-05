/*
 * Enrutador a los servicios web de las aplicaciones
 */

//Importamos el controlador de los servicios web de las aplicaciones
var gamesController = require('../controller/games');

//Maneja la petición de un listado de aplicaciones.
//Cada elemento llevará los siguientes campos id_game, name
//Lo envía en el response de la petición en formato JSON.
//En caso de error devuelve el mensaje correspondiente.
exports.list = function (req, res) {
    console.log("Entrando router Game.js: list")
    gamesController.list().then(
        function (controllerResponse) {
            res.send(controllerResponse);
        },
        function (err) {
            res.send(err.message);
        }
    );
}

//Maneja la petición del detalle de una aplicación.
//El objeto que se devolverá contendrá los siguientes campos: id_game, name
//Lo envía en la response de la petición en formato JSON.
exports.detail = function (req, res) {
    console.log("Entrando router Game.js: detail")
    var appId = req.params.appId;
    gamesController.detail(appId).then(
        function (controllerResponse) {
            res.send(controllerResponse);
        },
        function (err) {
            res.send(err.message);
        }
    );
}

//Maneja la petición del listado de dispositivos asociados a una aplicación.
//El objeto que se devolverá contendrá los siguientes campos: uuid, protocol, album_info, notification_info, pushd_id, id_album, id_user, artist, model, id_game
//Lo envía en la response de la petición en formato JSON.
exports.albums = function (req, res) {
    console.log("Entrando router Game.js: albums")
    var appId = req.params.appId;
    gamesController.albums(appId).then(
        function (controllerResponse) {
            res.send(controllerResponse);
        },
        function (err) {
            res.send(err.message);
        }
    );
}

//Maneja la petición del listado de usuarios asociados a una aplicación.
//El objeto que se devolverá contendrá los siguientes campos: id_game, user_info, id_user, username
//Lo envía en la response de la petición en formato JSON.
exports.users = function (req, res) {
    console.log("Entrando router Game.js: users")
    var appId = req.params.appId;
    gamesController.users(appId).then(
        function (controllerResponse) {
            res.send(controllerResponse);
        },
        function (err) {
            res.send(err.message);
        }
    );
}

exports.create = function (req, res) {
    console.log("Entrando router Game.js: create")
    var gameInfo = req.body;
    gamesController.create(gameInfo).then(
        function (controllerResponse) {
            res.writeHead(201, {'Content-Type': 'text/html'})
            res.end(JSON.stringify(controllerResponse));
        },
        function (err) {
            res.writeHead(400, {'Content-Type': 'text/html'})
            res.end(err.message);
        }
    );
}


exports.deleteApp = function(req, res){
    console.log("Entrando router Game.js: deleteApp")
    var idApp = req.params.appId;
    gamesController.deleteApp(idApp).then(
        function (controllerResponse) {
            res.writeHead(204, {'Content-Type': 'text/html'})
            res.end("Deleted");
        },
        function (err) {
            res.writeHead(400, {'Content-Type': 'text/html'})
            res.end(err.message);
        }
    );
}