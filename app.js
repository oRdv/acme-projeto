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
const controlerAtores = require('./controller/controller_atores.js')
const controleGeneros = require('./controller/controller_genero.js')
const controleClassificacao = require('./controller/controller_classificacao.js')

//todas as classificacoes - ok
app.get('/v1/Acme-Filmes/Classificacao', cors(), async function(request, response, next){
    let dadosClassificacao = await controleClassificacao.getListarClassificacao()

    if(dadosClassificacao){
        response.json(dadosClassificacao)
        response.status(200)

    }else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(400)
    }
})


//todos os atores - ok
app.get('/v1/Acme-Filmes/Atores', cors(), async function(request, response, next){
    let dadosAtores = await controlerAtores.getListarAtores()

    if(dadosAtores){
        response.json(dadosAtores)
        response.status(200)

    }else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(400)
    }
})

//todos filmes - ok
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

//todos generos - ok
app.get('/v2/Acme-Filmes/Generos', cors(), async function(request, response, next){
    //chama a função para retornar os dados de filmes
    let dadosGeneros = await controleGeneros.getListarGeneros()

    //validação para retornar os dados ou o erro quando não encontrar os dados no banco
    if(dadosGeneros){
        response.json(dadosGeneros)
        response.status(200)

    }else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(400)
    }
})

//filme por id - ok
app.get('/v2/Acme-Filmes/Filmes/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idFilme = request.params.id
   let dadosFilme = await controlerFilmes.getBuscarFilme(idFilme)

   response.status(dadosFilme.status_code)
   response.json(dadosFilme)

})

//atores por id - ok
app.get('/v1/Acme-Filmes/Atores/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idAtores = request.params.id
   let dadosAtores = await controlerAtores.getBuscarAtor(idAtores)

   response.status(dadosAtores.status_code)
   response.json(dadosAtores)

})

//generos por id - ok
app.get('/v1/Acme-Filmes/Generos/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idGeneros = request.params.id
   let dadosGeneros = await controleGeneros.getBuscarGeneros(idGeneros)

   response.status(dadosGeneros.status_code)
   response.json(dadosGeneros)

})

app.get('/v2/Acme-Filmes/filtro/filmes', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let filtro = request.query.nome
   let dadosFilme = await controlerFilmes.getNameFilme(filtro)

   response.status(dadosFilme.status_code)
   response.json(dadosFilme)

})

//novo filme - ok
app.post('/v2/Acme-Filmes/filme', cors(), bodyParserJson, async function(request, response, next){

    let contentType = request.header('content-type')

    let dadosBody = request.body

    let resultDadosNovoFilme = await controlerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

//novo genero - ok
app.post('/v2/Acme-Filmes/Genero', cors(), bodyParserJson, async function(request, response, next){

    let contentType = request.header('content-type')

    let dadosBody = request.body

    let resultDadosNovoGenero = await controlerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDadosNovoGenero.status_code)
    response.json(resultDadosNovoGenero)
})

app.put('/v2/Acme-Filmes/filme/:id', cors (), async function(request, response){
    let contentType = request.headers['content-type']
    let idFilme = request.params.id
    let dadosPut = request.body

    let resultFilmeUpdate = await controlerFilmes.setAtualizarFilme(idFilme, dadosPut, contentType)

    response.status(resultFilmeUpdate.status_code)
    response.json(resultFilmeUpdate)
})

//delete filme - ok
app.delete('/v2/Acme-Filmes/filme/:id', cors(), async function(request, response){
    let idFilme = request.params.id
    let dadosFilme = await controlerFilmes.setExcluirFilme(idFilme)

    response.status(200)
    response.json(dadosFilme)
})

//delete genero - ok
app.delete('/v2/Acme-Filmes/genero/:id', cors(), async function(request, response){
    let idGenero = request.params.id
    let dadosGenero = await controleGeneros.setExcluirGenero(idGenero)

    response.status(200)
    response.json(dadosGenero)
})

app.listen(8080, function(){
    console.log('A API está no ar e aguardando requisições')
})