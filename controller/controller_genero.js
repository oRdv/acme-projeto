const message = require('../modulo/config.js')
//importe do arquivo DAO para maipular dados dos filmes 
const generosDAO = require('../module/DAO/genero.js')
const { json } = require('body-parser')


const setInserirNovoGenero = async (dadosGenero, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novoGeneroJSON = {}
            if (dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome == null || dadosGenero.nome.length > 25) {
                return message.ERROS_REQUIRED_FIELDS
            } else {
                let novoGenero = await generosDAO.insertNovoGenero(dadosGenero)

                let id = await generosDAO.selectByIdGenero()

                if (novoGenero) {
                    dadosGenero.id = id[0].id
                    novoGeneroJSON.genero = dadosGenero
                    novoGeneroJSON.status = message.SUCESSED_CREATED_ITEM.status
                    novoGeneroJSON.status_code = message.SUCESSED_CREATED_ITEM.status_code
                    novoGeneroJSON.message = message.SUCESSED_CREATED_ITEM.message

                    return novoGeneroJSON
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

const setAtualizarGenero = async (dadosGenero, id ,contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let generoatualizadoJSON = {}
            if (id == '' || id == undefined || isNaN(id) ||
                dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome == null || dadosGenero.nome.length > 25 ) {
                return message.ERROS_REQUIRED_FIELDS
            } else {
                let generoId = await generosDAO.selectByIdGenero(id)

                if (generoId.length > 0) {
                    let generoUtualizado = await generosDAO.updateGenero(dadosGenero, id)
                    if (generoUtualizado) {
                        generoatualizadoJSON.genero = dadosGenero
                        generoatualizadoJSON.status = message.SUCESSED_CREATED_ITEM.status
                        generoatualizadoJSON.status_code = message.SUCESSED_CREATED_ITEM.status_code
                        generoatualizadoJSON.message = message.SUCESSED_CREATED_ITEM.message

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

const setExcluirGenero = async (id) => {
    try {
        let idGenero = id
        
        if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
            return message.ERROS_INVALID_ID
        } else {
            let generoId = await generosDAO.selectByIdGenero(idGenero)

            if (generoId.length > 0) {
                let generoExcluido = await generosDAO.deleteGenero(idGenero)
                if (generoExcluido) {
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

const getListarGeneros = async () => {
    let generosJSON = {}

    let dadosGeneros = await generosDAO.selectAllGeneros()

    if (dadosGeneros) {
        if (dadosGeneros.length > 0) {
            generosJSON.generos = dadosGeneros
            generosJSON.quantidade = dadosGeneros.length
            generosJSON.status_code = 200;

            return generosJSON
        } else {
            return message.ERROS_NOT_FOUND
        }
    } else {
        return message.ERROS_INTERNAL_SERVER_DB
    }
}

const getBuscarGeneros = async function (id) {
    //recebe o id pelo app
    let idGenero = id
    let generosJson = {}

    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROS_INVALID_ID
    } else {
        let dadosGenero = await generosDAO.selectByIdGenero(idGenero)

        if (dadosGenero) {

            if (dadosGenero.length > 0) {
                generosJson.genero = dadosGenero
                generosJson.status_code = 200

                return generosJson

            } else {
                return message.ERROS_NOT_FOUND
            }
            //monsta o json com o retorno dos dados
        } else {
            return message.ERROS_INTERNAL_SERVER_DB
        }
    }
}

const getNameGenero = async function (filtro) {

    let getNameGenero = filtro
    let generoJSON = {}

    if (getNameGenero == '' || getNameGenero == undefined) {
        return message.ERROS_NAME_NOT_FOUND
    } else {
        let novosGeneros = await generosDAO.selectByNameGenero(getNameGenero)

        if (novosGeneros) {

            console.log(novosGeneros)

            if (novosGeneros.length > 0) {
                generoJSON.atores = novosGeneros
                generoJSON.status_code = 200

                return generoJSON
            } else {
                return message.ERROS_NOT_FOUND
            }
        } else {
            return message.ERROS_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getBuscarGeneros,
    getNameGenero,
    getListarGeneros
}


