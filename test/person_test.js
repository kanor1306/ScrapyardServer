/**
 * Created by nicanorgutierrez on 12/07/15.
 */

var Bookshelf = require('bookshelf');
var config = require('../config');
Bookshelf.PG = Bookshelf.initialize(config.databaseConfig);

var Models = require('../data_model/data_model')(Bookshelf.PG).Models;
var Collections = require('../data_model/data_model')(Bookshelf.PG).Collections;

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var assert = require('assert');
var expect = require('expect.js');


var test_genre_type_1 = {
    id_type_genre: "1",
    name: "music"
}
var test_genre_type_2 = {
    id_type_genre: "2",
    name: "videogame"
}

var test_genre_list = [test_genre_type_1, test_genre_type_2];

var album_test_genre_1 = {
    name: "album test genre 1",
    type: "1"
};
var album_test_genre_2 = {
    name: "album test genre 2",
    type: "1"
};
var game_test_genre_1 = {
    name: "game test genre 1",
    type: "2"
};
var game_test_genre_2 = {
    name: "game test genre 2",
    type: "2"
}

var album_item_type = {
    name: "album",
    id_item_type: "1"
}

var game_item_type = {
    name: "videogame",
    id_item_type: "2"
}

var testPerson =
{
    "username": "unitTestUser",
    "password": "password"
}

var testGame = {
    "name": "unitTestGame"
}

var testAlbum = {
    "title": "",
    "year": "",
    "id_item_type": "1"
}

suite('Data model', function () {
    suite('- List genre types', function () {
        test('Must return a list of genre types', function (done) {
            Collections.GenreTypes.forge().fetch().then(function (data){
                expect(JSON.stringify(test_genre_list)).to.eql(JSON.stringify(data.toJSON()));
                done();
            });
        });
    });

    suite('- Get genre type by id', function () {
        test('Must return a genre type object', function (done) {
            Models.GenreType.forge({id_type_genre: 1}).fetch().then(function (data) {
                expect(test_genre_type_1).to.eql(data.toJSON());
                done();
            });
        });
    });

    suite('- Add genre type', function () {
        var new_genre_type_id;
        teardown(function () {
            console.log("teardown")
            if (new_genre_type_id) {
                return Models.GenreType.forge({id_type_genre: new_genre_type_id}).destroy();
            }
        });

        test('must return the created genre type', function (done) {
            Models.GenreType.forge({name: "test genre type"}).save().then(function (data) {
                new_genre_type_id = data.toJSON().id_type_genre;
                expect(data.toJSON().name).to.eql("test genre type");
                done();
            });
        });

    });
});
