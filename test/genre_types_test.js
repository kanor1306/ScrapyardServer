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


var test_genre_type_1 = {
    id_genre_type: "1",
    name: "genre_type_1"
}
var test_genre_type_2 = {
    id_genre_type: "2",
    name: "genre_type_2"
}

var test_genre_types_list = [test_genre_type_1, test_genre_type_2];

suite('Genre type model', function () {
    setup(function(done){
        testUtils.prepare_db(done)
    });
    teardown(function(done){
        testUtils.clean_db(done)
    });
    suite('- List genre types', function () {
        test('Must return a list of genre types', function (done) {
            Collections.GenreTypes.forge().fetch().then(function (data){
                expect(test_genre_types_list.length).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get genre type by id', function () {
        test('Must return a genre type object', function (done) {
            Models.GenreType.forge({id_genre_type: 1}).fetch().then(function (data) {
                expect(test_genre_type_1).to.eql(data.toJSON());
                done();
            });
        });
    });

    suite('- Add genre type', function () {
        var new_genre_type_id;

        test('must return the created genre type', function (done) {
            Models.GenreType.forge({name: "test genre type"}).save().then(function (data) {
                new_genre_type_id = data.toJSON().id_genre_type;
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });
});
