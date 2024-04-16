// Arquivo responsavel por realizar validacoes, consistencias e regra de negocio para os filmes

//import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
//importe do arquivo DAO para maipular dados dos filmes 
const atoresDAO = require('../module/DAO/atores.js')
const { json } = require('body-parser')

const setInserirNovoAtor = async function (dadosAtor, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let novoAtorJson = {}

            if (dadosAtor.nome == ''                    || dadosAtor.nome == undefined                    || dadosAtor.nome == null                    || dadosAtor.nome.length > 100             ||
                dadosAtor.data_nascimento == ''         || dadosAtor.data_nascimento == undefined         || dadosAtor.data_nascimento == null         || dadosAtor.data_nascimento.length > 8   ||
                dadosAtor.foto == ''                    || dadosAtor.foto == undefined                    || dadosAtor.foto == null                    || dadosAtor.foto.length > 180             
                ){

                return message.ERROS_REQUIRED_FIELDS

            } else {

                //Validção de um conteudo valido
                if (dadosAtor.data_falecimento != '' &&
                    dadosAtor.data_falecimento != null &&
                    dadosAtor.data_falecimento != undefined) {
    
                    //verifica a quantidade de caracteres
                    if (dadosAtor.data_falecimento.length != 8) {
                        
                        return message.ERROS_REQUIRED_FIELDS
                    } else {
                        statusValidated = true //validacao para liberar a inserção dos dados do DAO
                    }
                } else {
                    statusValidated = true // validação ára liberar a inseção dos dados do DAO
                }

                //se  variavel for verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated = true) {
                    //ecaminha os dados para o dao
                    let novoAtorJson = await atoresDAO.insertnovoAtorJson(dadosAtor)
                    
                    if (novoAtorJson) {
                        //cria o json e retorna informacoes com requisicao e os dado novos
                        novoAtorJsonJson.status = message.SUCESSED_CREATED_ITEM.status
                        novoAtorJsonJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                        novoAtorJsonJson.message = message.SUCESSED_CREATED_ITEM.message
                        novoAtorJsonJson.ator = dadosAtor
                        novoAtorJsonJson.id = dadosAtor.id

                        return novoAtorJsonJson//201
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

const setAtualizarAtor = async function (id, dadosAtor, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let novoAtorJson = {}

            if(id == '' || id == undefined || isNaN(id) ||
            dadosAtor.nome == ''                     || dadosAtor.nome == undefined            || dadosAtor.nome == null            || dadosAtor.nome.length > 80               ||
            dadosAtor.sinopse == ''                  || dadosAtor.sinopse == undefined         || dadosAtor.sinopse == null         || dadosAtor.sinopse.length > 65000         ||
            dadosAtor.duracao == ''                  || dadosAtor.duracao == undefined         || dadosAtor.duracao == null         || dadosAtor.duracao.length > 8             ||
            dadosAtor.data_lancamento == ''          || dadosAtor.data_lancamento == undefined || dadosAtor.data_lancamento == null || dadosAtor.data_lancamento.length != 10   ||
            dadosAtor.foto_capa == ''                || dadosAtor.foto_capa == undefined       || dadosAtor.foto_capa == null       || dadosAtor.foto_capa.length > 200         ||
            dadosAtor.valor_unitario.length > 6
            ){ 
                return message.ERROS_REQUIRED_FIELDS //400

            }else{
                if(dadosAtor.data_falecimento != null && dadosAtor.data_falecimento != '' && dadosAtor.data_falecimento != undefined){
    
    
                    if(dadosAtor.data_falecimento.length != 10){
                        return message.ERROS_REQUIRED_FIELDS //400
                    }else{
                        statusValidated = true
                    }
                }else{
                    statusValidated = true
                }
    
                if(statusValidated){
                    dadosAtor.id = id
    
                    let novoFilme = await atoresDAO.updateFilme(dadosAtor)
    
                    if(novoFilme){
                        novoAtorJson.filme = dadosAtor
                        novoAtorJson.status = message.SUCCESS_UPDATED_ITEM.status
                        novoAtorJson.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        novoAtorJson.message = message.SUCCESS_UPDATED_ITEM.message
    
                        return novoAtorJson //201
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

const setExcluirAtor = async function (id) {

    try {
        let idAtor = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idAtor == '' || idAtor == undefined || isNaN(idAtor) || idAtor == null) {
            return message.ERROS_INVALID_ID //400
        } else {
            
            let atorId = await atoresDAO.selectByIdAtores(idAtor)

            if(atorId.length > 0) {

                let atorDeletado = await atoresDAO.setExcluirAtor(idAtor)
                
                if(atorDeletado){
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

const getListarAtores = async function () {
    //Cria um objeto JSON
    let atoresJson = {}

    //Puxa os dados ela função do DAO para reornar o dados do banco 
    let dadosAtor = await atoresDAO.selectAllAtores()
    console.log(dadosAtor)

    //Validação para criar um JSON do dados 
    if (dadosAtor) {

        if (dadosAtor.length > 0) {
            //Cria o JSON de retorno dos dados
            atoresJson.atores = dadosAtor
            atoresJson.quantidade = dadosAtor.length
            atoresJson.status_code = 200

            return atoresJson

        } else {
            return message.ERROS_NOT_FOUND
        }

    } else {
        return message.ERROS_INTERNAL_SERVER_DB
    }

}

const getBuscarAtor = async function (id) {
    //recebe o id pelo app
    let idAtor = id
    let atoresJson = {}

    if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROS_INVALID_ID
    } else {
        let dadosAtor = await atoresDAO.selectByIdAtores (idAtor)

        if (dadosAtor) {

            if (dadosAtor.length > 0) {
                atoresJson.ator = dadosAtor
                atoresJson.status_code = 200

                return atoresJson

            } else {
                return message.ERROS_NOT_FOUND
            }
            //monsta o json com o retorno dos dados
        } else {
            return message.ERROS_INTERNAL_SERVER_DB
        }
    }
}


const getNameAtor = async function (filtro) {

    let getNameAtor = filtro
    let atoresJson = {}

    if (getNameAtor == '' || getNameAtor == undefined) {
        return message.ERROS_NAME_NOT_FOUND
    } else {
        let novosAtores = await atoresDAO.selectByNameAtores(getNameAtor)

        if (novosAtores) {

            console.log(novosAtores)

            if (novosAtores.length > 0) {
                atoresJson.atores = novosAtores
                atoresJson.status_code = 200

                return atoresJson
            } else {
                return message.ERROS_NOT_FOUND
            }
        } else {
            return message.ERROS_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovoAtor,
    setAtualizarAtor,
    setExcluirAtor,
    getListarAtores,
    getBuscarAtor,
    getNameAtor
}