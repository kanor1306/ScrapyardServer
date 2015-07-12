/**
 * Created by nicanor.gutierrez on 21/02/14.
 */
module.exports = {
    "Game": {
        "id": "game",
        "required": ["id_game, name, description"],
        "properties": {
            "id_game": {
                "type": "integer",
                "format": "int64",
                "description": "Unique identifier of the game"
            },
            "name": {
                "type": "string",
                "description": "Name of the game"
            },
            "description": {
                "type": "string",
                "description": "Description of the game"
            }
        }
    },"GameCreation": {
        "id": "game",
        "required": ["name, description"],
        "properties": {
            "name": {
                "type": "string",
                "description": "Name of the game"
            },
            "description": {
                "type": "string",
                "description": "Description of the game"
            }
        }
    },"GameCreationResponse": {
        "id": "gameCreationResponse",
        "required": ["id_game"],
        "properties": {
            "id_game": {
                "type": "integer",
                "format": "int64",
                "description": "Id of the game"
            }
        }
    }
}