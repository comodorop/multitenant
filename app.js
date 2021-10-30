const express = require('express')
const app = express()
const {getConections} = require('./configMultitenant/index')
const {resolveConnection}  = require('./middleware/resolveConnection')
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(resolveConnection)

getConections().then(msg=>{
    console.log("Get all connection")
}).catch(err=>{
    console.log(err)
})


app.get('/clients', async (req, resp)=>{
    let {knex} = req
    let lstClients = await knex().select('*').from('clients')
    resp.status(200).send({data: lstClients})
})



app.listen(3001, ()=>{
    console.log("Server listening in the 3001 ")
})