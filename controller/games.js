
var db = require('./db');
var Promise = require('bluebird');
var utils = require('../my_modules/utils/utils.js');

exports.create = function (game) {
    console.log("Entrando controller Game.js: create")
    var gameName = game.name;
   // TODO: var infoRegistro = processRegisterInfo(game.plataformas, game.infoRegistroPush);
    var infoRegistro = [];

    var query_create_game = "INSERT INTO game (name) VALUES ($1) RETURNING id_game"
    var values_create_game = [gameName];

    var queries = new Array();
    queries.push({query: query_create_game, values: values_create_game});

    var query_insert_register_info = "INSERT INTO game_platform (id_game, id_platform,notifications_info) VALUES (currval('game_id_game_seq'),$1,$2) ";
    for (var i = 0; i < infoRegistro.length; i++) {
        queries.push({query: query_insert_register_info, values: infoRegistro[i]});
    }

    return db.transactionalQuery(queries).then(
        function (result) {
            return result[0][0];
        },
        function (err) {
            throw err;
        });
}

exports.list = function () {
    console.log("Entrando controller Game.js: list")
    var query = "SELECT id_game, name FROM public.game"
    var values = [];
    return db.query(query, values).then(function (games) {
        return JSON.stringify(games);
    });
}

exports.detail = function (gameId) {
    console.log("Entrando controller Game.js: detail")
    var query = "SELECT * FROM public.game WHERE id_game=$1"
    var values = [gameId];
    return db.query(query, values).then(function (game) {
        return JSON.stringify(game[0]);
    });
}

exports.albums = function (gameId) {
    console.log("Entrando controller Game.js: albums")
    var query = "SELECT uuid, pushd_id,model, artist, d.id_album, id_user FROM public.album d INNER JOIN game_album a_d ON a_d.id_album=d.id_album WHERE a_d.id_game=$1"
    var values = [gameId];
    return db.query(query, values).then(function (albums) {
        return JSON.stringify(albums);
    });
}

exports.users = function (gameId) {
    console.log("Entrando controller Game.js: users")
    var query = "SELECT * FROM public.user WHERE id_game=$1"
    var values = [gameId];
    return db.query(query, values).then(function (users) {
        return JSON.stringify(users);
    });
}

function processRegisterInfo(platforms, registerInfo) {
    console.log("Entrando controller Game.js: processRegisterInfo")
    var registerInfoRet = new Array();
    for (var i = 0; i < platforms.length; i++) {
        var registerInfoPlatform = new Array();
        registerInfoPlatform.push(platforms[i]);
        registerInfoPlatform.push(JSON.stringify(registerInfo[i]));
        registerInfoRet.push(registerInfoPlatform);
    }
    return registerInfoRet;
}

exports.deleteGame = function(idGame) {
    console.log("Entrando controller User.js: deleteUser")

    var queryDeleteGame = "DELETE FROM game WHERE id_game=$1";
    var valueDeleteGame = [idGame];

    return db.query(queryDeleteGame, valueDeleteGame).then(
        function (result) {
            return result;
        },
        function (err) {
            throw err;
        });
}