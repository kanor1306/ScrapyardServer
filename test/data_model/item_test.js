/**
 * Created by nicanorgutierrez on 12/07/15.
 */


var Item = require('../../data_model/models/item');
var Items = require('../../data_model/collections/items');

var expect = require('expect.js');
var testUtils = require('./../test_utils');

var itemsListLength = 8;
var list_item_persons_lenght = 2;
var list_item_songs_lenght = 2;
var list_item_genres_lenght = 1;
var list_item_by_type_1 = 3;
var list_item_by_class_1 = 5;
var list_songs_of_item_by_person_1 = 2;
var list_songs_of_item_by_person_2 = 1;


var test_person_1 = {
    id_person: "1",
    username: "person_1"
}

var test_person_2 = {
    id_person: "2",
    username: "person_2"
}

var test_item_type_1 = {
    id_item_type: "1",
    name: "item_type_1"
}

var test_item_class_1 = {
    id_item_class: "1",
    name: "item_class_1"
}

var testItem1 =
{
    "id_item": "1",
    "title": "item_1",
    "year": 2000,
    "additionalInfo": {"info1": "info1", "info2": "info2"},
    "id_item_type": "1",
    "id_item_class": "1"
}


var testItemAdd =
{
    "title": "item test",
    "year": 2000,
    "additionalInfo": {"info1": "info1", "info2": "info2"},
    "id_item_type": "1",
    "id_item_class": "1"
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
            Items.forge().fetch().then(function (data) {
                expect(itemsListLength).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get item  by id', function () {
        test('Must return an item object', function (done) {
            Item.forge({id_item: testItem1.id_item}).fetch().then(function (data) {
                expect(testItem1).to.eql(data.toJSON());
                done();
            }, function (err) {
                console.log(err)
            });
        });
    });

    suite('- Add item', function () {
        test('must return the created item title', function (done) {
            Item.forge(testItemAdd).save().then(function (data) {
                expect(data.toJSON().title).to.exist;
                done();
            });
        });

    });

    suite('- Update item', function () {
        test('must return the updated item', function (done) {
            testItem1.title = "testUpdateTitle";
            Item.forge(testItem1).save().then(function (data) {
                expect(data.toJSON().id_item).to.eql(testItem1.id_item);
                done();
            });
        });

    });

    suite('- Delete item', function () {
        test('must return the deleted item title', function (done) {
            Item.forge(testItem1).destroy().then(function (data) {
                expect(data.toJSON().title).to.exist;
                done();
            });
        });
    });

    suite('- Get item type', function () {
        test('must return a item type', function (done) {
            Item.forge({id_item: testItem1.id_item}).type().fetch().then(function (data) {
                expect(test_item_type_1.name).to.eql(data.toJSON().name);
                done();
            });
        });
    });

    suite('- Get item class', function () {
        test('must return a item class', function (done) {
            Item.forge({id_item: testItem1.id_item}).itemClass().fetch().then(function (data) {
                expect(test_item_class_1.name).to.eql(data.toJSON().name);
                done();
            });
        });
    });

    suite('- Get item persons', function () {
        test('must return a list of item persons', function (done) {
            Item.forge({id_item: testItem1.id_item}).persons().fetch().then(function (data) {
                expect(list_item_persons_lenght).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get item songs', function () {
        test('must return a list of songs of an item', function (done) {
            Item.forge({id_item: testItem1.id_item}).songs().fetch().then(function (data) {
                expect(list_item_songs_lenght).to.eql(data.toJSON().length);
                done();
            });
        });
    })

    suite('- Get item songs by person', function () {
        test('must return a list of songs of an item selected by a person', function (done) {
            Item.forge({id_item: testItem1.id_item}).songsMarkedByPerson(test_person_1.id_person).fetch().then(function (data) {
                expect(list_songs_of_item_by_person_1).to.eql(data.toJSON().length);
                done();
            });
        });
    })

    suite('- Get item genres', function () {
        test('must return a list of genres of an item', function (done) {
            Item.forge({id_item: testItem1.id_item}).genres().fetch().then(function (data) {
                expect(list_item_genres_lenght).to.eql(data.toJSON().length);
                done();
            });
        });
    })

    suite('- Get items by item class', function () {
        test('must return a list of items of a class', function (done) {
            Items.forge().byClass(test_item_class_1.id_item_class).fetch().then(function (data) {
                expect(list_item_by_class_1).to.eql(data.toJSON().length);
                done();
            });
        });
    })

    suite('- Get items by item type', function () {
        test('must return a list of items of a class', function (done) {
            Items.forge().byType(test_item_type_1.id_item_type).fetch().then(function (data) {
                expect(list_item_by_type_1).to.eql(data.toJSON().length);
                done();
            });
        });
    })
});
