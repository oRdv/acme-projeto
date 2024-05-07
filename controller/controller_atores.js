// Arquivo responsavel por realizar validacoes, consistencias e regra de negocio para os filmes

//import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
//importe do arquivo DAO para maipular dados dos filmes 
const atoresDAO = require('../module/DAO/atores.js')
const nacionalidadeDAO = require('../module/DAO/nacionalidade.js')
const sexoDAO = require('../module/DAO/sexo.js')
const { json } = require('body-parser')

const setInserirNovoAtor = async function (dadosAtor, contentType) {

    try {
        let statusValidated = false
        let novoAtorJson = {}
        let arrayNacs = dadosBody.nacionalidade

        if (String(contentType).toLowerCase() == 'application/json') {
          

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
                    let novoAtorJson = await atoresDAO.insertNovoAtor(dadosAtor)
                    
                    if (novoAtorJson) {
                        for (let index = 0; index < arrayNacs.length; index++) {
                            const element = arrayNacs[index]
                            let nacionalidade = await nacionalidade.insertAtorNacionalidade(lastId[0].id, element)
                            console.log(nacionalidade)
                        }
                        let nasci = await nacionalidadeDAO.selectNacionalidadeByAtor(lastId[0].id)
                        dadosBody.nacionalidade = nasci

                        //cria o json e retorna informacoes com requisicao e os dado novos
                        novoAtorJson.status = message.SUCESSED_CREATED_ITEM.status
                        novoAtorJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                        novoAtorJson.message = message.SUCESSED_CREATED_ITEM.message
                        novoAtorJson.ator = dadosAtor
                        novoAtorJson.id = dadosAtor.id

                        return novoAtorJson//201
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
            let arrayNacs= dadosBody.nacionalidade
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
                if (dadosBody.nome == null || dadosBody.nome == undefined || dadosBody.nome == '' || dadosBody.nome.length > 100 ||
                dadosBody.data_nascimento == null || dadosBody.data_nascimento == undefined || dadosBody.data_nascimento == '' || dadosBody.data_nascimento.length != 10 ||
                // dadosBody.nacionalidade ==  null || dadosBody.nacionalidade == undefined || dadosBody.nacionalidade != Object ||
                dadosBody.id_sexo == '' || dadosBody.id_sexo == undefined || dadosBody.id_sexo == null || isNaN(dadosBody.id_sexo)) {
                    return message.ERROR_INVALID_REQUIRED_FIELDS
                } else {
                    let validateStatus =  false
                    if(dadosBody.biografia != null || dadosBody.biografia != undefined || dadosBody.biografia != ''){
                        if(dadosBody.biografia == null || dadosBody.biografia == undefined || dadosBody.biografia == '' || dadosBody.biografia.length > 655000 ){
                        return message.ERROR_INVALID_REQUIRED_FIELDS
                    }else{
                        validateStatus = true
                    }
                }else{
                    validateStatus = true
                }
                    if (validateStatus) {
                        let verifyId = await atorDAO.selectAtorById(idAtor)
                        if(verifyId){
                            dadosBody.id = idAtor
                            let att = await atorDAO.updateAtor(idAtor, dadosBody)
                            let getAtor = await atorDAO.selectAtorById(idAtor)
                            if (att) {
                                await nacionalidadeDAO.deleteNacionalidadeByAtor(idAtor)

                                for (let index = 0; index < arrayNacs.length; index++) {
                                    const nacUpdate = arrayNacs[index];

                                                
                                    await nacionalidadeDAO.insertAtorNacionalidade(idAtor, nacUpdate)
                                }
                                let dadosUpdate = getAtor[0]
                                let nasci = await nacionalidadeDAO.selectNacionalidadeByAtor(getAtor[0].id)
                                dadosUpdate.nacionalidade = nasci
                                let sexo = await sexoDAO.selectSexoById(getAtor[0].id_sexo)
                                delete dadosUpdate.id_sexo
                                dadosUpdate.sexo = sexo
                                atorJSON.ator = dadosUpdate
                                atorJSON.status = message.SUCCESS_CREATED_ITEM.status
                                atorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                                atorJSON.message = message.SUCCESS_CREATED_ITEM.message

                                return atorJSON
                                } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }

                        }else{
                            return message.ERROR_NOT_FOUND
                        }
                    }
                }
            }
        }else{
            return message.ERROR_UNSUPORTED_CONTENT_TYPE
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
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

                let atorDeletado = await atoresDAO.deleteAtor(idAtor)
                
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
   try {

     //Cria um objeto JSON
     let atoresJson = {}

     //Puxa os dados ela função do DAO para reornar o dados do banco 
     let dadosAtor = await atoresDAO.selectAllAtores()
     console.log(dadosAtor)
 
     //Validação para criar um JSON do dados 
     if (dadosAtor) {
        for (let index = 0; index < dadosAtor.length; index++) {
            const ator = dadosAtor[index ]
            let nasci = await nacionalidadeDAO.selectNacionalidadeByAtor(ator.id)
            ator.nacionalidade = nasci

            let sexo = await sexoDAO.selectSexoById(ator.id_sexo)
            delete ator.id_sexo
            ator.sexo = sexo

            }
             //Cria o JSON de retorno dos dados 
             atoresJson.atores = dadosAtor
             atoresJson.quantidade = dadosAtor.length
             atoresJson.status_code = 200
 
             return atoresJson
 
         } else { 
             return message.ERROS_INTERNAL_SERVER_DB
         }
    
   } catch (error) {
    return message.ERROS_INTERNAL_SERVER
   }

}

const getBuscarAtor = async function (id) {
 try {
       //recebe o id pelo app
       let idAtor = id
       let atoresJson = {}
   
       if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
           return message.ERROS_INVALID_ID
           
       } else {
           let dadosAtor = await atoresDAO.selectByIdAtores (idAtor)
   
           if (dadosAtor) {
               if (dadosAtor.length > 0) {

                let nasci = await nacionalidadeDAO.selectNacionalidadeByAtor(idAtor)
                dadosAtor[0].nacionalidade = nasci
                let sexo = await sexoDAO.selectSexoById(dadosAtor[0].id_sexo)
                console.log(dadosAtor.id_sexo);
                delete dadosAtor[0].id_sexo
                dadosAtor[0].sexo = sexo
                console.log(dadosAtor)

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

 } catch (error) {
    return message.ERROS_INTERNAL_SERVER
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