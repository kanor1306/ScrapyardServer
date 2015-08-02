'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("../models/item");

module.exports = (function (Bookshelf) {
    var Items = Bookshelf.Collection.extend({
        model: Bookshelf.model("Item"),
        byType : function(id_item_type){
            return this.query('where', 'id_item_type', '=', id_item_type)
        },
        byClass : function(id_item_class){
            return this.query('where', 'id_item_class', '=', id_item_class)
        }
    });
    return Bookshelf.collection("Items",Items);
})(Bookshelf);