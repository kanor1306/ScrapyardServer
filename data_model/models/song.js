'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("./item");
require("./artist");

module.exports =  (function (Bookshelf) {
    var Song = Bookshelf.Model.extend({
        idAttribute: 'id_song',
        tableName: 'song',
        items: function () {
            return this.belongsToMany('Item', "item_song", "id_song", "id_item");
        },
        artist: function () {
            return this.belongsToMany('Artist', "artist_song", "id_song", "id_artist");
        }
    });
    return Bookshelf.model("Song",Song);
})(Bookshelf);