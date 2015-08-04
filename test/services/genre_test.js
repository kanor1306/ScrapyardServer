/**
 * Created by nicanorgutierrez on 12/07/15.
 */


var Genre = require('../../data_model/models/genre');
var Genres = require('../../data_model/collections/genres');

var expect = require('expect.js');
var testUtils = require('../test_utils');
var rp = require('request-promise');


var music_genre_1 = {
    "name": "music_genre_1",
    "id_genre": "2",
    "id_genre_type": "1"
};
var music_genre_2 = {
    "name": "music_genre_2",
    "id_genre": "3",
    "id_genre_type": "1"
};
var music_genre_3 = {
    "name": "music_genre_3",
    "id_genre": "4",
    "id_genre_type": "1"
};
var game_genre_1 = {
    "name": "game_genre_2",
    "id_genre": "6",
    "id_genre_type": "2"
}
var game_genre_2 = {
    "name": "game test genre 2",
    "id_genre": "7",
    "id_genre_type": "2"
}
var game_genre_3 = {
    "name": "game test genre 2",
    "id_genre": "8",
    "id_genre_type": "2"
}

var test_genre = {
    "name": "test genre",
    "id_genre_type": "2"
}

var test_genres_list = [music_genre_1, music_genre_2, music_genre_3, game_genre_1, game_genre_2, game_genre_3];

var test_game_genres_list = [game_genre_1, game_genre_2, game_genre_3];

var test_album_genres_list = [music_genre_1, music_genre_2, music_genre_3];

suite('Genre Web Services', function () {

    setup(function (done) {
        testUtils.prepare_db(done)
    });
    teardown(function (done) {
        testUtils.clean_db(done)
    });
    suite('- List genres', function () {
        test('Must return a list of genres', function (done) {
            var options = {
                uri: testUtils.BASE_URL + "/genre/list",
                method: 'GET',
                json: true
            }
            rp(options).then(function (response) {
                expect(test_genres_list.length).to.eql(response.length);
                done();
            });
        });
    });

    suite('- List genres by genre type', function () {

        test('Must return a list of genres', function (done) {
            var options = {
                uri: testUtils.BASE_URL + "/genre/listByType/" + game_genre_1.id_genre_type,
                method: 'GET',
                json: true
            }
            rp(options).then(function (response) {
                expect(test_game_genres_list.length).to.eql(response.length);
                done();
            });
        });
    });

    suite('- Get genre  by id', function () {
        var options = {
            uri: testUtils.BASE_URL + "/genre/detail/" + music_genre_1.id_genre,
            method: 'GET',
            json: true
        }
        test('Must return a genre  object', function (done) {
            rp(options).then(function (response) {
                expect(music_genre_1.id_genre).to.eql(response.id_genre);
                done();
            });
        });
    });

    suite('- Add genre', function () {
        test('must return the created genre type', function (done) {
            var options = {
                uri: testUtils.BASE_URL + "/genre/create",
                method: 'POST',
                json: true,
                body: test_genre
            }

            rp(options).then(function (response) {
                expect(response.name).to.exist;
                done();
            });
        });

    });

    suite('- Update genre', function () {
        test('must return the updated genre type', function (done) {
            music_genre_1.name = "Test update genre;"
            var options = {
                uri: testUtils.BASE_URL + "/genre/update",
                method: 'PUT',
                json: true,
                body: music_genre_1
            }

            rp(options).then(function (response) {
                expect(response.id_genre).to.eql(music_genre_1.id_genre);
                done();
            });

        });

    });

    suite('- Delete genre', function () {
        test('must return the deleted genre type', function (done) {
            var options = {
                uri: testUtils.BASE_URL + "/genre/destroy/"+music_genre_1.id_genre,
                method: 'DELETE',
                json: true,
                body: music_genre_1
            }

            rp(options).then(function (response) {
                expect(response).to.exist;
                done();
            });

        });

    });
});
