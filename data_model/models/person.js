
'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("./song");
require("./item");

module.exports = (function (Bookshelf) {

    var Person = Bookshelf.Model.extend({
        idAttribute: 'id_person',
        tableName : 'person',
        items: function () {
            return this.belongsToMany('Item', "item_person","id_person","id_item");
        },
        markedSongs: function(){
            return this.belongsToMany('Song',"item_person_song", "id_person","id_song");
        }
    });

    return Bookshelf.model("Person",Person);

})(Bookshelf);