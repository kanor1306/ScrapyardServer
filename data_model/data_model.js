module.exports = function (Bookshelf) {
    var Person = Bookshelf.Model.extend({
        idAttribute: 'id_person',
        tableName : 'person',
        items: function () {
            return this.belongsToMany(Item, "item_person","id_person","id_item");
        }
    });

    var Item = Bookshelf.Model.extend({
        idAttribute: 'id_item',
        tableName : 'item',
        type : function(){
            return this.hasOne(ItemType, "id_item_type");
        },
        itemClass : function(){
            return this.hasOne(ItemClass, "id_item_class");
        },
        persons:function () {
            return this.belongsToMany(Person, "item_person","id_item", "id_person");
        },
        songs:function(){
            return this.belongsToMany(Songs,"item_song", "id_item","id_song");
        },
        genres : function(){
            return this.belongsToMany(Genre,"genre_item", "id_item","id_genre");
        },
        songsByPerson : function(id_person){
            return this.belongsToMany(Songs,"item_person_song", "id_item","id_song").query('where', 'id_person', '=', id_person)
        }
    });



    var ItemPersonSong = Bookshelf.Model.extend({
        idAttribute: ['id_person','id_song','id_item'],
        tableName : 'item_person_song'
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
        model: Item,
        byType : function(id_item_type){
             return this.query('where', 'id_item_type', '=', id_item_type)
        },
        byClass : function(id_item_class){
            return this.query('where', 'id_item_class', '=', id_item_class)
        }
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
        model: ItemType
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
            Items: Items,
            ItemTypes : ItemTypes,
            ItemClasses: ItemClasses,
            Songs: Songs,
            Artists: Artists,
            GenreTypes: GenreTypes
        }
    };

};