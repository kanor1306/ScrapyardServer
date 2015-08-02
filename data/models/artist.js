/**
 * Created by nicanorgutierrez on 2/08/15.
 */

'use strict';

var Bookshelf = require('../../my_modules/utils/bookshelf');
require("./song");

module.exports = (function (Bookshelf) {
    var Artist = Bookshelf.Model.extend({
        idAttribute: 'id_artist',
        tableName : 'artist',
        songs :  function () {
            return this.belongsToMany("Song", "artist_song", "id_artist","id_song");
        }
    });

    return Bookshelf.model("Artist",Artist);

})(Bookshelf);