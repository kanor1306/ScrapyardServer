'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("../models/genre_type");

module.exports = (function (Bookshelf) {
    var GenreTypes = Bookshelf.Collection.extend({
        model: Bookshelf.model("GenreType")
    });
    return Bookshelf.collection("GenreTypes",GenreTypes);
})(Bookshelf);