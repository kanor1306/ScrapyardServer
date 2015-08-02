'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("../models/song");

module.exports = (function (Bookshelf) {
    var Songs = Bookshelf.Collection.extend({
        model: Bookshelf.model("Song")
    });

    return Bookshelf.collection("Songs",Songs);
})(Bookshelf);