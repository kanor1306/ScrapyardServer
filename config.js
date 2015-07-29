/**
 * Created by nicanorgutierrez on 12/07/15.
 */

exports.productionDatabaseConfig = {
    client: 'pg',
    connection: {
        host: 'ec2-54-243-187-196.compute-1.amazonaws.com',
        port: '5432',
        user: 'lklcyrdakgpuru',
        password: process.env.POSTGRESQL_HEROKU_PASS,
        database: 'dfdn5uu82vahtb',
        ssl: true,
        timeout : 5000
    }
}

exports.developmentDatabaseConfig = {
    client: 'pg',
    connection: {
        host: 'localhost',
        port: '5432',
        user: 'nicanorgutierrez',
        password: process.env.POSTGRESQL_HEROKU_PASS,
        database: 'test_db',
        timeout : 5000
    }
}
