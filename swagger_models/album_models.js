/**
 * Created by nicanor.gutierrez on 21/02/14.
 */
module.exports = {
    "Album": {
        "id": "album",
        "required": ["uuid, model, artist, id_album, id_user"],
        "properties": {
            "id_album": {
                "type": "integer",
                "format": "int64",
                "description": "Album unique identifier in the system"
            },
            "id_user": {
                "type": "integer",
                "format": "int64",
                "description": "User unique identifier in the system"
            },
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
    },"AlbumNotification": {
        "id": "album_notification",
        "required": ["message, idAlbums"],
        "properties": {
            "message": {
                "type": "NotificationMessage",
                "description": "Mensaje a enviar en la notificación"
            },
            "idAlbums": {
                "type": "array",
                "description": "Ids de los dispositivos a los que se va a notificar",
                "items": {
                    "type": "integer",
                    "description": "ID del dispositivo en el sistema"
                }
            }
        }
    },"AlbumInfoNotification": {
        "id": "album_info_notification",
        "required": ["message, albumInfo"],
        "properties": {
            "message": {
                "type": "NotificationMessage",
                "description": "Mensaje a enviar en la notificación"
            },
            "albumInfo": {
                "type": "array",
                "description": "Información de los dispositivos a los que se va a notificar",
                "items": {
                    "items": {
                        "$ref": "AlbumInfo"
                    }
                }
            }
        }
    }
}