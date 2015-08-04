/**
 * Created by nicanor.gutierrez on 21/02/14.
 */
module.exports = {
    "Genre": {
        "id": "Genre",
        "required": ["id_genre, name, id_genre_type"],
        "properties": {
            "id_genre": {
                "type": "integer",
                "format": "int64",
                "description": "Genre unique identifier in the system"
            },
            "name": {
                "type": "string",
                "description": "Name of the genre"
            },
            "id_genre_type": {
                "type": "integer",
                "format": "int64",
                "description": "Identifier of the genre type"
            }
        }
    }
}