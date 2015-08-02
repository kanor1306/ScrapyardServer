'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("../models/item_type");

module.exports = (function (Bookshelf) {
    var ItemTypes = Bookshelf.Collection.extend({
        model: Bookshelf.model("ItemType")
    });
    return Bookshelf.collection("ItemTypes",ItemTypes);
})(Bookshelf);