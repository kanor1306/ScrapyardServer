
'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');

module.exports = (function (Bookshelf) {

    var GenreType =Bookshelf.Model.extend({
        idAttribute: 'id_genre_type',
        tableName : 'genre_type'
    });

    return Bookshelf.model("GenreType",GenreType);

})(Bookshelf);