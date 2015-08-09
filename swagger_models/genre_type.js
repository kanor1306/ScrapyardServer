/**
 * Created by nicanor.gutierrez on 21/02/14.
 */
module.exports = {
    "GenreType": {
        "id": "GenreType",
        "required": ["id_genre_type, name"],
        "properties": {
            "id_genre_type": {
                "type": "integer",
                "format": "int64",
                "description": "Identifier of the genre type"
            },
            "name": {
                "type": "string",
                "description": "Name of the genre type"
            }
        }
    }
}