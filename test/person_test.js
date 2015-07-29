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

var testPerson1 =
{
    "id_person":"1",
    "username": "person1",
    "password": "person1"
}

var testPerson2 =
{
    "id_person":"2",
    "username": "person2",
    "password": "person2"
}

var testPerson3 =
{
    "id_person":"3",
    "username": "person3",
    "password": "person3"
}

var testPersonList = [testPerson1, testPerson2, testPerson3]

suite('Person model', function () {

});
