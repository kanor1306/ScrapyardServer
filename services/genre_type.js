module.exports = (function () {
//List of users in the system
    return {
        addToSwagger: function (swagger, routes) {
            var genreTypeList = {
                'spec': {
                    "description": "List of genre types in the system",
                    "path": "/genreType/list",
                    "notes": "Returns a list of genre types",
                    "summary": "Genre types list",
                    "method": "GET",
                    "type": "Collection[GenreType]",
                    "errorResponses": [swagger.errors.notFound('GenreType')],
                    "nickname": "genreTypeList"
                },
                'action': function (req, res) {
                    routes.genre_type.list(req, res);
                }
            };

            swagger.addGet(genreTypeList);

//Details of an user
            var genreTypeDetail = {
                'spec': {
                    "description": "Details of a genre type in the system",
                    "path": "/genreType/detail/{id_genre_type}",
                    "notes": "Returns the details of a genre type",
                    "summary": "Details of a genre type",
                    "method": "GET",
                    "type": "GenreType",
                    "parameters": [swagger.pathParam("id_genre_type", "Id of the genre type", "integer")],
                    "errorResponses": [swagger.errors.notFound('GenreType')],
                    "nickname": "genreTypeDetail"
                },
                'action': function (req, res) {
                    routes.genre_type.detail(req, res);
                }
            };

            swagger.addGet(genreTypeDetail);

//Creation of new genre in the system
            var genreTypeCreation = {
                'spec': {
                    "description": "Create a new genre type",
                    "path": "/genreType/create",
                    "notes": "Method used to create a new genre type in the system",
                    "summary": "Genre type creation",
                    "method": "POST",
                    "parameters": [
                        {
                            "name": "genreType",
                            "description": "genre type to create",
                            "required": true,
                            "type": "GenreType",
                            "paramType": "body"
                        }
                    ],
                    "errorResponses": [swagger.errors.notFound('GenreType')],
                    "nickname": "createGenreType",
                    "type": "GenreType"
                },
                'action': function (req, res) {
                    routes.genre_type.create(req, res);
                }
            };

            swagger.addPost(genreTypeCreation);

//Update user information
            var genreTypeUpdate = {
                'spec': {
                    "description": "Update genre type information",
                    "path": "/genreType/update",
                    "notes": "Method used to update the information about a genre type",
                    "summary": "Update genre type",
                    "method": "PUT",
                    "parameters": [
                        {
                            "name": "genreType",
                            "description": "Genre type to update",
                            "required": true,
                            "type": "GenreType",
                            "paramType": "body"
                        }
                    ],
                    "errorResponses": [swagger.errors.notFound('GenreType')],
                    "nickname": "genreTypeUpdate"
                },
                'action': function (req, res) {
                    routes.genre_type.update(req, res);
                }
            };

            swagger.addPut(genreTypeUpdate);

//Delete user
            var genreTypeRemoval = {
                'spec': {
                    "description": "Delete genre type",
                    "path": "/genreType/destroy/{id_genre_type}",
                    "notes": "Method used to delete a genre type from the system",
                    "summary": "Delete genre type",
                    "method": "DELETE",
                    "parameters": [
                        {
                            "name": "id_genre_type",
                            "description": "Id of the genre type",
                            "required": true,
                            "type": "integer",
                            "paramType": "path"
                        }
                    ],
                    "errorResponses": [swagger.errors.notFound('GenreType')],
                    "nickname": "genreTypeRemoval",
                    "type": "GenreType"
                },
                'action': function (req, res) {
                    routes.genre_type.destroy(req, res);
                }
            };

            swagger.addDelete(genreTypeRemoval);
        }
    }
})()
