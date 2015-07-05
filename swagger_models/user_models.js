/**
 * Created by nicanor.gutierrez on 21/02/14.
 */
module.exports = {
    "User": {
        "id": "user",
        "required": ["id_user", "username", "id_game"],
        "properties": {
            "id_user": {
                "type": "integer",
                "format": "int64",
                "description": "Unique identifier for the User"
            },
            "id_game": {
                "type": "integer",
                "format": "int64",
                "description": "Unique identifier for the Game that owns the User"
            },
            "user_info": {
                "type": "array",
                "description": "Custom user information",
                "items": {
                    "$ref": "UserInfo"
                }
            },
            "username": {
                "type": "string",
                "description": "User name in the game"
            }
        }
    },
    "UserDetail": {
        "id": "user",
        "required": ["id_user", "username", "id_game"],
        "properties": {
            "id_user": {
                "type": "integer",
                "format": "int64",
                "description": "Unique identifier for the User"
            },
            "id_game": {
                "type": "integer",
                "format": "int64",
                "description": "Unique identifier for the Game that owns the User"
            },
            "user_info": {
                "type": "array",
                "description": "Custom user information",
                "items": {
                    "$ref": "UserInfo"
                }
            },
            "username": {
                "type": "string",
                "description": "User name in the game"
            },
            "albums": {
                "type": "array",
                "description": "Albums of the user",
                "items": {
                    "$ref": "Album"
                }
            }
        }
    },"UserCreation": {
        "id": "userCreation",
        "required": ["username", "id_game"],
        "properties": {
            "gameId": {
                "type": "integer",
                "format": "int64",
                "description": "Unique identifier for the Game that owns the User"
            },
            "userInfo": {
                "type": "array",
                "description": "Custom user information",
                "items": {
                    "$ref": "UserInfo"
                }
            },
            "username": {
                "type": "string",
                "description": "User name in the game"
            }
        }
    },"UserCreationResponse": {
        "id": "userCreationResponse",
        "required": ["id_user"],
        "properties": {
            "id_user": {
                "type": "integer",
                "format": "int64",
                "description": "ID único del usuario en el sistema de notificaciones"
            }
        }
    },"UserInfo": {
        "id": "user_info",
        "required": ["key, value"],
        "properties": {
            "key": {
                "type": "string",
                "description": "Name of the property that it is representing"
            },
            "value": {
                "type": "string",
                "description": "Value of the property that is representing"
            }
        }
    }


}