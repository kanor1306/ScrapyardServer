'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("../models/genre");

module.exports = (function (Bookshelf) {
    var Genres = Bookshelf.Collection.extend({
        model: Bookshelf.model("Genre")
    });

    return Bookshelf.collection("Genres",Genres);
})(Bookshelf);