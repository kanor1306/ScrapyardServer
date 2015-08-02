'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("../models/artist");

module.exports = (function (Bookshelf) {

    var Artists = Bookshelf.Collection.extend({
        model: Bookshelf.model("Artist")
    });
    return Bookshelf.collection("Artists",Artists);

})(Bookshelf);