'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("../models/item_class");

module.exports = (function (Bookshelf) {

    var ItemClasses = Bookshelf.Collection.extend({
        model: Bookshelf.model("ItemClass")
    });

    return Bookshelf.collection("ItemClasses",ItemClasses);

})(Bookshelf);