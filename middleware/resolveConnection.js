const { getConnectionByName } = require('../configMultitenant/index')


function resolveConnection(req, resp, next) {
    console.log("entro al middleware")
    let { sucursal } = req.query
    console.log(sucursal)
    if (!sucursal) {
        return resp.status(401).send({ msg: "Its requiere the name sucursal" })
    } else {
        let connection = getConnectionByName(sucursal)
        if (connection === undefined) {
            resp.status(401).send({ msg: "No existe la sucursal" })
        } else {
            req.knex = connection
            next()
        }
    }
}

module.exports = {
    resolveConnection
}