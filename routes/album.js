var albumsController = require('../controller/albums');
var Constants = require('../Constants');

//Handle the album list request
//Each elemnt has the following fields:  uuid, album_name, artist, id_album, id_user
//Lo envía en el response de la petición en formato JSON.
//En caso de error devuelve el mensaje correspondiente.
exports.list = function (req, res) {
    console.log("Entrando router Album.js: list")
    albumsController.list().then(
        function (controllerResponse) {
            res.send(controllerResponse);
        },
        function (err) {
            res.send(err.message);
        }
    );
}

//Maneja la petición del detalle de un dispositivo.
//El objeto que se devolverá contendrá los siguientes campos uuid, protocol, album_info, notification_info, pushd_id, id_album, id_user, artist, model
//Lo envía en la response de la petición en formato JSON.
exports.detail = function (req, res) {
    console.log("Entrando router Album.js: detail")
    var albumId = req.params.albumId;
    albumsController.detail(albumId).then(
        function (controllerResponse) {
            res.send(controllerResponse);
        },
        function (err) {
            res.send(err.message);
        }
    );
}

//Maneja la petición de registro de un dispositivo en el servidor
//Recibe un objeto json con los siguientes campos: proto, uuid, albumInfo, notificationsInfo, gameId y username.
//Si el usuario de la aplicación es un usuario anónimo no se enviará username.
//En la response se devolverá un código 201 si se crea o 200 si se actualiza el dispositivo correctamente, sino se devolverá un código de error.
exports.registerAlbum = function (req, res) {
    console.log("Entrando router Album.js: registerAlbum")
    //Recojo las propiedades del dispositivo que vienen en el JSON.
    var proto = req.body.proto;
    var uuid = req.body.uuid;
    var albumInfo = req.body.albumInfo;
    var gameId = req.body.gameId;
    var username = req.body.username;
    var token = req.body.token;
    var artist = req.body.artist;
    var album_name = req.body.album_name;


    //Si no existe username, será un usuario anónimo, si existe, un usuario que previamente fue registrado.
    if (username == undefined) {
        var userId = Constants.ANONYMOUS_USER_ID;
        //Llamamos al método del controlador que registrab a los dispositivos de usuarios anónimos
        albumsController.registerAlbumWithAnonymousUser(uuid, albumInfo, gameId, artist, album_name).then(
            function (controllerResponse) {
                res.writeHead(201, {'Content-Type': 'text/html'})
                res.end(JSON.stringify(controllerResponse[0][0]));
            },
            function (err) {
                res.writeHead(400, {'Content-Type': 'text/html'})
                res.end(err.message);
            }
        );
    } else {
        //Llamamos al método del controlador que registra a los dispositivos de usuarios registrados
        albumsController.registerAlbumWithLoggedUser(username, uuid, albumInfo, gameId,  artist, album_name).then(
            function (controllerResponse) {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.end("OK");
            },
            function (err) {
                res.writeHead(400, {'Content-Type': 'text/html'})
                res.end(err.message);
            }
        );
    }

}


//Maneja la petición de actualización de un dispositivo.
//Recibe en la petición los siguientes campos: albumInfo
exports.updateAlbum = function(req, res){

}



exports.deleteAlbum = function(req, res){
    console.log("Entrando router Album.js: deleteAlbum")
    var idAlbum = req.params.albumId;
    albumsController.deleteAlbum(idAlbum).then(
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