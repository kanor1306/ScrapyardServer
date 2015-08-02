
'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("./genre_type");

module.exports = (function (Bookshelf) {

    var Genre = Bookshelf.Model.extend({
        idAttribute: 'id_genre',
        tableName : 'genre',
        type : function(){
            return this.hasOne("GenreType");
        }
    });

    return Bookshelf.model("Genre",Genre);

})(Bookshelf);