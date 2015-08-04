/**
 * Created by nicanorgutierrez on 3/08/15.
 */
require('../data_model/models/genre');
require('../data_model/collections/genres');
var Bookshelf = require('../my_modules/utils/bookshelf');

module.exports = (function (Bookshelf) {
    return {
        list: function () {
            return Bookshelf.collection('Genre').forge().fetch();
        },
        detail: function (id_genre) {
            return Bookshelf.model('Genre').forge({id_genre: id_genre}).fetch();
        },
        update: function (genre) {
            return Bookshelf.model('Genre').forge(genre).save();
        },
        create : function(genre){
            return Bookshelf.model('Genre').forge(genre).save();
        },
        remove : function(id_genre){
            return Bookshelf.model('Genre').forge({id_genre: id_genre}).destroy();
        }
    }
})(Bookshelf);