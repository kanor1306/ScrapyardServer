/**
 * Created by nicanor.gutierrez on 15/01/14.
 */

var db = require('./db');
var utils = require('../my_modules/utils/utils.js');
var Promise = require('bluebird');

//Returns a list of users
exports.list = function () {
    console.log("Entrando controller User.js: list")
    var query = "SELECT * FROM public.user"
    var values = [];
    return db.query(query, values).then(function (albums) {
        return JSON.stringify(albums);
    });
}

//Return all the information about an user
exports.detail = function (userId) {
    console.log("Entrando controller User.js: detail")
    var query = "SELECT * FROM public.user u LEFT JOIN album d ON u.id_user=d.id_user WHERE u.id_user=$1"
    var values = [userId];
    return db.query(query, values).then(function (albums) {
            var user = new Object();
            var returningAlbums = new Array();

            user["id_user"] = userId;

            for (d in albums) {
                var album = albums[d];
                user["username"] = album.username;
                user["id_game"] = album.id_game;
                user["user_info"] = album.user_info;
                if (album.uuid != null) {
                    delete album.username;
                    delete album.id_game;
                    delete album.user_info;
                    delete album.id_user;

                    returningAlbums.push(album);
                }
            }
            if (returningAlbums.length > 0) {
                user["albums"] = returningAlbums;
            }


            return JSON.stringify(user);
        }
    )
        ;
}

//Return just the albums associated with an user
exports.albums = function (userId) {
    console.log("Entrando controller User.js: albums")
    var query = "SELECT * FROM album WHERE id_user=$1"
    var values = [userId];
    return db.query(query, values).then(function (albums) {
        return JSON.stringify(albums);
    });
}


//Méthod to obtains the id of an user.
exports.getUserId = function (username, gameId) {
    console.log("Entrando controller User.js: getUserId")
    var query = "SELECT id_user FROM public.user WHERE username=$1 AND id_game=$2";
    values = [username, gameId];
    return db.query(query, values).then(function (result) {
        console.log(result)
        return result[0].id_user;
    }, function (err) {
        throw err;
    });
}


//Register a new user
exports.createUser = function (username, gameId, userInfo) {
    console.log("Entrando controller User.js: createUser")
    //Lo primero será registrar el disposiivo en PUSH para tener el identificador de PUSHD.
    var query = "INSERT INTO public.user (username, id_game, user_info) VALUES ($1,$2,$3) RETURNING id_user";
    var values = [username, gameId, JSON.stringify(userInfo)];

    return db.query(query, values).then(
        function (result) {
            return result[0];
        },
        function (err) {
            throw err;
        });
}


//Update an user
exports.updateUser = function (userId, userInfo) {
    console.log("Entrando controller User.js: updateUser")
    var query = "UPDATE user SET user_info=$1 WHERE id_user=$2";
    var values = [userId, userInfo];

    return db.query(query, values).then(
        function (result) {
            return result;
        },
        function (err) {
            throw err;
        });
}


exports.deleteUser = function(idUser) {
    console.log("Entrando controller User.js: deleteUser")
    var queryDeleteUser = "DELETE FROM public.user WHERE id_user=$1";
    var valueDeleteUser = [idUser];

    return db.query(queryDeleteUser, valueDeleteUser).then(
        function (result) {
            return result;
        },
        function (err) {
            throw err;
        });
}



