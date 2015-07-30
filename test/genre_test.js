/**
 * Created by nicanorgutierrez on 12/07/15.
 */

var Bookshelf = require('bookshelf');
var config = require('../config');
Bookshelf.PG = Bookshelf.initialize(config.developmentDatabaseConfig);

var Models = require('../data_model/data_model')(Bookshelf.PG).Models;
var Collections = require('../data_model/data_model')(Bookshelf.PG).Collections;

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var assert = require('assert');
var expect = require('expect.js');
var testUtils = require('./test_utils');


var music_genre_1 = {
    name: "music_genre_1",
    id_genre: "2",
    "id_genre_type":"1"
};
var music_genre_2 = {
    name: "music_genre_2",
    id_genre: "3",
    "id_genre_type":"1"
};
var music_genre_3 = {
    name: "music_genre_3",
    id_genre: "4",
    "id_genre_type":"1"
};
var game_genre_1 = {
    name: "game_genre_2",
    id_genre: "6",
    "id_genre_type":"2"
}
var game_genre_2 = {
    name: "game test genre 2",
    id_genre: "7",
    "id_genre_type":"2"
}
var game_genre_3 = {
    name: "game test genre 2",
    id_genre: "8",
    "id_genre_type":"2"
}

var test_genre = {
    name: "test genre",
    "id_genre_type":"2"
}

var test_genres_list = [music_genre_1, music_genre_2, music_genre_3, game_genre_1, game_genre_2, game_genre_3];

var test_game_genres_list = [game_genre_1, game_genre_2, game_genre_3];

var test_album_genres_list = [music_genre_1, music_genre_2, music_genre_3];

suite('Genre model', function () {

    setup(function(done){
        testUtils.prepare_db(done)
    });
    teardown(function(done){
        testUtils.clean_db(done)
    });
    suite('- List genres', function () {
        test('Must return a list of genres', function (done) {
            Collections.Genres.forge().fetch().then(function (data){
                expect(test_genres_list.length).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- List genres by genre type', function () {
        test('Must return a list of genres', function (done) {
            Collections.Genres.forge().query({where:{id_genre_type:game_genre_1.id_genre_type}}).fetch().then(function (data){
                expect(test_game_genres_list.length).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get genre  by id', function () {
        test('Must return a genre  object', function (done) {
            Models.Genre.forge({id_genre: music_genre_1.id_genre}).fetch().then(function (data) {
                expect(music_genre_1).to.eql(data.toJSON());
                done();
            });
        });
    });

    suite('- Add genre', function () {
        test('must return the created genre type', function (done) {
            Models.Genre.forge(test_genre).save().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });

    suite('- Update genre', function () {
        test('must return the updated genre type', function (done) {
            music_genre_1.name="Test update genre;"
            Models.Genre.forge(music_genre_1).save().then(function (data) {
                expect(data.toJSON().id_genre).to.eql(music_genre_1.id_genre);
                done();
            });
        });

    });

    suite('- Delete genre', function () {
        test('must return the deleted genre type', function (done) {
            Models.Genre.forge(music_genre_1).destroy().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });
});
