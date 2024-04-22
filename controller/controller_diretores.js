// Arquivo responsavel por realizar validacoes, consistencias e regra de negocio para os filmes

//import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
//importe do arquivo DAO para maipular dados dos filmes 
const diretoresDAO = require('../module/DAO/diretores.js')
const { json } = require('body-parser')

const setInserirNovoDiretor = async function (dadosDiretor, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let novoDiretorJSON = {}

            if (dadosDiretor.nome == ''                    || dadosDiretor.nome == undefined                    || dadosDiretor.nome == null                    || dadosDiretor.nome.length > 100             ||
                dadosDiretor.data_nascimento == ''         || dadosDiretor.data_nascimento == undefined         || dadosDiretor.data_nascimento == null         || dadosDiretor.data_nascimento.length > 8   ||
                dadosDiretor.foto == ''                    || dadosDiretor.foto == undefined                    || dadosDiretor.foto == null                    || dadosDiretor.foto.length > 180             
                ){

                return message.ERROS_REQUIRED_FIELDS

            } else {

                //Validção de um conteudo valido
                if (dadosDiretor.data_falecimento != '' &&
                    dadosDiretor.data_falecimento != null &&
                    dadosDiretor.data_falecimento != undefined) {
    
                    //verifica a quantidade de caracteres
                    if (dadosDiretor.data_falecimento.length != 8) {
                        
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
                    let novoDiretorJSON = await diretoresDAO.insertNovoDiretor(dadosDiretor)
    
    
                    
                    if (novoDiretorJSON) {
        
                        //cria o json e retorna informacoes com requisicao e os dado novos
                        novoDiretor.status = message.SUCESSED_CREATED_ITEM.status
        
                        novoDiretor.status_code = message.SUCESSED_CREATED_ITEM.status_code
        
                        novoDiretor.message = message.SUCESSED_CREATED_ITEM.message
        
                        novoDiretor.diretor = dadosDiretor
        
                        novoDiretor.id = dadosDiretor.id
        

                        return novoDiretor//201
        
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

const setAtualizarDiretor = async function (id, dadosDiretor, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let novoDiretorJSON = {}

            if(id == '' || id == undefined || isNaN(id) ||
            dadosDiretor.nome == ''                     || dadosDiretor.nome == undefined            || dadosDiretor.nome == null            || dadosDiretor.nome.length > 80               ||
            dadosDiretor.sinopse == ''                  || dadosDiretor.sinopse == undefined         || dadosDiretor.sinopse == null         || dadosDiretor.sinopse.length > 65000         ||
            dadosDiretor.duracao == ''                  || dadosDiretor.duracao == undefined         || dadosDiretor.duracao == null         || dadosDiretor.duracao.length > 8             ||
            dadosDiretor.data_lancamento == ''          || dadosDiretor.data_lancamento == undefined || dadosDiretor.data_lancamento == null || dadosDiretor.data_lancamento.length != 10   ||
            dadosDiretor.foto_capa == ''                || dadosDiretor.foto_capa == undefined       || dadosDiretor.foto_capa == null       || dadosDiretor.foto_capa.length > 200         ||
            dadosDiretor.valor_unitario.length > 6
            ){ 
                return message.ERROS_REQUIRED_FIELDS //400

            }else{
                if(dadosDiretor.data_falecimento != null && dadosDiretor.data_falecimento != '' && dadosDiretor.data_falecimento != undefined){
    
    
                    if(dadosDiretor.data_falecimento.length != 10){
                        return message.ERROS_REQUIRED_FIELDS //400
                    }else{
                        statusValidated = true
                    }
                }else{
                    statusValidated = true
                }
    
                if(statusValidated){
                    dadosDiretor.id = id
    
                    let novoDiretor = await diretoresDAO.updateDiretor(dadosDiretor)
    
                    if(novoDiretor){
                        novoDiretorJSON.diretores = dadosDiretor
        
                        novoDiretorJSON.status = message.SUCCESS_UPDATED_ITEM.status
        
                        novoDiretorJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
        
                        novoDiretorJSON.message = message.SUCCESS_UPDATED_ITEM.message
        
    
                        return novoDiretorJSON //201
        
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

const setExcluirDiretor = async function (id) {

    try {
        let idDiretor = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor) || idDiretor == null) {
            return message.ERROS_INVALID_ID //400
        } else {
            
            let diretorId = await diretoresDAO.setExcluirDiretor(idDiretor)

            if(diretorId.length > 0) {

                let diretorDeletado = await diretoresDAO.deleteDiretores(idDiretor)
                
                if(diretorDeletado){
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

const getListarDiretores = async function () {
    //Cria um objeto JSON
    let diretoresJSON = {}

    //Puxa os dados ela função do DAO para reornar o dados do banco 
    let dadosDiretor = await diretoresDAO.selectAllDiretores()
    console.log(dadosDiretor)

    //Validação para criar um JSON do dados 
    if (dadosDiretor) {

        if (dadosDiretor.length > 0) {
            //Cria o JSON de retorno dos dados
            diretoresJSON.diretores = dadosDiretor
            diretoresJSON.quantidade = dadosDiretor.length
            diretoresJSON.status_code = 200

            return diretoresJSON

        } else {
            return message.ERROS_NOT_FOUND
        }

    } else {
        return message.ERROS_INTERNAL_SERVER_DB
    }

}

const getBuscarDiretor = async function (id) {
    //recebe o id pelo app
    let idDiretor = id
    let diretoresJSON = {}

    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROS_INVALID_ID
    } else {
        let dadosDiretor = await diretoresDAO.selectByIdDiretores (idDiretor)

        if (dadosDiretor) {

            if (dadosDiretor.length > 0) {
                diretoresJSON.diretor = dadosDiretor
                diretoresJSON.status_code = 200

                return diretoresJSON

            } else {
                return message.ERROS_NOT_FOUND
            }
            //monsta o json com o retorno dos dados
        } else {
            return message.ERROS_INTERNAL_SERVER_DB
        }
    }
}


const getNameDiretor = async function (filtro) {

    let getNameDiretor = filtro
    let diretoresJSON = {}

    if (getNameDiretor == '' || getNameDiretor == undefined) {
        return message.ERROS_NAME_NOT_FOUND
    } else {
        let novosDiretores = await diretoresDAO.selectByNameDiretores(getNameDiretor)

        if (novosDiretores) {

            console.log(novosDiretores)

            if (novosDiretores.length > 0) {
                diretoresJSON.diretores = novosDiretores
                diretoresJSON.status_code = 200

                return diretoresJSON
            } else {
                return message.ERROS_NOT_FOUND
            }
        } else {
            return message.ERROS_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovoDiretor,
    setAtualizarDiretor,
    setExcluirDiretor,
    getListarDiretores,
    getBuscarDiretor,
    getNameDiretor
}