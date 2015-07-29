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

var testPerson1 =
{
    "id_person":"1",
    "username": "person_1",
    "password": "person_1"
}

var testPerson2 =
{
    "id_person":"2",
    "username": "person_2",
    "password": "person_2"
}

var testPerson3 =
{
    "id_person":"3",
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
    setup(function(done){
        testUtils.prepare_db(done)
    });
    teardown(function(done){
        testUtils.clean_db(done)
    });
    suite('- List users', function () {
        test('Must return a list of users', function (done) {
            Collections.Persons.forge().fetch().then(function (data){
                expect(testPersonList.length).to.eql(data.toJSON().length);
                done();
            });
        });
    });

    suite('- Get user  by id', function () {
        test('Must return an user object', function (done) {
            Models.Person.forge({id_person: testPerson1.id_person}).fetch().then(function (data) {
                expect(testPerson1).to.eql(data.toJSON());
                done();
            }, function(err){
                console.log(err)
            });
        });
    });

    suite('- Add user', function () {
        test('must return the created user name', function (done) {
            Models.Person.forge(testPersonAdd).save().then(function (data) {
                expect(data.toJSON().username).to.exist;
                done();
            });
        });

    });
});
