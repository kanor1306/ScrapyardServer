var usersController = require('../controller/user');

exports.list = function (req, res) {
    console.log("Entrando router User.js: list")
    usersController.list().then(
        function (controllerResponse) {
            res.send(controllerResponse);
        },
        function (err) {
            res.send(err.message);
        }
    );
}
exports.detail = function (req, res) {
    console.log("Entrando router User.js: detail")
    var userId = req.params.userId;
    usersController.detail(userId).then(
        function (controllerResponse) {
            res.send(controllerResponse);
        },
        function (err) {
            res.send(err.message);
        }
    );
}
exports.albums = function (req, res) {
    console.log("Entrando router User.js: albums")
    var userId = req.params.userId;
    usersController.albums(userId).then(
        function (controllerResponse) {
            res.send(controllerResponse);
        },
        function (err) {
            res.send(err.message);
        }
    );
}
exports.createUser = function (req, res) {
    console.log("Entrando router User.js: createUser")
    var userInfo = req.body.userInfo;
    var gameId = req.body.gameId;
    var username = req.body.username;
    usersController.createUser(username, gameId, userInfo).then(
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

exports.updateUser = function (req, res) {
    console.log("Entrando router User.js: updateUser")
    var userInfo = req.body.userInfo;
    var userId = req.body.userId;
    usersController.updateUser(userId, userInfo).then(
        function (controllerResponse) {
            res.writeHead(201, {'Content-Type': 'text/html'})
            res.end("Created");
        },
        function (err) {
            res.writeHead(400, {'Content-Type': 'text/html'})
            res.end(err.message);
        }
    );
}

exports.deleteUser = function(req, res){
    console.log("Entrando router User.js: deleteUser")
    var idUser = req.params.userId;
    usersController.deleteUser(idUser).then(
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
