module.exports = function (Bookshelf) {
    var Person = Bookshelf.Model.extend({
        idAttribute: 'id_person',
        tableName : 'person',
        albums: function () {
            return this.belongsToMany(Album).through(Album,"person_album", "id_person","id_album");
        }
    });

    var Album = Bookshelf.Model.extend({
        idAttribute: 'id_album',
        tableName : 'album',
        persons:function () {
            return this.belongsToMany(Person).through(Person,"person_album", "id_album","id_person");
        },
        artists:function(){
            return this.belongsToMany(Artist).through(Artist,"artist_album", "id_album","id_artist");
        },
        genres : function(){
            return this.belongsToMany(Genre).through(Genre,"album_genre", "id_album","id_genre");
        }
    });

    var Game = Bookshelf.Model.extend({
        idAttribute: 'id_game',
        tableName : 'game',
        songs : function(){
            return this.belongsToMany(Song).through(Song, "game_song_person", "id_game","id_song");
        },
        genres : function(){
            return this.belongsToMany(Genre).through(Genre,"game_genre", "id_game","id_genre");
        }
    });

    var Artist = Bookshelf.Model.extend({
        idAttribute: 'id_artist',
        tableName : 'artist',
        albums :  function () {
            return this.belongsToMany(Album).through(Album,"artist_album", "id_artist","id_album");
        }
    });

    var Genre = Bookshelf.Model.extend({
        idAttribute: 'id_genre',
        tableName : 'genre',
        type : function(){
            return this.hasOne(GenreType);
        }
    });

    var GenreType =Bookshelf.Model.extend({
        idAttribute: 'id_genre_type',
        tableName : 'genre_type'
    });

    var Song = Bookshelf.Model.extend({
        idAttribute: 'id_song',
        tableName : 'song',
        albums : function(){
            return this.belongsToMany(Album).through(Album,"album_song", "id_song","id_album");
        },
        artist : function(){
            return this.hasMany(Artist).through(Album);
        }
    });


    var Persons = Bookshelf.Collection.extend({
        model: Person
    });

    var Albums = Bookshelf.Collection.extend({
        model: Album
    });

    var Games = Bookshelf.Collection.extend({
        model: Game
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

    return {
        Models: {
            Person: Person,
            Genre: Genre,
            Game: Game,
            Album: Album,
            Song: Song,
            Artist: Artist,
            GenreType: GenreType
        },
        Collections: {
            Persons: Persons,
            Genres: Genres,
            Games: Games,
            Albums: Albums,
            Songs: Songs,
            Artists: Artists,
            GenreTypes: GenreTypes
        }
    };

};