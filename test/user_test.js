var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var assert = require('assert');
var expect = require('expect.js');

var usuarioDePrueba =
{
    "gameId": 0,
    "userInfo": [
        {
            "key": "unitTestUserInfoKey",
            "value": "unitTestUserInfoValue"
        }
    ],
    "username": "unitTestUser"
}

var gameDePrueba = {
    "name": "unitTestGame"
}


var albumDePrueba = {
    "uuid": "1234-5678-9012-3456-7890",
    "artist": "UnitTestArtist",
    "model": "UnitTestModel",
    "proto": "gcm",
    "album_info": [
        {
            "key": "unitTestAlbumInfoKey",
            "value": "unitTestAlbumInfoValue"
        }
    ]
}

var albumDePruebaAnonymus = {
    "uuid": "0987-6543-2109-8765-4321",
    "artist": "UnitTestArtist",
    "model": "UnitTestModel",
    "proto": "gcm",
    "album_info": [
        {
            "key": "unitTestAlbumInfoKey",
            "value": "unitTestAlbumInfoValue"
        }
    ]
}

var gamesArray = new Array();
var users = new Array();
var albums = new Array() ;
suite('Servicios web', function () {
    suite('- Creación de aplicación', function () {
        test('debe retornar un identificador de aplicación', function (done) {
            var url = 'http://localhost:3000/game';
            var options = {
                headers: {'content-type': 'game/json'},
                body: JSON.stringify(gameDePrueba)
            }
            request.post(url, options, function (error, res, body) {
                expect(res).to.exist;
                expect(res.statusCode).to.equal(201);
                expect(JSON.parse(body).id_game).to.exist;
                var idGame = JSON.parse(body).id_game;
                gamesArray.push(idGame);
                done();
            });
        });
    });
    suite('- listado de aplicaciones', function () {
        test('debe retornar un listado de aplicaciones bien formadas', function (done) {
            request('http://localhost:3000/game', function (error, res, body) {
                expect(res).to.exist;
                expect(res.statusCode).to.equal(200);
                var games = JSON.parse(body);
                expect(games).to.be.an(Array);
                done();
            })
        })
    });
    suite('- detalle de una aplicación', function () {
        test('debe retornar el detalle de una aplicación', function (done) {

            var promisesArray = new Array();
            for (var a in gamesArray) {
                var game = gamesArray[a];
                promisesArray.push((function (game) {
                    return request.getAsync('http://localhost:3000/game/' + game).then(function (res) {
                        res=res[0];
                        var body=res.body
                        expect(res).to.exist;
                        expect(res.statusCode).to.equal(200);
                        var gameId = (JSON.parse(body)).id_game;
                        expect(gameId).to.equal(game);
                    })
                })(game));
            }

            Promise.all(promisesArray).then(function (hola) {
                done();
            })



        })
    });
    suite('- Creación de usuario', function () {
        test('debe retornar un identificador de usuario', function (done) {
            var url = 'http://localhost:3000/user';
            var options = {
                headers: {'content-type': 'game/json'},
                body: JSON.stringify(usuarioDePrueba)
            }
            request.post(url, options, function (error, res, body) {
                users.push(JSON.parse(body).id_user);
                expect(res).to.exist;
                expect(res.statusCode).to.equal(201);

                done();
            });
        });
    });
    suite('- listado de usuarios', function () {
        test('debe retornar un listado de usuarios bien formados', function (done) {
            request('http://localhost:3000/user', function (error, res, body) {
                expect(res).to.exist;
                expect(res.statusCode).to.equal(200);
                var usuarios = JSON.parse(body);
                expect(usuarios).to.be.an(Array);
                done();
            })
        })
    });
    suite('- detalle de un usuario', function () {
        test('debe retornar el detalle de un usuario', function (done) {
            var promisesArray = new Array();
            for (u in users) {
                var user = users[u];
                promisesArray.push((function (user) {
                    return request.getAsync('http://localhost:3000/user/' + user).then(function (res) {
                        res=res[0];
                        var body=res.body
                        expect(res).to.exist;
                        expect(res.statusCode).to.equal(200);
                        var usuario = JSON.parse(body);
                        expect(usuario.id_user).to.equal(user);
                    });
                })(user));
            }

            Promise.all(promisesArray).then(function () {
                done();
            })
        })
    });
    suite('- Creación de dispositivo asociado a un usuario', function () {
        test('debe retornar un identificador de dispositivo', function (done) {
            var url = 'http://localhost:3000/album';
            albumDePrueba["gameId"] = gamesArray[0];
            albumDePrueba["userId"] = users[0];
            var options = {
                headers: {'content-type': 'game/json'},
                body: JSON.stringify(albumDePrueba)
            }
            request.post(url, options, function (error, res, body) {
                albums.push(JSON.parse(body).id_album);
                expect(res).to.exist;
                expect(res.statusCode).to.equal(201);

                done();
            });
        });
    });
    suite('- Creación de dispositivo asociado a un usuario anonimo', function () {
        test('debe retornar un identificador de dispositivo', function (done) {
            var url = 'http://localhost:3000/album';
            albumDePruebaAnonymus["gameId"] = gamesArray[0];
            var options = {
                headers: {'content-type': 'game/json'},
                body: JSON.stringify(albumDePruebaAnonymus)
            }
            request.post(url, options, function (error, res, body) {
               albums.push(JSON.parse(body).id_album);
                expect(res).to.exist;
                expect(res.statusCode).to.equal(201);

                done();
            });
        });
    });
    suite('- listado de dispositivos', function () {
        test('debe retornar un listado de dispositivos bien formados', function (done) {
            request('http://localhost:3000/album', function (error, res, body) {
                expect(res).to.exist;
                expect(res.statusCode).to.equal(200);
                var dispositivos = JSON.parse(body);
                expect(dispositivos).to.be.an(Array);
                done();
            })
        })
    });
    suite('- detalle de un dispositivo', function () {
        test('debe retornar el detalle de un dispositivo', function (done) {

            var promisesArray = new Array();
            for (d in albums) {
                var album = albums[d];
                promisesArray.push((function (album) {
                    return request.getAsync('http://localhost:3000/album/' + album).then(function (res) {
                        res=res[0];
                        var body=res.body
                        expect(res).to.exist;
                        expect(res.statusCode).to.equal(200);
                        var dispositivo = JSON.parse(body);
                        expect(dispositivo.id_album).to.equal(album);
                    })
                })(album));
            }

            Promise.all(promisesArray).then(function () {
                done();
            })


        })
    });
    suite('- borrado un dispositivo', function () {
        test('debe retornar código 204', function (done) {

            var promisesArray = new Array();
            for (d in albums) {
                var album = albums[d];
                promisesArray.push((function (album) {
                    var url = 'http://localhost:3000/album/' + album;
                    return request.delAsync(url).then(function (res) {
                        res=res[0];
                        var body=res.body
                        expect(res).to.exist;
                        expect(res.statusCode).to.equal(204);
                    });
                })(album));
            }

            Promise.all(promisesArray).then(function () {
                done();
            })


        })
    });
    suite('- borrado un usuario', function () {
        test('debe retornar código 204', function (done) {

            var promisesArray = new Array();
            for (u in users) {
                var user = users[u];
                promisesArray.push((function (user) {
                    return request.delAsync('http://localhost:3000/user/' + user).then(function (res) {
                        res=res[0];
                        var body=res.body
                        expect(res).to.exist;
                        expect(res.statusCode).to.equal(204);
                    });
                })(user));
            }

            Promise.all(promisesArray).then(function () {
                done();
            })
        })
    });
    suite('- borrado una aplicación', function () {
        test('debe retornar código 204', function (done) {
            var promisesArray = new Array();
            for (var a in gamesArray) {
                var game = gamesArray[a];
                promisesArray.push((function (game) {
                    var url = 'http://localhost:3000/game/' + game;
                    request.delAsync(url).then(function ( res) {
                        res=res[0];
                        var body=res.body
                        expect(res).to.exist;
                        expect(res.statusCode).to.equal(204);
                    });
                })(game));
            }

            Promise.all(promisesArray).then(function () {
                done();
            })


        })
    });
});