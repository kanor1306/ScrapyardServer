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

var itemsListLength = 8;

var testItem1 =
{
    "id_item": "1",
    "title": "item_1",
    "year": 2000,
    "additionalInfo": {"info1": "info1", "info2": "info2"},
    "id_item_type" : "1",
    "id_item_class" : "1"
}


var testItemAdd =
{
    "title": "item test",
    "year": 2000,
    "additionalInfo": {"info1": "info1", "info2": "info2"},
    "id_item_type" : "1",
    "id_item_class" : "1"
}

suite('Item model', function () {
    setup(function (done) {
        testUtils.prepare_db(done)
    });
    teardown(function (done) {
        testUtils.clean_db(done)
    });
    suite('- List items', function () {
        test('Must return a list of items', function (done) {
            Collections.Items.forge().fetch().then(function (data) {
                expect(itemsListLength).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get item  by id', function () {
        test('Must return an item object', function (done) {
            Models.Item.forge({id_item: testItem1.id_item}).fetch().then(function (data) {
                expect(testItem1).to.eql(data.toJSON());
                done();
            }, function (err) {
                console.log(err)
            });
        });
    });

    suite('- Add item', function () {
        test('must return the created item title', function (done) {
            Models.Item.forge(testItemAdd).save().then(function (data) {
                expect(data.toJSON().title).to.exist;
                done();
            });
        });

    });

    suite('- Update item', function () {
        test('must return the updated item', function (done) {
            testItem1.title = "testUpdateTitle";
            Models.Item.forge(testItem1).save().then(function (data) {
                expect(data.toJSON().id_item).to.eql(testItem1.id_item);
                done();
            });
        });

    });

    suite('- Delete item', function () {
        test('must return the deleted item title', function (done) {
            Models.Item.forge(testItem1).destroy().then(function (data) {
                expect(data.toJSON().title).to.exist;
                done();
            });
        });

    });
});
