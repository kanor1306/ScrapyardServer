'use strict';

var config = require('../../config');
var Bookshelf = require('bookshelf');

module.exports = (function (Bookshelf) {
    if (!Bookshelf.hasOwnProperty('PG')) {
        Bookshelf.PG = Bookshelf.initialize(config.developmentDatabaseConfig);
        Bookshelf.PG.plugin('registry');
    }
    return Bookshelf.PG;
})(Bookshelf);