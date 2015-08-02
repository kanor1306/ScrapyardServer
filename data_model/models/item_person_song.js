
'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');

module.exports = (function (Bookshelf) {

    var ItemPersonSong = Bookshelf.Model.extend({
        idAttribute: ['id_person','id_song','id_item'],
        tableName : 'item_person_song'
    });


    return Bookshelf.model("ItemPersonSong",ItemPersonSong);

})(Bookshelf);

