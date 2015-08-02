
'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');

module.exports = (function (Bookshelf) {

    var ItemClass =Bookshelf.Model.extend({
        idAttribute: 'id_item_class',
        tableName : 'item_class'
    });


    return Bookshelf.model("ItemClass",ItemClass);

})(Bookshelf);