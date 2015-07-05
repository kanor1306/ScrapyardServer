var Promise = require('bluebird');
var pg = Promise.promisifyAll(require('pg'));

var conString = "postgres://postgres:postgres@localhost:5433/notifications";

module.exports = {
    query: function (text, value) {
        console.time("DB query "+text);
        return pg.connectAsync(conString).then(function (contents) {
            return contents;
        },function (error) {
            console.timeEnd("DB query "+text);
            error.error = true;
            throw error;
        }).then(
            function (contents) {
                var client = Promise.promisifyAll(contents[0]);
                var done = contents[1];
                return  client.queryAsync(text, value).then(
                    function (result) {
                        done(true);
                        console.timeEnd("DB query "+text);
                        return result.rows;
                    }, function (err) {
                        done(true);
                        console.timeEnd("DB query "+text);
                        throw err;
                    });
            }, function (error) {
                console.timeEnd("DB query "+text);
                if (!error.error) {
                    error.error = true;
                }
                throw error;
            });
    },
    transactionalQuery: function (originalQueries) {
        console.time("DB transaction");
        var results = new Array();
        var rollback = function (client, done) {
            client.queryAsync('ROLLBACK').then(function (err) {
                    console.timeEnd("DB transaction");
                    return done(err);
            });
        }

        var processTick = function (queries, client, done) {
            if (queries.length != 0) {
                var query = queries[0].query;
                var values = queries[0].values;
                console.time("DB query "+query);
                return client.queryAsync(query, values).then(function (result) {
                    console.timeEnd("DB query "+query);
                    results.push(result.rows);
                    queries.shift();
                    if(queries.length==0){
                        return client.queryAsync('COMMIT', done).then(function(){
                            console.timeEnd("DB transaction");
                            done(true);
                            return results;
                        })
                    }else{
                        console.timeEnd("DB query "+query);
                        return processTick(queries, client, done);
                    }
                }, function (err) {
                    console.timeEnd("DB query "+query);
                    rollback(client, done);
                    throw err;
                })
            }
        }

        return pg.connectAsync(conString).then(function (contents) {
            var client = Promise.promisifyAll(contents[0]);
            var done = contents[1];
            return client.queryAsync('BEGIN').then(function () {
                return processTick(originalQueries, client, done);
            }, function (err) {
                rollback(client, done);
                throw err;
            });
        }, function (err) {
            throw err;
        });
    },
   bulkQuery: function (query, originalValues) {
       console.time("DB bulk query "+query.toString());
       var result= new Array();
        var processTick = function (values, client, done) {
            if (values.length != 0) {
                var value = values[0];
                return client.queryAsync(query, value).then(function (content) {
                    result.push(content.rows);
                    values.shift();
                    if(values.length==0){
                        done(true);
                        console.timeEnd("DB bulk query "+query.toString());
                        return result;
                    }else{
                        return processTick(values, client, done);
                    }
                }, function (err) {
                    done(true);
                    console.timeEnd("DB bulk query "+query.toString());
                    throw err;
                })
            }
        }

        return pg.connectAsync(conString).then(function (contents) {
            var client = Promise.promisifyAll(contents[0]);
            var done = contents[1];
            return processTick(originalValues, client, done);
        }, function (err) {
            throw err;
        });
    }
}