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


var album_item_type = {
    name: "album",
    id_item_type: "1"
}

var game_item_type = {
    name: "videogame",
    id_item_type: "2"
}


var testGame = {
    "name": "unitTestGame"
}

var testAlbum = {
    "title": "",
    "year": "",
    "id_item_type": "1"
}

suite('Item model', function () {

});
