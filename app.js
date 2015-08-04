
var Bookshelf = require('./my_modules/utils/bookshelf');

var cors = require('cors')
var express = require('express');
var routes = require('./routes/routes');
var http = require('http');
var path = require('path');
var url = require("url");

var swagger = require("swagger-node-express");
var swagger_models = require("./swagger_models/models");

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
swagger.addModels(swagger_models.getModels());

app.get('/',function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

//List of users in the system
var genreList = {
    'spec': {
        "description" : "List of genres in the system",
        "path" : "/genre/list",
        "notes" : "Returns a list of genres",
        "summary" : "Genres list",
        "method": "GET",
        "type" : "Collection[Genre]",
        "errorResponses" : [swagger.errors.notFound('Genre')],
        "nickname" : "genreList"
    },
    'action': function (req,res) {
        routes.genre.list(req, res);
    }
};

swagger.addGet(genreList);

//Details of an user
var genreDetail = {
    'spec': {
        "description" : "Details of a genre in the system",
        "path" : "/genre/detail/{id_genre}",
        "notes" : "Returns the details of a genre",
        "summary" : "Details of a genre",
        "method": "GET",
        "type" : "Genre",
        "parameters" : [swagger.pathParam("id_genre", "Id of the genre", "integer")],
        "errorResponses" : [swagger.errors.notFound('Genre')],
        "nickname" : "genreDetail"
    },
    'action': function (req,res) {
        routes.genre.detail(req, res);
    }
};

swagger.addGet(genreDetail);

//List of genres by genre type
var genreListByType = {
    'spec': {
        "description" : "List of genres by genre type",
        "path" : "/genre/listByType/{id_genre_type}",
        "notes" : "Returns the list of genres filteres by its genre type",
        "summary" : "List of genres by type",
        "method": "GET",
        "type" : "Collection[Genre]",
        "parameters" : [swagger.pathParam("id_genre_type", "Id genre type", "integer")],
        "errorResponses" : [swagger.errors.notFound('GenreType')],
        "nickname" : "genreListByType"
    },
    'action': function (req,res) {
        routes.genre.listByType(req, res);
    }
};

swagger.addGet(genreListByType);


//Creation of new genre in the system
var genreCreation = {
    'spec': {
        "description" : "Create a new genre",
        "path" : "/genre/create",
        "notes" : "Method used to create a new genre in the system",
        "summary" : "Genre creation",
        "method": "POST",
        "parameters": [
            {
                "name": "genre",
                "description": "genre to create",
                "required": true,
                "type": "Genre",
                "paramType": "body"
            }
        ],
        "errorResponses" : [swagger.errors.notFound('user')],
        "nickname" : "createGenre",
        "type":"Genre"
    },
    'action': function (req,res) {
        routes.genre.create(req, res);
    }
};

swagger.addPost(genreCreation);

//Update user information
var genreUpdate = {
    'spec': {
        "description" : "Update genre information",
        "path" : "/genre/update",
        "notes" : "Method used to update the information about a genre",
        "summary" : "Update genre",
        "method": "PUT",
        "parameters": [
            {
                "name": "genre",
                "description": "Genre to update",
                "required": true,
                "type": "Genre",
                "paramType": "body"
            }
        ],
        "errorResponses" : [swagger.errors.notFound('Genre')],
        "nickname" : "genreUpdate"
    },
    'action': function (req,res) {
        routes.genre.update(req, res);
    }
};

swagger.addPut(genreUpdate);

//Delete user
var genreRemoval = {
    'spec': {
        "description" : "Delete genre",
        "path" : "/genre/destroy/{id_genre}",
        "notes" : "Method used to delete a genre from the system",
        "summary" : "Delete genre",
        "method": "DELETE",
        "parameters": [
            {
                "name": "id_genre",
                "description": "Id of the genre",
                "required": true,
                "type": "integer",
                "paramType": "path"
            }
        ],
        "errorResponses" : [swagger.errors.notFound('Genre')],
        "nickname" : "genreRemoval",
        "type" : "Genre"
    },
    'action': function (req,res) {
        routes.genre.destroy(req, res);
    }
};

swagger.addDelete(genreRemoval);

swagger.configure("http://localhost:3000", "0.1");

//Creación del servidor
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
