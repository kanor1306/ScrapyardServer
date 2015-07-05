var db = require('../../controller/db');

exports.mergeObjects = function (obj1, obj2) {
    console.log("Entrando controller Utils.js: mergeObjects")
    for (var p in obj2) {
        try {
            if (obj2[p].constructor == Object) {
                obj1[p] = this.mergeObjects(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];
            }
        } catch (e) {
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}

exports.mergeInfoObjects = function(obj1, obj2){
    console.log("Entrando controller Utils.js: mergeInfoObjects")
    for(var o in obj2){
        var key2 = obj2[o].key;
        var flag= false;
        for(var p in obj1){
            var key1 = obj1[p].key;
            if(key1==key2){
                obj1[p].value = obj2[o].value
                flag=true;
                break;
            }
        }
        if(!flag){
            obj1.push(obj2[o])
        }
    }
    return obj1;
}


exports.removeDuplicates = function(array) {
    console.log("Entrando controller Utils.js: removeDuplicates")
    var result = [];
    var object = {};
    array.forEach(function(item) {
        object[item] = null;
    });
    result = Object.keys(object);
    return result;
}

exports.concatArrays = function (arrayA, arrayB) {
    console.log("Entrando controller Utils.js: concatArrays")
    if(Array.isArray(arrayA) && Array.isArray(arrayB)){
        arrayB.forEach(function(v) {arrayA.push(v)}, this);
    }
}

