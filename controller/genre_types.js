/**
 * Created by nicanorgutierrez on 3/08/15.
 */
require('../data_model/models/genre_type');
require('../data_model/collections/genre_types');
var Bookshelf = require('../my_modules/utils/bookshelf');

module.exports = (function (Bookshelf) {
    return {
        list: function () {
            return Bookshelf.collection('GenreTypes').forge().fetch();
        },
        detail: function (id_genre_type) {
            return Bookshelf.model('GenreType').forge({id_genre_type: id_genre_type}).fetch();
        },
        update: function (genre_type) {
            return Bookshelf.model('GenreType').forge(genre_type).save();
        },
        create : function(genre_type){
            return Bookshelf.model('GenreType').forge(genre_type).save();
        },
        destroy : function(id_genre_type){
            return Bookshelf.model('GenreType').forge({id_genre_type: id_genre_type}).destroy();
        }
    }
})(Bookshelf);