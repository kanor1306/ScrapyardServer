'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("./item");
 require("./artist");
require("./item_type");
require("./song");
require("./genre");
require("./person");
require("./item_class");

module.exports = (function (Bookshelf) {

    var Item = Bookshelf.Model.extend({
        idAttribute: 'id_item',
        tableName: 'item',
        type: function () {
            return this.hasOne("ItemType", "id_item_type");
        },
        itemClass: function () {
            return this.hasOne("ItemClass", "id_item_class");
        },
        persons: function () {
            return this.belongsToMany("Person", "item_person", "id_item", "id_person");
        },
        songs: function () {
            return this.belongsToMany("Song", "item_song", "id_item", "id_song");
        },
        genres: function () {
            return this.belongsToMany("Genre", "genre_item", "id_item", "id_genre");
        },
        songsMarkedByPerson: function (id_person) {
            return this.belongsToMany("Song", "item_person_song", "id_item", "id_song").query('where', 'id_person', '=', id_person)
        }
    });

    return Bookshelf.model("Item",Item);

})(Bookshelf);