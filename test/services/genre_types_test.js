/**
 * Created by nicanorgutierrez on 12/07/15.
 */


var Genre_type = require('../../data_model/models/genre_type');
var Genre_types = require('../../data_model/collections/genre_types');

var expect = require('expect.js');
var testUtils = require('../test_utils');
var rp = require('request-promise');


var test_genre_type_1 = {
    id_genre_type: "1",
    name: "genre_type_1"
}
var test_genre_type_2 = {
    id_genre_type: "2",
    name: "genre_type_2"
}

var test_genre_types_list = [test_genre_type_1, test_genre_type_2];

suite('Genre type Web Services', function () {

    setup(function (done) {
        testUtils.prepare_db(done)
    });
    teardown(function (done) {
        testUtils.clean_db(done)
    });
    suite('- List genre_types', function () {
        test('Must return a list of genre_types', function (done) {
            var options = {
                uri: testUtils.BASE_URL + "/genreType/list",
                method: 'GET',
                json: true
            }
            rp(options).then(function (response) {
                expect(test_genre_types_list.length).to.eql(response.length);
                done();
            });
        });
    });


    suite('- Get genre_type  by id', function () {
        var options = {
            uri: testUtils.BASE_URL + "/genreType/detail/" + test_genre_type_1.id_genre_type,
            method: 'GET',
            json: true
        }
        test('Must return a genre_type  object', function (done) {
            rp(options).then(function (response) {
                expect(test_genre_type_1.id_genre_type).to.eql(response.id_genre_type);
                done();
            });
        });
    });

    suite('- Add genre_type', function () {
        test('must return the created genre_type type', function (done) {
            var options = {
                uri: testUtils.BASE_URL + "/genreType/create",
                method: 'POST',
                json: true,
                body: test_genre_type_1
            }

            rp(options).then(function (response) {
                expect(response.name).to.exist;
                done();
            });
        });

    });

    suite('- Update genre_type', function () {
        test('must return the updated genre_type type', function (done) {
            test_genre_type_1.name = "Test update genre_type;"
            var options = {
                uri: testUtils.BASE_URL + "/genreType/update",
                method: 'PUT',
                json: true,
                body: test_genre_type_1
            }

            rp(options).then(function (response) {
                expect(response.id_genre_type).to.eql(test_genre_type_1.id_genre_type);
                done();
            });

        });

    });

    suite('- Delete genre_type', function () {
        test('must return the deleted genre_type type', function (done) {
            var options = {
                uri: testUtils.BASE_URL + "/genreType/destroy/" + test_genre_type_1.id_genre_type,
                method: 'DELETE',
                json: true,
                body: test_genre_type_1
            }

            rp(options).then(function (response) {
                expect(response).to.exist;
                done();
            });

        });

    });
});
