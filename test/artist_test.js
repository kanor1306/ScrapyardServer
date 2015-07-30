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

var testArtist1 =
{
    "id_artist":"1",
    "name": "artist 1"
}

var testArtist2 =
{
    "id_artist":"2",
    "name": "artist 2"
}

var testArtist3 =
{
    "id_artist":"3",
    "name": "artist 3"
}

var testArtistAdd =
{
    "name": "testArtistAdd"
}

var testArtistList = [testArtist1, testArtist2, testArtist3]

suite('Artist model', function () {
    setup(function(done){
        testUtils.prepare_db(done)
    });
    teardown(function(done){
        testUtils.clean_db(done)
    });
    suite('- List artists', function () {
        test('Must return a list of artists', function (done) {
            Collections.Artists.forge().fetch().then(function (data){
                expect(testArtistList.length).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get artist  by id', function () {
        test('Must return an artist object', function (done) {
            Models.Artist.forge({id_artist: testArtist1.id_artist}).fetch().then(function (data) {
                expect(testArtist1).to.eql(data.toJSON());
                done();
            }, function(err){
                console.log(err)
            });
        });
    });

    suite('- Add artist', function () {
        test('must return the created artist name', function (done) {
            Models.Artist.forge(testArtistAdd).save().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });

    suite('- Update artist', function () {
        test('must return the updated artist', function (done) {
            testArtist1.name="testUpdateName";
            Models.Artist.forge(testArtist1).save().then(function (data) {
                expect(data.toJSON().id_artist).to.eql(testArtist1.id_artist);
                done();
            });
        });

    });

    suite('- Delete artist', function () {
        test('must return the deleted artist name', function (done) {
            Models.Artist.forge(testArtist1).destroy().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });
});
