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
const controlerDiretores = require('./controller/controller_diretores.js')
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

//todos os diretores - ok
app.get('/v1/Acme-Filmes/Diretores', cors(), async function(request, response, next){
    let dadosDiretores = await controlerDiretores.getListarDiretores()

    if(dadosDiretores){
        response.json(dadosDiretores)
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




// ----------------------------------- ID ----------------------------------------------------

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

//diretores por id - ok
app.get('/v1/Acme-Filmes/Diretores/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idDiretores = request.params.id
   let dadosDiretores = await controlerDiretores.getBuscarDiretor(idDiretores)

   response.status(dadosDiretores.status_code)
   response.json(dadosDiretores)

})

//generos por id - ok
app.get('/v1/Acme-Filmes/Generos/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idGeneros = request.params.id
   let dadosGeneros = await controleGeneros.getBuscarGeneros(idGeneros)

   response.status(dadosGeneros.status_code)
   response.json(dadosGeneros)

})

//classificacao por id - ok
app.get('/v1/Acme-Filmes/Classificacao/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idClassificacao = request.params.id
   let dadosClassificacao = await controleGeneros.getBuscarGeneros(idClassificacao)

   response.status(dadosClassificacao.status_code)
   response.json(dadosClassificacao)

})

// --------------------------------------- NOME ------------------------------------------------

// filmes por nome - testar
app.get('/v2/Acme-Filmes/filtro/filme', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let nome = request.query.nome
   let dadosFilme = await controlerFilmes.getNameFilme(nome)

   response.status(dadosFilme.status_code)
   response.json(dadosFilme)

})

// --------------------------------------- NOVO ------------------------------------------------

//novo filme - ok
app.post('/v2/Acme-Filmes/filme', cors(), bodyParserJson, async function(request, response, next){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDadosNovoFilme = await controlerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

//novo genero - ok
app.post('/v2/Acme-Filmes/Genero', cors(), bodyParserJson, async function(request, response, next){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDadosNovoGenero = await controleGeneros.setInserirNovoGenero(dadosBody, contentType)

    response.status(resultDadosNovoGenero.status_code)
    response.json(resultDadosNovoGenero)
})

//nova class - testar
app.post('/v2/Acme-Filmes/Classificacao', cors(), bodyParserJson, async function(request, response, next){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDadosNovaClass = await controleClassificacao.setInserirNovaClassificacao(dadosBody, contentType)

    response.status(resultDadosNovaClass.status_code)
    response.json(resultDadosNovaClass)
})

//nova ator - testar
app.post('/v2/Acme-Filmes/Ator', cors(), bodyParserJson, async function(request, response, next){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDadosNovoAtor = await controlerAtores.setInserirNovoAtor(dadosBody, contentType)

    response.status(resultDadosNovoAtor.status_code)
    response.json(resultDadosNovoAtor)
})

//novos diretores - testar
app.post('/v2/Acme-Filmes/Diretores', cors(), bodyParserJson, async function(request, response, next){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDadosNovoDiretor = await controlerDiretores.setInserirNovoDiretor(dadosBody, contentType)

    response.status(resultDadosNovoDiretor.status_code)
    response.json(resultDadosNovoDiretor)
})


// -------------------------------------- ATUALIZAR -------------------------------------------------

//atualizar filme - ok
app.put('/v2/Acme-Filmes/Filme/Atualizar/:id', cors (), async function(request, response, next){
    let contentType = request.headers['content-type']
    let idFilme = request.params.id
    let dadosPut = request.body

    let resultFilmeUpdate = await controlerFilmes.setAtualizarFilme(idFilme, dadosPut, contentType)

    response.status(resultFilmeUpdate.status_code)
    response.json(resultFilmeUpdate)
})

//atualizar atores - ok
app.put('/v2/Acme-Filmes/Atores/Atualizar/:id', cors (), async function(request, response, next){
    let contentType = request.headers['content-type']
    let idAtores = request.params.id
    let dadosPut = request.body

    let resultAtoresUpdate = await controlerAtores.setAtualizarAtor(idAtores, dadosPut, contentType)

    response.status(resultAtoresUpdate.status_code)
    response.json(resultAtoresUpdate)
})

//atualizar diretores - ok
app.put('/v2/Acme-Filmes/Atores/Diretores/:id', cors (), async function(request, response, next){
    let contentType = request.headers['content-type']
    let idDiretores = request.params.id
    let dadosPut = request.body

    let resultDiretoresUpdate = await controlerDiretores.setAtualizarDiretor(idDiretores, dadosPut, contentType)

    response.status(resultDiretoresUpdate.status_code)
    response.json(resultDiretoresUpdate)
})

//atualizar genero - ok
app.put('/v2/Acme-Filmes/Genero/Atualizar/:id', cors (), async function(request, response, next){
    let contentType = request.headers['content-type']
    let idGenero = request.params.id
    let dadosPut = request.body

    let resultGenerosUpdate = await controleGeneros.setAtualizarGenero(idGenero, dadosPut, contentType)

    response.status(resultGenerosUpdate.status_code)
    response.json(resultGenerosUpdate)
})

//atualizar classificacao - ok
app.put('/v2/Acme-Filmes/Classificacao/Atualizar/:id', cors (), async function(request, response, next){
    let contentType = request.headers['content-type']
    let idClassificacao = request.params.id
    let dadosPut = request.body

    let resultClassificacaoUpdate = await controleClassificacao.setAtualizarClassificacao(idClassificacao, dadosPut, contentType)

    response.status(resultClassificacaoUpdate.status_code)
    response.json(resultClassificacaoUpdate)
})

// ------------------------------------ DELETE ---------------------------------------------------

//delete filme - ok
app.delete('/v2/Acme-Filmes/filme/:id', cors(), async function(request, response){
    let idFilme = request.params.id
    let dadosFilme = await controlerFilmes.setExcluirFilme(idFilme)

    response.status(200)
    response.json(dadosFilme)
})

//delete diretores - ok
app.delete('/v2/Acme-Filmes/diretores/:id', cors(), async function(request, response){
    let idDiretores = request.params.id
    let dadosDiretores = await controlerDiretores.setExcluirDiretor(idDiretores)

    response.status(200)
    response.json(dadosDiretores)
})

//delete ator - ok
app.delete('/v2/Acme-Filmes/ator/:id', cors(), async function(request, response){
    let idAtores = request.params.id
    let dadosAtores = await controlerAtores.setExcluirAtor(idAtores)

    response.status(200)
    response.json(dadosAtores)
})

//delete genero - ok
app.delete('/v2/Acme-Filmes/genero/:id', cors(), async function(request, response){
    let idGenero = request.params.id
    let dadosGenero = await controleGeneros.setExcluirGenero(idGenero)

    response.status(200)
    response.json(dadosGenero)
})

//delete classificacao - ok
app.delete('/v2/Acme-Filmes/classificacao/:id', cors(), async function(request, response){
    let idClassificacao = request.params.id
    let dadosClassificacao = await controleClassificacao.setExcluirClassificacao(idClassificacao)

    response.status(200)
    response.json(dadosClassificacao)
})

app.listen(8080, function(){
    console.log('A API está no ar e aguardando requisições')
})