var genre_types_controller = require('../controller/genre_types');

module.exports = (function (genre_types_controller) {
    return {
        //Handle the items list request
        //Each element has the following fields: name,id_genre_type
        //It is sent in the response in JSON format.
        //If it fails, return the corresponding error message.
        list: function (req, res) {
            console.log("Entering router genre_type.js: list")
            genre_types_controller.list().then(
                function (controllerResponse) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(controllerResponse);
                },
                function (err) {
                    res.send(err.message);
                }
            );
        },

        //Handles the request of the detail about a genre_type
        //The response has the following fields:  id, name,id_genre_type
        //It is sent in the response in JSON format.
        //If it fails, return the corresponding error message.
        detail: function (req, res) {
            console.log("Entering router genre_type.js: detail")
            var id_genre_type = req.params.id_genre_type;
            genre_types_controller.detail(id_genre_type).then(
                function (controllerResponse) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(controllerResponse);
                },
                function (err) {
                    res.send(err.message);
                }
            );
        },

        //Handles the request of adding a new genre_type in the system
        //It receives an objet with the following fields: name, id_genre_type.
        //In the response will be returned a 201 if it is created, and a JSON
        // with the id of the new genre_type if it is correctly created.
        //If not will return the corresponding error code.
        create: function (req, res) {
            console.log("Entering router genre_type.js: create")
            var name = req.body.name;
            var id_genre_type = req.body.id_genre_type;
            genre_types_controller.create(id_genre_type, name).then(
                function (controllerResponse) {
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(controllerResponse);
                },
                function (err) {
                    res.send(err.message);
                }
            );
        },


        //Handles the request of updating a genre_type.
        //It receives the foillowing fields: id, name, id_genre_type
        //In the response will be returned a 200 if it is updated, and a JSON
        // with the new object if it is correctly created.
        //If not will return the corresponding error code.
        update: function (req, res) {
            console.log("Entering router genre_type.js: update")
            genre_types_controller.update(req.body).then(
                function (controllerResponse) {
                    res.statusCode = 202;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(controllerResponse);
                },
                function (err) {
                    res.send(err.message);
                }
            );
        },
        destroy: function (req, res) {
            console.log("Entrando router genre_type.js: delete")
            var id_genre_type = req.params.id_genre_type;
            genre_types_controller.destroy(id_genre_type).then(
                function (controllerResponse) {
                    res.statusCode = 204;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(controllerResponse);
                },
                function (err) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'text/html');
                }
            );
        }
    }
})(genre_types_controller);

