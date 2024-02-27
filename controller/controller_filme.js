// Arquivo responsavel por realizar validacoes, consistencias e regra de negocio para os filmes

//import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
//importe do arquivo DAO para maipular dados dos filmes 
const filmesDAO = require ('../module/DAO/filme.js')
const { json } = require('body-parser')


//Função para inserir um novo filme
const setInserirNovoFilme = async function(){

}

//Função para atualizar um filme existente
const setAtualizarFilme = async function(){

}

//Função para deletar um filme existente
const setExcluirFilme = async function(){

}

//Função para listar todos os filmes existentes
const getListarFilmes = async function(){
    //Cria um objeto JSON
    let filmesJson = {}

    //Puxa os dados ela função do DAO para reornar o dados do banco 
    let dadosFilmes = await filmesDAO.selectAllFilmes()


    //Validação para criar um JSON do dados 
    if (dadosFilmes){

        if(dadosFilmes.length > 0){
            //Cria o JSON de retorno dos dados
            filmesJson.filmes = dadosFilmes
            filmesJson.quantidade = dadosFilmes.length
            filmesJson.status_code = 200
    
            return filmesJson

        }else{
            return message.ERROS_NOT_FOUND
        }

    }else {
        return message.ERROS_INTERNAL_SERVER_DB
    }

}

//Função para retornar um filme a partir do ID 
const getBuscarFilme = async function(id){
    //recebe o id pelo app
    let idFilme = id
    let filmeJson = {}
    
    //validaão para verificar o id do filme antes de encamnhar par o DAO
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROS_INVALID_ID
    }else {
        //encminha o id do filme para o retorno do banco
        let dadosFilmes = await filmesDAO.selectByIdFilme(idFilme)

        //Validação par\ verificar se o DAO retorou dados
        if(dadosFilmes){

            if(dadosFilmes.length > 0){
                filmeJson.filme = dadosFilmes
                filmeJson.status_code = 200
    
                return filmeJson

            }else{
                return message.ERROS_NOT_FOUND
            }
            //monsta o json com o retorno dos dados
        } else{
            return message.ERROS_INTERNAL_SERVER_DB
        }
    }
}

const getNameFilme = async function(filtro) {

    let nameFilme = filtro
    let filmeJson = {}

    if(nameFilme == '' || nameFilme == undefined){
        return message.ERROS_NAME_NOT_FOUND
    }else {
        let nomesFilmes = await filmesDAO.selectByNameFilme(nameFilme)

        if(nomesFilmes) {

            console.log(nomesFilmes)
            
            if(nomesFilmes.length > 0){
                filmeJson.filme = nomesFilmes
                filmeJson.status_code = 200

                return filmeJson
            }else{
                return message.ERROS_NOT_FOUND
            }
        }else{
            return message.ERROS_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getNameFilme
}