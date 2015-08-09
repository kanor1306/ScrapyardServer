var Bookshelf = require('./my_modules/utils/bookshelf');

var cors = require('cors')
var express = require('express');
var routes = require('./routes/routes');
var http = require('http');
var path = require('path');
var url = require("url");

var swagger = require("swagger-node-express");
var swagger_models = require("./swagger_models/models");

var genreWS = require("./services/genre");
var genreTypeWS = require("./services/genre_type");

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

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

genreWS.addToSwagger(swagger, routes)
genreTypeWS.addToSwagger(swagger, routes);

swagger.configure("http://localhost:3000", "0.1");

//Creación del servidor
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
