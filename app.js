//para realiza a integracção do banco de dados precisaos de uma biblioteca 
//SEQUELIZE ORM - Bilioteca mais antiga 
//PRISMA ORM - Biblioteca mais atual 
//FASTIFY ORM - Bilioteca mais atual
//:/ params - apenas id
///?nome query - apenas nomes

//PRISMA - 
//nm install prisma --save (quem realiza a conxão com o banco de dados)
//npm install @prisma/client --save (é qem execulta o scripits SQL e BO)
//npx prisma init (deveos rodar apos as instalações acima, ele inicializa a utilização do prisma no projeto)

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { request } = require('http')


const app = express()

app.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//cria um objeto para definir o tipo de dados que ira chegar no body (JSON) NAO FUNCIONA SEM ESSA LINHA 
const bodyParserJson = bodyParser.json()

//import dos aquivos internos do projeto
const controlerFilmes = require('./controller/controller_filme.js')


//Endpoints com a minha versão e a do professor sendo a v2
app.get('/v1/Acme-Filmes/TodosFilmes', cors(), async function(request, response, next){
    let controlarTodosFilmes = require('./controller/funcoes.js')
    let filmes = controlarTodosFilmes.getTodosFilmes()
    response.json(filmes)
    response.status(200)
})

app.get('/v2/Acme-Filmes/Filmes/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idFilme = request.params.id
   let dadosFilme = await controlerFilmes.getBuscarFilme(idFilme)

   response.status(dadosFilme.status_code)
   response.json(dadosFilme)

})

app.get('/v2/Acme-Filmes/Filmes', cors(), async function(request, response, next){
    //chama a função para retornar os dados de filmes
    let dadosFilmes = await controlerFilmes.getListarFilmes()

    //validação para retornar os dados ou o erro quando não encontrar os dados no banco
    if(dadosFilmes){
        response.json(dadosFilmes)
        response.status(200)

    }else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(400)
    }
})

app.get('/v2/Acme-Filmes/filtro/filmes', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let filtro = request.query.nome
   let dadosFilme = await controlerFilmes.getNameFilme(filtro)

   response.status(dadosFilme.status_code)
   response.json(dadosFilme)

})

app.post('/v2/Acme-Filmes/filme', cors(), bodyParserJson, async function(request, response, next){

    let contentType = request.headers['content-type']

    let dadosBody = request.body;
    let resulDados = await controlerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resulDados.status_code)
    response.json(resulDados)
})

app.get('/v1/Acme-Filmes/ListarFilme', cors(), async function(request, response, next){
    let idFilme = request.query.id
    let controleFilmes = require('./controller/funcoes.js')
    let filmeId = controleFilmes.getFilmesId(idFilme)

    if(filmeId){
        response.json(filmeId)
        response.status(200)
    }else{
        response.status(404)
    }
})

app.put('/v2/Acme-Filmes/filme/:id', cors (), async function(request, response){
    let contentType = request.headers['content-type']
    let idFilme = request.params.id
    let dadosPut = request.body

    let resultFilmeUpdate = await controlerFilmes.setAtualizarFilme(idFilme, dadosPut, contentType)

    response.status(resultFilmeUpdate.status_code)
    response.json(resultFilmeUpdate)
})


app.delete('/v2/Acme-Filmes/filme/:id', cors(), async function(request, response){
    let idFilme = request.params.id
    let dadosFilme = await controlerFilmes.setExcluirFilme(idFilme)

    response.status(200)
    response.json(dadosFilme)
})

app.listen(8080, function(){
    console.log('AAAAAAAAAAA')
})