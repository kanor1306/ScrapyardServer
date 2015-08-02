
'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');

module.exports = (function (Bookshelf) {

    var ItemType =Bookshelf.Model.extend({
        idAttribute: 'id_item_type',
        tableName : 'item_type'
    });

    return Bookshelf.model("ItemType",ItemType);

})(Bookshelf);