/**
 * Created by nicanorgutierrez on 12/07/15.
 */


var ItemClass = require('../data/models/item_class');
var ItemClasses = require('../data/collections/item_classes');

var expect = require('expect.js');
var testUtils = require('./test_utils');

var item_classes_list_length = 3;

var test_item_class_1 = {
    id_item_class: "1",
    name: "item_class_1"
}
var test_item_class_2 = {
    id_item_class: "2",
    name: "item_class_2"
}

var test_item_classs_list = [test_item_class_1, test_item_class_2];

suite('Item class model', function () {
    setup(function(done){
        testUtils.prepare_db(done)
    });
    teardown(function(done){
        testUtils.clean_db(done)
    });
    suite('- List item classs', function () {
        test('Must return a list of item classs', function (done) {
            ItemClasses.forge().fetch().then(function (data){
                expect(item_classes_list_length).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get item class by id', function () {
        test('Must return a item class object', function (done) {
            ItemClass.forge({id_item_class: 1}).fetch().then(function (data) {
                expect(test_item_class_1).to.eql(data.toJSON());
                done();
            });
        });
    });

    suite('- Add item class', function () {

        test('must return the created item class', function (done) {
            ItemClass.forge({name: "test item class"}).save().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });

    suite('- Add item class', function () {
        test('must return the created item class', function (done) {
            ItemClass.forge({name: "test item class"}).save().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });

    suite('- Update item class', function () {
        test('must return the updated item class', function (done) {
            test_item_class_1.name="Test update item class"
            ItemClass.forge(test_item_class_1).save().then(function (data) {
                expect(data.toJSON().id_item_class).to.eql(test_item_class_1.id_item_class);
                done();
            });
        });

    });

    suite('- Delete item class', function () {
        var new_item_class_id;

        test('must return the deleted item class', function (done) {
            ItemClass.forge(test_item_class_1).destroy().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });
});
