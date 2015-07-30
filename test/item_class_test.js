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
            Collections.ItemClasses.forge().fetch().then(function (data){
                expect(item_classes_list_length).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get item class by id', function () {
        test('Must return a item class object', function (done) {
            Models.ItemClass.forge({id_item_class: 1}).fetch().then(function (data) {
                expect(test_item_class_1).to.eql(data.toJSON());
                done();
            });
        });
    });

    suite('- Add item class', function () {

        test('must return the created item class', function (done) {
            Models.ItemClass.forge({name: "test item class"}).save().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });

    suite('- Add item class', function () {
        test('must return the created item class', function (done) {
            Models.ItemClass.forge({name: "test item class"}).save().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });

    suite('- Update item class', function () {
        test('must return the updated item class', function (done) {
            test_item_class_1.name="Test update item class"
            Models.ItemClass.forge(test_item_class_1).save().then(function (data) {
                expect(data.toJSON().id_item_class).to.eql(test_item_class_1.id_item_class);
                done();
            });
        });

    });

    suite('- Delete item class', function () {
        var new_item_class_id;

        test('must return the deleted item class', function (done) {
            Models.ItemClass.forge(test_item_class_1).destroy().then(function (data) {
                expect(data.toJSON().name).to.exist;
                done();
            });
        });

    });
});
