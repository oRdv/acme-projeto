// Arquivo responsavel por realizar validacoes, consistencias e regra de negocio para os filmes

//import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
//importe do arquivo DAO para maipular dados dos filmes 
const filmesDAO = require('../module/DAO/filme.js')
const { json } = require('body-parser')


//Função para inserir um novo filme
const setInserirNovoFilme = async function (dadosFilme, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let novoFilmeJson = {}

            if (dadosFilme.nome == ''            || dadosFilme.nome == undefined            || dadosFilme.nome == null            || dadosFilme.nome.length > 80             ||
                dadosFilme.sinopse == ''         || dadosFilme.sinopse == undefined         || dadosFilme.sinopse == null         || dadosFilme.sinopse.length > 65000       ||
                dadosFilme.duracao == ''         || dadosFilme.duracao == undefined         || dadosFilme.duracao == null         || dadosFilme.duracao.length > 8           ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == ''       || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa == null       || dadosFilme.foto_capa.length > 300       ||
                dadosFilme.valor_unitario == ''  || dadosFilme.valor_unitario == undefined  || dadosFilme.valor_unitario == null  || dadosFilme.valor_unitario.length > 50   || 
                isNaN(dadosFilme.valor_unitario)
                ){

                return message.ERROS_REQUIRED_FIELDS

            } else {

                //Validção de um conteudo valido
                if (dadosFilme.data_relancamento != '' &&
                    dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != undefined) {
    
                    //verifica a quantidade de caracteres
                    if (dadosFilme.data_relancamento.length != 10) {
                        
                        return message.ERROS_REQUIRED_FIELDS
                    } else {
                        statusValidated = true //validacao para liberar a inserção dos dados do DAO
                    }
                } else {
                    statusValidated = true // validação ára liberar a inseção dos dados do DAO
                }

                //se  variavel for verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated === true) {
                    //ecaminha os dados para o dao
                    let novoFilme = await filmesDAO.insertNovoFilme(dadosFilme)
                    
                    if (novoFilme) {
                        //cria o json e retorna informacoes com requisicao e os dado novos
                        novoFilmeJson.status = message.SUCESSED_CREATED_ITEM.status
                        novoFilmeJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                        novoFilmeJson.message = message.SUCESSED_CREATED_ITEM.message
                        novoFilmeJson.filme = dadosFilme
                        novoFilmeJson.id = dadosFilme.id

                        return novoFilmeJson//201
                    } else {
                     return message.ERROS_INTERNAL_SERVER_DB //500
                    }

                }

            }

        } else {
            return message.ERROS_CONTENT_TYPE //415
        }
    } catch (erro) {
        return message.ERROS_INTERNAL_SERVER
    }

}


//Função para atualizar um filme existente
const setAtualizarFilme = async function (id, dadosFilme, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let novoFilmeJson = {}

            if(id == '' || id == undefined || isNaN(id) ||
            dadosFilme.nome == ''                     || dadosFilme.nome == undefined            || dadosFilme.nome == null            || dadosFilme.nome.length > 80               ||
            dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined         || dadosFilme.sinopse == null         || dadosFilme.sinopse.length > 65000         ||
            dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined         || dadosFilme.duracao == null         || dadosFilme.duracao.length > 8             ||
            dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10   ||
            dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa == null       || dadosFilme.foto_capa.length > 200         ||
            dadosFilme.valor_unitario.length > 6
            ){ 
                return message.ERROS_REQUIRED_FIELDS //400

            }else{
                if(dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != undefined){
    
    
                    if(dadosFilme.data_relancamento.length != 10){
                        return message.ERROS_REQUIRED_FIELDS //400
                    }else{
                        statusValidated = true
                    }
                }else{
                    statusValidated = true
                }
    
                if(statusValidated){
                    dadosFilme.id = id
    
                    let novoFilme = await filmesDAO.updateFilme(dadosFilme)
    
                    if(novoFilme){
                        novoFilmeJson.filme = dadosFilme
                        novoFilmeJson.status = message.SUCCESS_UPDATED_ITEM.status
                        novoFilmeJson.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        novoFilmeJson.message = message.SUCCESS_UPDATED_ITEM.message
    
                        return novoFilmeJson //201
                    }else{
                        return message.ERROS_INTERNAL_SERVER_DB //500
                    }
                }
            }
        }
    } catch (error) {
        return message.ERROS_INTERNAL_SERVER
    }

}

//Função para deletar um filme existente
const setExcluirFilme = async function (id) {

    try {
        let idFilme = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idFilme == '' || idFilme == undefined || isNaN(idFilme) || idFilme == null) {
            return message.ERROS_INVALID_ID //400
        } else {
            
            let filmeId = await filmesDAO.selectByIdFilme(idFilme)

            if(filmeId.length > 0) {

                let filmeDeletado = await filmesDAO.deleteFilme(idFilme)
                
                if(filmeDeletado){
                    return message.SUCCESS_DELETED_ITEM //200
                }else{
                    return message.ERROS_INTERNAL_SERVER_DB //500
                }
            }else{
                return message.ERROS_NOT_FOUND //404
            }
        }
       } catch (error) {
        return message.ERROS_INTERNAL_SERVER //500
       }
}

//Função para listar todos os filmes existentes
const getListarFilmes = async function () {
    //Cria um objeto JSON
    let filmesJson = {}

    //Puxa os dados ela função do DAO para reornar o dados do banco 
    let dadosFilmes = await filmesDAO.selectAllFilmes()
    console.log(dadosFilmes)

    //Validação para criar um JSON do dados 
    if (dadosFilmes) {

        if (dadosFilmes.length > 0) {
            //Cria o JSON de retorno dos dados
            filmesJson.filmes = dadosFilmes
            filmesJson.quantidade = dadosFilmes.length
            filmesJson.status_code = 200

            return filmesJson

        } else {
            return message.ERROS_NOT_FOUND
        }

    } else {
        return message.ERROS_INTERNAL_SERVER_DB
    }

}

//Função para retornar um filme a partir do ID 
const getBuscarFilme = async function (id) {
    //recebe o id pelo app
    let idFilme = id
    let filmeJson = {}

    //validaão para verificar o id do filme antes de encamnhar par o DAO
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROS_INVALID_ID
    } else {
        //encminha o id do filme para o retorno do banco
        let dadosFilmes = await filmesDAO.selectByIdFilme(idFilme)

        //Validação par\ verificar se o DAO retorou dados
        if (dadosFilmes) {

            if (dadosFilmes.length > 0) {
                filmeJson.filme = dadosFilmes
                filmeJson.status_code = 200

                return filmeJson

            } else {
                return message.ERROS_NOT_FOUND
            }
            //monsta o json com o retorno dos dados
        } else {
            return message.ERROS_INTERNAL_SERVER_DB
        }
    }
}

const getNameFilme = async function (filtro) {

    let nameFilme = filtro
    let filmeJson = {}

    if (nameFilme == '' || nameFilme == undefined) {
        return message.ERROS_NAME_NOT_FOUND
    } else {
        let nomesFilmes = await filmesDAO.selectByNameFilme(nameFilme)

        if (nomesFilmes) {

            console.log(nomesFilmes)

            if (nomesFilmes.length > 0) {
                filmeJson.filme = nomesFilmes
                filmeJson.status_code = 200

                return filmeJson
            } else {
                return message.ERROS_NOT_FOUND
            }
        } else {
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