module.exports = function (Bookshelf) {
    var Person = Bookshelf.Model.extend({
        idAttribute: 'id_person',
        tableName : 'person',
        items: function () {
            return this.belongsToMany(Album).through(Album,"person_album", "id_person","id_album");
        }
    });

    var Item = Bookshelf.Model.extend({
        idAttribute: 'id_item',
        tableName : 'item',
        type : function(){
            return this.hasOne(ItemType);
        },
        itemClass : function(){
            return this.hasOne(ItemClass);
        },
        persons:function () {
            return this.belongsToMany(Person).through(Person,"item_person", "id_item","id_person");
        },
        songs:function(){
            return this.belongsToMany(Artist).through(Artist,"item_songs", "id_item","id_song");
        },
        genres : function(){
            return this.belongsToMany(Genre).through(Genre,"item_genre", "id_item","id_genre");
        }
    });


    var Artist = Bookshelf.Model.extend({
        idAttribute: 'id_artist',
        tableName : 'artist',
        songs :  function () {
            return this.belongsToMany(Song).through(Song,"artist_song", "id_artist","id_song");
        }
    });

    var Genre = Bookshelf.Model.extend({
        idAttribute: 'id_genre',
        tableName : 'genre',
        type : function(){
            return this.hasOne(GenreType).through(GenreType);
        }
    });

    var GenreType =Bookshelf.Model.extend({
        idAttribute: 'id_genre_type',
        tableName : 'genre_type'
    });


    var ItemType =Bookshelf.Model.extend({
        idAttribute: 'id_item_type',
        tableName : 'item_type'
    });


    var ItemClass =Bookshelf.Model.extend({
        idAttribute: 'id_item_class',
        tableName : 'item_class'
    });

    var Song = Bookshelf.Model.extend({
        idAttribute: 'id_song',
        tableName : 'song',
        item : function(){
            return this.belongsToMany(Album).through(Album,"item_song", "id_song","id_item");
        },
        artist : function(){
            return this.hasMany(Artist).through(Song, "artist_song", "id_song", "id_artist");
        }

    });


    var Persons = Bookshelf.Collection.extend({
        model: Person
    });

    var Items = Bookshelf.Collection.extend({
        model: Item
    });

    var Genres = Bookshelf.Collection.extend({
        model: Genre
    });

    var Songs = Bookshelf.Collection.extend({
        model: Song
    });

    var Artists = Bookshelf.Collection.extend({
        model: Artist
    });

    var GenreTypes = Bookshelf.Collection.extend({
        model: GenreType
    });

    var ItemTypes = Bookshelf.Collection.extend({
        model: ItemTypes
    });

    var ItemClasses = Bookshelf.Collection.extend({
        model: ItemClass
    });

    return {
        Models: {
            Person: Person,
            Genre: Genre,
            Item: Item,
            ItemType: ItemType,
            ItemClass:ItemClass,
            Song: Song,
            Artist: Artist,
            GenreType: GenreType
        },
        Collections: {
            Persons: Persons,
            Genres: Genres,
            Item: Item,
            ItemTypes : ItemTypes,
            ItemClasses: ItemClasses,
            Songs: Songs,
            Artists: Artists,
            GenreTypes: GenreTypes
        }
    };

};