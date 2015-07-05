/**
 * Created by nicanor.gutierrez on 21/02/14.
 */
module.exports = {
    "Game": {
        "id": "game",
        "required": ["id_game, name"],
        "properties": {
            "id_game": {
                "type": "integer",
                "format": "int64",
                "description": "Unique identifier of the game"
            },
            "name": {
                "type": "string",
                "description": "Name of the game"
            }
        }
    },"GameCreation": {
        "id": "game",
        "required": ["name"],
        "properties": {
            "name": {
                "type": "string",
                "description": "Name of the game"
            }
        }
    }, "GameNotification": {
        "id": "game_notification",
        "required": ["message, idGames"],
        "properties": {
            "message": {
                "type": "NotificationMessage",
                "description": "Mensaje a enviar en la notificación"
            },
            "gameIds": {
                "type": "array",
                "description": "Ids de las aplicaciones a las que se va a notificar",
                "items": {
                    "type": "integer",
                    "description": "ID de la aplicación en el sistema"
                }
            }
        }
    },"GameCreationResponse": {
        "id": "gameCreationResponse",
        "required": ["id_game"],
        "properties": {
            "id_user": {
                "type": "integer",
                "format": "int64",
                "description": "ID único de la aplicación en el sistema de notificaciones"
            }
        }
    }
}