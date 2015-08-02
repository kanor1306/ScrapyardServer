/**
 * Created by nicanorgutierrez on 12/07/15.
 */


var Person = require('../../data_model/models/person');
var Persons = require('../../data_model/collections/persons');

var expect = require('expect.js');
var testUtils = require('./test_utils');
var items_related_length = 3;
var marked_songs_length = 2;

var testPerson1 =
{
    "id_person": "1",
    "username": "person_1",
    "password": "person_1"
}

var testPerson2 =
{
    "id_person": "2",
    "username": "person_2",
    "password": "person_2"
}

var testPerson3 =
{
    "id_person": "3",
    "username": "person_3",
    "password": "person_3"
}

var testPersonAdd =
{
    "username": "testPersonAdd",
    "password": "testPersonAdd"
}

var testPersonList = [testPerson1, testPerson2, testPerson3]

suite('Person model', function () {
    setup(function (done) {
        testUtils.prepare_db(done)
    });
    teardown(function (done) {
        testUtils.clean_db(done)
    });
    suite('- List users', function () {
        test('Must return a list of users', function (done) {
            Persons.forge().fetch().then(function (data) {
                expect(testPersonList.length).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get user  by id', function () {
        test('Must return an user object', function (done) {
            Person.forge({id_person: testPerson1.id_person}).fetch().then(function (data) {
                expect(testPerson1).to.eql(data.toJSON());
                done();
            }, function (err) {
                console.log(err)
            });
        });
    });

    suite('- Add user', function () {
        test('must return the created user name', function (done) {
            Person.forge(testPersonAdd).save().then(function (data) {
                expect(data.toJSON().username).to.exist;
                done();
            });
        });

    });

    suite('- Update user', function () {
        test('must return the updated user', function (done) {
            testPerson1.password = "testUpdatePassword";
            Person.forge(testPerson1).save().then(function (data) {
                expect(data.toJSON().id_person).to.eql(testPerson1.id_person);
                done();
            });
        });

    });

    suite('- Delete user', function () {
        test('must return the deleted user name', function (done) {
            Person.forge(testPerson1).destroy().then(function (data) {
                expect(data.toJSON().username).to.exist;
                done();
            });
        });

    });

    suite('- Get user items', function () {
        test('must return a list of items', function (done) {
            Person.forge({id_person: testPerson1.id_person}).fetch({
                withRelated: ['items']
            }).then(function (data) {
                expect(items_related_length).to.eql(data.toJSON().items.length);
                done();
            });
        });
    })

    suite('- Get user marked songs', function () {
        test('must return a list of songs', function (done) {
            Person.forge({id_person: testPerson1.id_person}).markedSongs().fetch().then(function (data) {
                expect(marked_songs_length).to.eql(data.toJSON().length);
                done();
            });
        });
    })
});
