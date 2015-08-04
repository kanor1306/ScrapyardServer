var genres_controller = require('../controller/genres');

module.exports = (function (genres_controller) {
    return {
        //Handle the items list request
        //Each element has the following fields:  id, name,id_genre_type
        //It is sent in the response in JSON format.
        //If it fails, return the corresponding error message.
        list: function (req, res) {
            console.log("Entering router genre.js: list")
            genres_controller.list().then(
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
        //Handle the items list request
        //Each element has the following fields:  id, name,id_genre_type
        //It is sent in the response in JSON format.
        //If it fails, return the corresponding error message.
        listByType: function (req, res) {
            console.log("Entering router genre.js: list")
            var id_genre_type = req.params.id_genre_type;

            genres_controller.listByType(id_genre_type).then(
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

        //Handles the request of the detail about a genre
        //The response has the following fields:  id, name,id_genre_type
        //It is sent in the response in JSON format.
        //If it fails, return the corresponding error message.
        detail: function (req, res) {
            console.log("Entering router genre.js: detail")
            var id_genre = req.params.id_genre;
            genres_controller.detail(id_genre).then(
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

        //Handles the request of adding a new genre in the system
        //It receives an objet with the following fields: name, id_genre_type.
        //In the response will be returned a 201 if it is created, and a JSON
        // with the id of the new genre if it is correctly created.
        //If not will return the corresponding error code.
        create: function (req, res) {
            console.log("Entering router genre.js: create")
            var name = req.body.name;
            var id_genre_type = req.body.id_genre_type;
            genres_controller.create(name, id_genre_type).then(
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


        //Handles the request of updating a genre.
        //It receives the foillowing fields: id, name, id_genre_type
        //In the response will be returned a 200 if it is updated, and a JSON
        // with the new object if it is correctly created.
        //If not will return the corresponding error code.
        update: function (req, res) {
            console.log("Entering router genre.js: update")
            var id_genre = req.body.id_genre
            var name = req.body.name;
            var id_genre_type = req.body.id_genre_type;
            genres_controller.update(req.body).then(
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
            console.log("Entrando router genre.js: delete")
            var id_genre = req.params.id_genre;
            genres_controller.delete(id_genre).then(
                function (controllerResponse) {
                    es.statusCode = 204;
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
})(genres_controller);

