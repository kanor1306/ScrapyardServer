/**
 * Created by nicanor.gutierrez on 24/02/14.
 */

var user_models = require("./user_models");
var game_models = require("./game_models");
var album_models = require("./album_models");


exports.getModels = function(){
    var modelsArray = [user_models, album_models, game_models];
    var models={};
    for(c in modelsArray){
        var model = modelsArray[c];
        for(m in model){
            models[m]=model[m];
        }
    }
    return models;
}