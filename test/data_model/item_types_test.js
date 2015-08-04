/**
 * Created by nicanorgutierrez on 12/07/15.
 */

var ItemType = require('../../data_model/models/item_type');
var ItemTypes = require('../../data_model/collections/item_types');

var expect = require('expect.js');
var testUtils = require('./../test_utils');

var item_types_list_length = 3;

var test_item_type_1 = {
    id_item_type: "1",
    name: "item_type_1"
}
var test_item_type_2 = {
    id_item_type: "2",
    name: "item_type_2"
}

var test_item_types_list = [test_item_type_1, test_item_type_2];

suite('Item type model', function () {
    setup(function(done){
        testUtils.prepare_db(done)
    });
    teardown(function(done){
        testUtils.clean_db(done)
    });
    suite('- List item types', function () {
        test('Must return a list of item types', function (done) {
            ItemTypes.forge().fetch().then(function (data){
                expect(item_types_list_length).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get item type by id', function () {
        test('Must return a item type object', function (done) {
            ItemType.forge({id_item_type: 1}).fetch().then(function (data) {
                expect(test_item_type_1).to.eql(data.toJSON());
                done();
            });
        });
    });

    suite('- Add item type', function () {

        test('must return the created item type', function (done) {
            ItemType.forge({name: "test item type"}).save().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });

    suite('- Add item type', function () {
        test('must return the created item type', function (done) {
            ItemType.forge({name: "test item type"}).save().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });

    suite('- Update item type', function () {
        test('must return the updated item type', function (done) {
            test_item_type_1.name="Test update item type"
            ItemType.forge(test_item_type_1).save().then(function (data) {
                expect(data.toJSON().id_item_type).to.eql(test_item_type_1.id_item_type);
                done();
            });
        });

    });

    suite('- Delete item type', function () {
        var new_item_type_id;

        test('must return the deleted item type', function (done) {
            ItemType.forge(test_item_type_1).destroy().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });
});
