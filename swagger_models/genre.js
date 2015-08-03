/**
 * Created by nicanor.gutierrez on 21/02/14.
 */
module.exports = {
    "Album": {
        "id": "album",
        "required": ["title, id_artist, id_album"],
        "properties": {
            "id_album": {
                "type": "integer",
                "format": "int64",
                "description": "Album unique identifier in the system"
            },
            "id_artist": {
                "type": "string",
                "description": "Artist of the album"
            },
            "title": {
                "type": "string",
                "description": "Name of the album"
            }
        }
    },
    "AlbumDetail": {
        "id": "albumDetail",
        "required": ["id_album, uuid"],
        "properties": {
            "id_album": {
                "type": "integer",
                "format": "int64",
                "description": "Album unique identifier in the system"
            },
            "artist": {
                "type": "string",
                "description": "Artist of the album"
            },
            "title": {
                "type": "string",
                "description": "Model of the album"
            },
            "album_info": {
                "type": "array",
                "description": "Custom user information",
                "items": {
                    "$ref": "AlbumInfo"
                }
            }
        }
    },"AlbumCreation": {
        "id": "albumCreation",
        "required": ["uuid, artist, model"],
        "properties": {
            "uuid": {
                "type": "integer",
                "format": "int64",
                "description": "Universal album unique identifier"
            },
            "artist": {
                "type": "string",
                "description": "Artist of the album"
            },
            "model": {
                "type": "string",
                "description": "Model of the album"
            },
            "protocol": {
                "type": "string",
                "description": "Protocol used by the album to receive notifications"
            },
            "notification_info": {
                "type": "array",
                "description": "Custom user information",
                "items": {
                    "$ref": "NotificationInfo"
                }
            },
            "album_info": {
                "type": "array",
                "description": "Custom user information",
                "items": {
                    "$ref": "AlbumInfo"
                }
            }
        }
    },"AlbumInfo": {
        "id": "album_info",
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
    },"AlbumCreationResponse": {
        "id": "albumCreationResponse",
        "required": ["id_album"],
        "properties": {
            "id_user": {
                "type": "integer",
                "format": "int64",
                "description": "ID único del dispositivo en el sistema de notificaciones"
            }
        }
    }
}