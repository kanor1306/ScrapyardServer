/**
 * Created by nicanorgutierrez on 12/07/15.
 */


var GenreType = require('../../data_model/models/genre_type');
var GenreTypes = require('../../data_model/collections/genre_types');

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
            GenreTypes.forge().fetch().then(function (data){
                expect(test_genre_types_list.length).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get genre type by id', function () {
        test('Must return a genre type object', function (done) {
            GenreType.forge({id_genre_type: 1}).fetch().then(function (data) {
                expect(test_genre_type_1).to.eql(data.toJSON());
                done();
            });
        });
    });

    suite('- Add genre type', function () {

        test('must return the created genre type', function (done) {
            GenreType.forge({name: "test genre type"}).save().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });

    suite('- Add genre type', function () {
        test('must return the created genre type', function (done) {
            GenreType.forge({name: "test genre type"}).save().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });

    suite('- Update genre type', function () {
        test('must return the updated genre type', function (done) {
            test_genre_type_1.name="Test update genre type"
            GenreType.forge(test_genre_type_1).save().then(function (data) {
                expect(data.toJSON().id_genre_type).to.eql(test_genre_type_1.id_genre_type);
                done();
            });
        });

    });

    suite('- Delete genre type', function () {
        var new_genre_type_id;

        test('must return the deleted genre type', function (done) {
            GenreType.forge(test_genre_type_1).destroy().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });
});
