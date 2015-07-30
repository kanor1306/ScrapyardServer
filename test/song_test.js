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

var songsListLength = 10;

var testSong1 =
{
    "id_song": "1",
    "title": "song_1",
    "length": 60
}


var testSongAdd =
{
    "title": "song test",
    "length": 2000
}

suite('Song model', function () {
    setup(function (done) {
        testUtils.prepare_db(done)
    });
    teardown(function (done) {
        testUtils.clean_db(done)
    });
    suite('- List songs', function () {
        test('Must return a list of songs', function (done) {
            Collections.Songs.forge().fetch().then(function (data) {
                expect(songsListLength).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get song  by id', function () {
        test('Must return an song object', function (done) {
            Models.Song.forge({id_song: testSong1.id_song}).fetch().then(function (data) {
                expect(testSong1).to.eql(data.toJSON());
                done();
            }, function (err) {
                console.log(err)
            });
        });
    });

    suite('- Add song', function () {
        test('must return the created song title', function (done) {
            Models.Song.forge(testSongAdd).save().then(function (data) {
                expect(data.toJSON().title).to.exist;
                done();
            });
        });

    });

    suite('- Update song', function () {
        test('must return the updated song', function (done) {
            testSong1.title = "testUpdateTitle";
            Models.Song.forge(testSong1).save().then(function (data) {
                expect(data.toJSON().id_song).to.eql(testSong1.id_song);
                done();
            });
        });

    });

    suite('- Delete song', function () {
        test('must return the deleted song title', function (done) {
            Models.Song.forge(testSong1).destroy().then(function (data) {
                expect(data.toJSON().title).to.exist;
                done();
            });
        });

    });
});
