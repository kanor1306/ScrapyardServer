var db = require('./db');
var utils = require('../my_modules/utils/utils.js');

exports.list = function () {
    console.log("Executing controller Album.js: list")
    var query = "SELECT uuid, album_name, artist, id_album, id_user FROM public.album"
    var values = [];
    return db.query(query, values).then(function (albums) {
        return JSON.stringify(albums);
    }, function (err) {
        throw err;
    });
}

exports.detail = function (albumId) {
    console.log("Executing controller Album.js: detail")
    var query = "SELECT * FROM public.album WHERE id_album=$1"
    var values = [albumId];
    return db.query(query, values).then(function (albums) {
        return JSON.stringify(albums[0]);
    }, function (err) {
        throw err;
    });
}

//Association of an album to an user. This can finish creating new albums or updating the existing one.
registerAlbum = function (userId, uuid, albumInfo, gameId, artist, album_name) {
    console.log("Executing controller Album.js: registerAlbum")

        var query = "SELECT * FROM album WHERE uuid=$1"
        var values = [uuid];
        //Comprobamos si el dispositivo ya existe en la base de datos. Si existe lo actualizamos, si no lo creamos.
        return db.query(query, values).then(function (albumExist) {
            if (typeof albumExist != "undefined" && albumExist != null && albumExist.length == 0) {
                return createAlbum(userId, uuid, JSON.stringify(albumInfo), gameId, artist, album_name);
            } else {
                return updateAlbum(userId, uuid, albumInfo,  gameId, albumExist[0]);
            }
        }, function (err) {
            throw err;
        });

}

//Method that creates a new album associated with a user in teh databae
createAlbum = function (userId, uuid, albumInfo, gameId, artist, album_name) {
    console.log("Executing controller Album.js: createAlbum")
    var query_create_album = "INSERT INTO album (uuid, id_user,album_info," +
        "artist, album_name) VALUES ($1,$2,$3,$4,$5) RETURNING id_album;"
    var values_create_album = [uuid, userId, albumInfo, artist,album_name];

    var query_create_album_game = "INSERT INTO game_album (id_game, id_album) VALUES ($1 ,currval('album_id_album_seq'))";
    var values_create_album_games = [gameId];

    var queries = [
        {query: query_create_album, values: values_create_album},
        {query: query_create_album_game, values: values_create_album_games}
    ];

    return db.transactionalQuery(queries).then(
        function (result) {
            return result;
        },
        function (err) {
            throw err;
        });
}

//Method that updates the information of an album.
updateAlbum = function (userId, uuid, albumInfo, gameId, existingAlbum) {
    console.log("Executing controller Album.js: updateAlbum")
    var query = "SELECT * FROM game_album WHERE id_game=$1 AND id_album=$2"
    var values = [gameId, existingAlbum.id_album];

    //Check if the relation between the album and the game already exists
    return db.query(query, values).then(function (existingAlbumGameRelation) {
        var queries = new Array();

        if (typeof existingAlbumGameRelation != "undefined" && existingAlbumGameRelation != null && existingAlbumGameRelation.length == 0) {
            var queryAlbumGameRelation = "INSERT INTO game_album (id_game, id_album) VALUES ($1 ,$2)";
            var valuesAlbumGameRelation = [gameId, existingAlbum.id_album];
            queries.push({query: queryAlbumGameRelation, values: valuesAlbumGameRelation});
        }

        var existingAlbumInfo = existingAlbum.album_info;
        var combinedAlbumInfo = JSON.stringify(utils.mergeInfoObjects(existingAlbumInfo, albumInfo));

        var query_update_album = "UPDATE album SET album_info=$1, id_user=$3 WHERE uuid=$2;"
        var values_update_album = [combinedAlbumInfo, uuid, userId];

        queries.push({ query: query_update_album, values: values_update_album});

        return db.transactionalQuery(queries).then(
            function (result) {
                return result;
            },
            function (err) {
                throw err;
            });

    }, function (err) {
        throw err;
    });
}

exports.getAlbumByAlbumInfo = function (albumInfo) {
    console.log("Executing controller Album.js: getAlbumByAlbumInfo")
    var whereClause = "";
    var values = new Array();
    var objectCounter = 0;
    for (var i = 0; i < albumInfo.length; i++) {
        whereClause = whereClause + "albumInfo->>'key'=$" + (objectCounter + 1) + " AND albumInfo->>'value'=$" + (objectCounter + 2);
        values.push(albumInfo[i].key);
        values.push(albumInfo[i].value);
        if (i != albumInfo.length - 1) {
            whereClause = whereClause + " AND ";
            objectCounter = objectCounter + 2;
        }
    }

    var query = "SELECT pushd_id FROM album d, json_array_elements(d.album_info) AS albumInfo WHERE " + whereClause;

    return db.query(query, values).then(
        function (result) {
            console.log(result);
            return result;
        },
        function (err) {
            throw err;
        });
}

exports.deleteAlbum = function(idAlbum) {
    console.log("Executing controller Albums.js: deleteAlbum")
    var queryDeleteAlbum = "DELETE FROM album WHERE id_album=$1";
    var valueDeleteAlbum = [idAlbum];

    return db.query(queryDeleteAlbum, valueDeleteAlbum).then(
        function (result) {
            return result;
        },
        function (err) {
            throw err;
        });
}

