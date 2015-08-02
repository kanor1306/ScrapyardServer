/**
 * Created by nicanorgutierrez on 12/07/15.
 */


var Song = require('../data/models/song');
var Songs = require('../data/collections/songs');

var expect = require('expect.js');
var testUtils = require('./test_utils');

var songsListLength = 10;

var testSong1 =
{
    "id_song": "1",
    "title": "song_1",
    "length": 60
}

var test_artist_1={
    "id_artist" : "1",
    "name":"artist_1"
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
            Songs.forge().fetch().then(function (data) {
                expect(songsListLength).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get song  by id', function () {
        test('Must return an song object', function (done) {
            Song.forge({id_song: testSong1.id_song}).fetch().then(function (data) {
                expect(testSong1).to.eql(data.toJSON());
                done();
            }, function (err) {
                console.log(err)
            });
        });
    });

    suite('- Add song', function () {
        test('must return the created song title', function (done) {
            Song.forge(testSongAdd).save().then(function (data) {
                expect(data.toJSON().title).to.exist;
                done();
            });
        });

    });

    suite('- Update song', function () {
        test('must return the updated song', function (done) {
            testSong1.title = "testUpdateTitle";
            Song.forge(testSong1).save().then(function (data) {
                expect(data.toJSON().id_song).to.eql(testSong1.id_song);
                done();
            });
        });

    });

    suite('- Delete song', function () {
        test('must return the deleted song title', function (done) {
            Song.forge(testSong1).destroy().then(function (data) {
                expect(data.toJSON().title).to.exist;
                done();
            });
        });

    });

    suite('- Get artist song', function () {
        test('Must return the artist of the song', function (done) {
            Song.forge({id_song: testSong1.id_song}).artist().fetch().then(function (data) {
                expect(test_artist_1.id_artist).to.eql(data.toJSON()[0].id_artist);
                done();
            }, function (err) {
                console.log(err)
            });
        });
    });
});
