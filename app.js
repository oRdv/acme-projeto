const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { request } = require('http')


const app = express()

app.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'Get')

    app.use(cors())

    next()
})

app.get('/v1/Acme-Filmes/TodosFilmes', cors(), async function(request, response, next){
    let controlarTodosFilmes = require('./controller/funcoes.js')
    let filmes = controlarTodosFilmes.getTodosFilmes()
    response.json(filmes)
    response.status(200)
})

app.get('/v1/Acme-Filmes/TodosFilmesID', cors(), async function(request, response, next){
   let id = request.query.id
   let controlarTodosFilmes = require('./controller/funcoes.js')
   let filmes = controlarTodosFilmes.getFilmesId(id)

   if(filmes) {
    response.json(filmes)
    response.status(200)

   } else {
        response.status(404)
        response.json({erro: 'O item desejado não foi localizado.'})
   }
})

app.listen(8080, function(){
    console.log('AAAAAAAAAAA')
})