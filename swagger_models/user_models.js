/**
 * Created by nicanor.gutierrez on 21/02/14.
 */
module.exports = {
    "User": {
        "id": "user",
        "required": ["id_user", "username"],
        "properties": {
            "id_user": {
                "type": "integer",
                "format": "int64",
                "description": "Unique identifier for the User"
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
        "required": ["id_user", "username"],
        "properties": {
            "id_user": {
                "type": "integer",
                "format": "int64",
                "description": "Unique identifier for the User"
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
            },
            "games":{
                "type":"array",
                "description": "Games played by the user",
                "items" : {
                    "$ref" : "Game"
                }
            }
        }
    },"UserCreation": {
        "id": "userCreation",
        "required": ["username"],
        "properties": {
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