'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("../models/person");

module.exports = (function (Bookshelf) {
    var Persons = Bookshelf.Collection.extend({
        model: Bookshelf.model("Person")
    });
    return Bookshelf.collection("Persons",Persons);
})(Bookshelf);