const knex = require('knex')
let connectionMap = [];


function getConnectionKnex() {
    return knex({
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'bootcamp'
        },
        pool: { min: 2, max: 20 }
    });
}


async function getConections(){
    let data = await getConnectionKnex().select('*').from('master')
    connectionMap = data.map(tenant => {
        return {
            [tenant.name] : knex(createConnectionTenant(tenant))
        }
    })
    .reduce((prev, next) => {
        return Object.assign({}, prev, next);
    }, {});
}


function createConnectionTenant(tenant){
    let objConnection={
        client: 'mysql',
        connection: {
            host: tenant.host,
            port: tenant.port,
            user: tenant.user,
            password: tenant.password,
            database: tenant.database
        },
        pool: { min: 2, max: 20 }
    }
    return objConnection
}


function getConnectionByName(name){
    if(connectionMap){
        return connectionMap[name]
    }
}




module.exports = {
    getConections,
    getConnectionByName
}