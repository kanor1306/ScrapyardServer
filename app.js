
//Importamos el servidor Pushd para que se ejecute al lanzar el servidor. Necesario haber lanzado antes Redis.
require('./pushd/server');
var cors = require('cors')
//Importamos express para gestionar el enrutado de las peticiones
var express = require('express');
//Importamos el fichero routes que enlaza con todos los enrutadores de las peticiones
var routes = require('./routes/routes');
var http = require('http');
var path = require('path');

var url = require("url");

var swagger = require("swagger-node-express");

var models = require("./swagger_models/models");

var app = express();

// all environments

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.static(__dirname + "/../public"));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

swagger.setAppHandler(app);
swagger.addModels(models.getModels());

app.get('/',function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

//List of users in the system
var listUsers = {
    'spec': {
        "description" : "List of users in the system",
        "path" : "/user",
        "notes" : "Returns a list of users",
        "summary" : "Users list",
        "method": "GET",
        "type" : "Collection[User]",
        "errorResponses" : [swagger.errors.notFound('pet')],
        "nickname" : "listUsers"
    },
    'action': function (req,res) {
        routes.user.list(req, res);
    }
};

swagger.addGet(listUsers);

//Details of an user
var detailUser = {
    'spec': {
        "description" : "Details of an user in the system",
        "path" : "/user/{userId}",
        "notes" : "Returns the details of an user",
        "summary" : "Details of an user",
        "method": "GET",
        "type" : "UserDetail",
        "parameters" : [swagger.pathParam("userId", "ID of the user", "integer")],
        "errorResponses" : [swagger.errors.notFound('user')],
        "nickname" : "detailUser"
    },
    'action': function (req,res) {
        routes.user.detail(req, res);
    }
};

swagger.addGet(detailUser);

//List of albums belonged by a user
var userDevices = {
    'spec': {
        "description" : "User albums",
        "path" : "/user/{userId}/albums",
        "notes" : "Returns the albums of an user",
        "summary" : "Albums of an user",
        "method": "GET",
        "type" : "Collection[Device]",
        "parameters" : [swagger.pathParam("userId", "User id", "integer")],
        "errorResponses" : [swagger.errors.notFound('user')],
        "nickname" : "userDevices"
    },
    'action': function (req,res) {
        routes.user.devices(req, res);
    }
};

swagger.addGet(userDevices);


//Creation of new user in the system
var createUser = {
    'spec': {
        "description" : "User regisration",
        "path" : "/user",
        "notes" : "Method used to register a new user in the system",
        "summary" : "User regisration",
        "method": "POST",
        "parameters": [
            {
                "name": "user",
                "description": "user to register",
                "required": true,
                "type": "UserCreation",
                "paramType": "body"
            }
        ],
        "errorResponses" : [swagger.errors.notFound('user')],
        "nickname" : "createUser",
        "type":"UserCreationResponse"
    },
    'action': function (req,res) {
        routes.user.createUser(req, res);
    }
};

swagger.addPost(createUser);

//Update user information
var updateUser = {
    'spec': {
        "description" : "Update user information",
        "path" : "/user/{userId}",
        "notes" : "Method used to update the information about the user",
        "summary" : "Update user",
        "method": "POST",
        "parameters": [
            {
                "name": "userId",
                "description": "Id of the user to be updated",
                "required": true,
                "type": "integer",
                "paramType": "path"
            },
            {
                "name": "user",
                "description": "Data to update",
                "required": true,
                "type": "User",
                "paramType": "body"
            }
        ],
        "errorResponses" : [swagger.errors.notFound('user')],
        "nickname" : "updateUser"
    },
    'action': function (req,res) {
        routes.user.updateUser(req, res);
    }
};

swagger.addPut(updateUser);

//Delete user
var deleteUser = {
    'spec': {
        "description" : "Delete user",
        "path" : "/user/{userId}",
        "notes" : "Method used to delete an user from the system",
        "summary" : "Delete user",
        "method": "DELETE",
        "parameters": [
            {
                "name": "userId",
                "description": "Id of the user",
                "required": true,
                "type": "integer",
                "paramType": "path"
            }
        ],
        "errorResponses" : [swagger.errors.notFound('user')],
        "nickname" : "deleteUser"
    },
    'action': function (req,res) {
        routes.user.deleteUser(req, res);
    }
};

swagger.addDelete(deleteUser);

//List of games in the system
var listApps = {
    'spec': {
        "description" : "List of games in the system",
        "path" : "/game",
        "notes" : "Returns a list of games",
        "summary" : "List of games",
        "method": "GET",
        "type" : "Collection[Application]",
        "errorResponses" : [swagger.errors.notFound('pet')],
        "nickname" : "listGames"
    },
    'action': function (req,res) {
        routes.game.list(req, res);
    }
};

swagger.addGet(listGames);

//Detalle de una aplicación
var detailGame = {
    'spec': {
        "description" : "Detail of a game",
        "path" : "/game/{gameId}",
        "notes" : "Return details about a game",
        "summary" : "Details of a game",
        "method": "GET",
        "type" : "Application",
        "parameters" : [swagger.pathParam("gameId", "Id of the application", "integer")],
        "errorResponses" : [swagger.errors.notFound('game')],
        "nickname" : "detailGame"
    },
    'action': function (req,res) {
        routes.game.detail(req, res);
    }
};

swagger.addGet(gameApp);

//Listado de usuarios de una aplicación
var listGameUsers = {
    'spec': {
        "description" : "User list for a game",
        "path" : "/game/{gameId}/users",
        "notes" : "Returns a list of user that uses a specific game.",
        "summary" : "List of users in a game",
        "method": "GET",
        "parameters" : [swagger.pathParam("gameId", "Id of the game that will be queried", "integer")],
        "type" : "Collection[User]",
        "errorResponses" : [swagger.errors.notFound('pet')],
        "nickname" : "listGameUsers"
    },
    'action': function (req,res) {
        routes.application.users(req, res);
    }
};

swagger.addGet(listGameUsers);

//Listado de dispositivos asociados a una aplicación
var listGameAlbums = {
    'spec': {
        "description" : "List of albums associated with a game",
        "path" : "/game/{gameId}/albums",
        "notes" : "Returns a list of albums associated to a game",
        "summary" : "List of albums associated to a game",
        "method": "GET",
        "parameters" : [swagger.pathParam("appId", "Id of the game that will be queried", "integer")],
        "type" : "Collection[Album]",
        "errorResponses" : [swagger.errors.notFound('pet')],
        "nickname" : "listGameAlbums"
    },
    'action': function (req,res) {
        routes.game.albums(req, res);
    }
};

swagger.addGet(listGameAlbums);

//Crete a new game
var createGame = {
    'spec': {
        "description" : "Register of a game",
        "path" : "/game",
        "notes" : "Method uszed to register a new game in the system",
        "summary" : "Register of a new application",
        "method": "POST",
        "parameters": [
            {
                "name": "game",
                "description": "Game to register",
                "required": true,
                "type": "ApplicationCreation",
                "paramType": "body"
            }
        ],
        "errorResponses" : [swagger.errors.notFound('game')],
        "type":"GameCreationResponse",
        "nickname" : "createGame"
    },
    'action': function (req,res) {
        routes.game.create(req, res);
    }
};

swagger.addPost(createGame);

//Delete game
var deleteGame = {
    'spec': {
        "description" : "Deletion of a game",
        "path" : "/game/{gameId}",
        "notes" : "Method used to delete a game from the systema",
        "summary" : "Delete a game",
        "method": "DELETE",
        "parameters": [
            {
                "name": "gameId",
                "description": "Id of the game",
                "required": true,
                "type": "integer",
                "paramType": "path"
            }
        ],
        "errorResponses" : [swagger.errors.notFound('game')],
        "nickname" : "deleteGame"
    },
    'action': function (req,res) {
        routes.game.deleteGame(req, res);
    }
};

swagger.addDelete(deleteGame);

//List of albums in the system
var listAlbums = {
    'spec': {
        "description" : "List of albums in the system",
        "path" : "/album",
        "notes" : "Returns a list of albums",
        "summary" : "List of albums",
        "method": "GET",
        "type" : "Collection[Album]",
        "errorResponses" : [swagger.errors.notFound('pet')],
        "nickname" : "listAlbums"
    },
    'action': function (req,res) {
        routes.album.list(req, res);
    }
};

swagger.addGet(listAlbums);

//Detail of an album
var detailAlbum = {
    'spec': {
        "description" : "Detail of an album in the system",
        "path" : "/album/{albumId}",
        "notes" : "Returns details about an album",
        "summary" : "Details of an album",
        "method": "GET",
        "type" : "AlbumDetail",
        "parameters" : [swagger.pathParam("albumId", "Id of the album in the system", "integer")],
        "errorResponses" : [swagger.errors.notFound('album')],
        "nickname" : "detailAlbum"
    },
    'action': function (req,res) {
        routes.album.detail(req, res);
    }
};

swagger.addGet(detailAlbum);

//Update album
var updateAlbum = {
    'spec': {
        "description" : "Update of an album",
        "path" : "/album/{albumId}",
        "notes" : "Method used to update the information about an album",
        "summary" : "Update of an album",
        "method": "POST",
        "parameters": [
            {
                "name": "albumId",
                "description": "Id of the album in the system",
                "required": true,
                "type": "integer",
                "paramType": "path"
            },
            {
                "name": "album",
                "description": "Information to update",
                "required": true,
                "type": "AlbumCreation",
                "paramType": "body"
            }
        ],
        "errorResponses" : [swagger.errors.notFound('albumId')],
        "nickname" : "updateAlbum"
    },
    'action': function (req,res) {
        routes.album.updateAlbum(req, res);
    }
};

swagger.addPut(updateAlbum);

//Creation of a new album in the system
var createDevice = {
    'spec': {
        "description" : "Creation of a new album in the system",
        "path" : "/album",
        "notes" : "Method used to registr albums in the system",
        "summary" : "Register an album",
        "method": "POST",
        "parameters": [
            {
                "name": "album",
                "description": "Album to be registered",
                "required": true,
                "type": "AlbumCreation",
                "paramType": "body"
            }
        ],
        "errorResponses" : [swagger.errors.notFound('album')],
        "type":"AlbumCreationResponse",
        "nickname" : "createAlbm"
    },
    'action': function (req,res) {
        routes.album.registerAlbum(req, res);
    }
};

swagger.addPost(createAlbum);

//Delete an album
var deleteAlbum = {
    'spec': {
        "description" : "Deletion of an album",
        "path" : "/album/{albumId}",
        "notes" : "Method used to delete an album from the system",
        "summary" : "Deletion of an album",
        "method": "DELETE",
        "parameters": [
            {
                "name": "albumId",
                "description": "d of the album in the system",
                "required": true,
                "type": "integer",
                "paramType": "path"
            }
        ],
        "errorResponses" : [swagger.errors.notFound('album')],
        "nickname" : "deleteAlbum"
    },
    'action': function (req,res) {
        routes.albvum.deleteAlbum(req, res);
    }
};

swagger.addDelete(deleteAlbum);

swagger.configure("http://localhost:3000", "0.1");

//Creación del servidor
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
