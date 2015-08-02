/**
 * Created by nicanorgutierrez on 24/07/15.
 */

var exec = require('child_process').exec;

exports.prepare_db = function(done){
            exec('psql -d test_db -f test/sqlScripts/test_db.sql', function(err){
                if (err !== null) {
                    console.log('exec error: ' + err);
                }else{
                    done();
                }
            });
    }


exports.clean_db = function(done){
    exec('psql -d test_db -f test/sqlScripts/drop.sql', function(err){
        if (err !== null) {
            console.log('exec error: ' + err);
        }else{
            done()
        }
    });
}