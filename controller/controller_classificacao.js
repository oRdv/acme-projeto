const message = require('../modulo/config.js')
//importe do arquivo DAO para maipular dados dos filmes 
const classificacaoDAO = require('../module/DAO/classificacao.js')
const { json } = require('body-parser')


const setInserirNovaClassificacao = async (dadosClassificacao, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novaClassificacaoJSON = {}
            if (dadosClassificacao.nome == '' || dadosClassificacao.nome == undefined || dadosClassificacao.nome == null || dadosClassificacao.nome.length > 25) {
                return message.ERROS_REQUIRED_FIELDS
            } else {
                let novaClassificacao = await classificacaoDAO.insertNovoGenero(dadosClassificacao)

                let id = await classificacaoDAO.selectByIdClassificacao()

                if (novaClassificacao) {
                    dadosClassificacao.id = id[0].id
                    novaClassificacaoJSON.genero = dadosClassificacao
                    novaClassificacaoJSON.status = message.SUCESSED_CREATED_ITEM.status
                    novaClassificacaoJSON.status_code = message.SUCESSED_CREATED_ITEM.status_code
                    novaClassificacaoJSON.message = message.SUCESSED_CREATED_ITEM.message

                    return novaClassificacaoJSON
                } else {
                    return message.ERROS_INTERNAL_SERVER_DB //500
                }

            }
        } else {
            return message.ERROS_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROS_INTERNAL_SERVER //500 - erro na controller
    }
}

const setAtualizarClassificacao = async (dadosClassificacao, id ,contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let classificacaoJSON = {}
            if (id == '' || id == undefined || isNaN(id) ||
                dadosClassificacao.nome == '' || dadosClassificacao.nome == undefined || dadosClassificacao.nome == null || dadosClassificacao.nome.length > 25 ) {
                return message.ERROS_REQUIRED_FIELDS
            } else {
                let classificacaoId = await classificacaoDAO.selectByIdClassificacao(id)

                if (classificacaoId.length > 0) {
                    let classificacaoAtualizado = await classificacaoDAO.updateGenero(dadosClassificacao, id)
                    if (classificacaoAtualizado) {
                        classificacaoJSON.genero = dadosClassificacao
                        classificacaoJSON.status = message.SUCESSED_CREATED_ITEM.status
                        classificacaoJSON.status_code = message.SUCESSED_CREATED_ITEM.status_code
                        classificacaoJSON.message = message.SUCESSED_CREATED_ITEM.message

                        return message.SUCESSED_CREATED_ITEM
                    } else {
                        return message.ERROS_INTERNAL_SERVER_DB //500
                    }

                } else {
                    return message.ERROS_NOT_FOUND
                }
            }
        } else {
            return message.ERROS_INTERNAL_SERVER
        }
    } catch (error) {
        return message.ERROS_INTERNAL_SERVER_DB
    }
}

const setExcluirClassificacao = async (id) => {
    try {
        let idClassificacao = id
        
        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
            return message.ERROS_INVALID_ID
        } else {
            let classificacaoId = await classificacaoDAO.selectByIdClassificacao(idClassificacao)

            if (classificacaoId.length > 0) {
                let classificacaoExcluido = await classificacaoDAO.deleteClassificacao(idClassificacao)
                if (classificacaoExcluido) {
                    return message.SUCCESS_DELETED_ITEM
                } else {
                    return message.ERROS_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROS_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROS_INTERNAL_SERVER
    }
}

const getListarClassificacao = async () => {
    let classificacaoJSON = {}

    let dadosClassificacao = await classificacaoDAO.selectAllClassificacoes()

    if (dadosClassificacao) {
        if (dadosClassificacao.length > 0) {
            classificacaoJSON.classificacao = dadosClassificacao
            classificacaoJSON.quantidade = dadosClassificacao.length
            classificacaoJSON.status_code = 200;

            return classificacaoJSON
        } else {
            return message.ERROS_NOT_FOUND
        }
    } else {
        return message.ERROS_INTERNAL_SERVER_DB
    }
}

const getBuscarClassificacao = async function (id) {
    //recebe o id pelo app
    let idClassificacao = id
    let classificacaoJSON = {}

    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
        return message.ERROS_INVALID_ID
    } else {
        let dadosClassificacao = await classificacaoDAO.selectByIdClassificacao(idClassificacao)

        if (dadosClassificacao) {

            if (dadosClassificacao.length > 0) {
                classificacaoJSON.classificacao = dadosClassificacao
                classificacaoJSON.status_code = 200

                return classificacaoJSON

            } else {
                return message.ERROS_NOT_FOUND
            }
            //monsta o json com o retorno dos dados
        } else {
            return message.ERROS_INTERNAL_SERVER_DB
        }
    }
}

const getNameClassificacao = async function (filtro) {

    let getNameClassificacao = filtro
    let classificacaoJSON = {}

    if (getNameClassificacao == '' || getNameClassificacao == undefined) {
        return message.ERROS_NAME_NOT_FOUND
    } else {
        let novasClassificacoes = await classificacaoDAO.selectByNameClassificacao(getNameClassificacao)

        if (novasClassificacoes) {

            console.log(novasClassificacoes)

            if (novasClassificacoes.length > 0) {
                classificacaoJSON.classificacao = novasClassificacoes
                classificacaoJSON.status_code = 200

                return classificacaoJSON
            } else {
                return message.ERROS_NOT_FOUND
            }
        } else {
            return message.ERROS_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getNameClassificacao,
    getListarClassificacao
}


