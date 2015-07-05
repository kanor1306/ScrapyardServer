/**
 * Created by nicanor.gutierrez on 24/02/14.
 */

var user_models = require("./user_models");
var app_models = require("./app_models");
var device_models = require("./device_models");


exports.getModels = function(){
    var modelsArray = [user_models, app_models, device_models];
    var models={};
    for(c in modelsArray){
        var model = modelsArray[c];
        for(m in model){
            models[m]=model[m];
        }
    }
    return models;
}