//Arquivo responsável pelas váriaveis globais do projeto, onde haverão mensagens, status code e outros conteudos para o projeto.

//varivel(muda) letra minuscula e constante(não muda) letra maiuscula
 // mensagens de erro do projeto

 const ERROS_INVALID_ID = {status: false, status_code: 400, message: "O ID ENCAMINHADO NA REQUISIÇÃO NÃO É VALIDO."}
 const ERROS_NOT_FOUND = {status: false, status_code: 404, message: "NENHUM ITEM ENCONTRADO NA REQUISIÇÃO."}
 const ERROS_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: "OCORRERAM NO PROCESAMENTO DO BANCO DE DADOS - CONTATE O ADMINISTRADOR DA API."}
 const ERROS_NAME_NOT_FOUND = {status: false, status_code: 400, message: "NENHUM NOME FOI ENCONTRADO NA REQUISIÇÃO."}


 module.exports = {
    ERROS_INVALID_ID,
    ERROS_NOT_FOUND,
    ERROS_INTERNAL_SERVER_DB,
    ERROS_NAME_NOT_FOUND
     
 }