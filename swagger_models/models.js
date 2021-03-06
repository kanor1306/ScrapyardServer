/**
 * Created by nicanor.gutierrez on 24/02/14.
 */

var genre_swagger_model = require("./genre");

module.exports = (function (genre_swagger_model) {

    return {
        getModels : function () {
            var modelsArray = [genre_swagger_model];
            var models = {};
            for (c in modelsArray) {
                var model = modelsArray[c];
                for (m in model) {
                    models[m] = model[m];
                }
            }
            return models;
        }
    }

})(genre_swagger_model);