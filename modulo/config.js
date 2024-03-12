//Arquivo responsável pelas váriaveis globais do projeto, onde haverão mensagens, status code e outros conteudos para o projeto.

//varivel(muda) letra minuscula e constante(não muda) letra maiuscula
 // mensagens de erro do projeto

 const ERROS_INVALID_ID = {status: false, status_code: 400, message: "O ID ENCAMINHADO NA REQUISIÇÃO NÃO É VALIDO."}
 const ERROS_NOT_FOUND = {status: false, status_code: 404, message: "NENHUM ITEM ENCONTRADO NA REQUISIÇÃO."}
 const ERROS_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: "OCORRERAM NO PROCESAMENTO DO BANCO DE DADOS - CONTATE O ADMINISTRADOR DA API."}
 const ERROS_NAME_NOT_FOUND = {status: false, status_code: 400, message: "NENHUM NOME FOI ENCONTRADO NA REQUISIÇÃO."}
 const ERROS_REQUIRED_FIELDS = {status: false, status_code:400, message: "EXISTE CAMPOS OBRIGATÓRIOS QUE NAO FORAM PREENCHIDOS, OU UTRAPASSARAM O LIMITE DE CARACTERES"}
 const ERROS_CONTENT_TYPE = {status: false, status_code:415, message: "O CONTENT-TYPE DA REQUISIÇÃO NÃO É SUPORTADO PELA API. DEVE-SE ENVIAR DADOS NO FORMATO APPLICATION/JSON"}
 const ERROS_INTERNAL_SERVER = {status: false, status_code:500, message: "OORRERA ERROS NO SERVIDOR BACK-END NA CAMADA DE SERVIÇOS/NEGÓCIOS, PORTANTO NÃO FOI POSSÍVEL PROCESSAR A REQUISIÇÃO. - CONTATE O ADMINISTRADOR DA API"}

 


//message de sucesso.

   const SUCESSED_CREATED_ITEM = {status: true, status_code: 201, message: "O ITEM FOI CRIADO COM SUCESSO NO BANCO DE DADOS"}

 module.exports = {
    ERROS_INVALID_ID,
    ERROS_NOT_FOUND,
    ERROS_INTERNAL_SERVER_DB,
    ERROS_NAME_NOT_FOUND,
    ERROS_REQUIRED_FIELDS,
    SUCESSED_CREATED_ITEM,
    ERROS_CONTENT_TYPE,
    ERROS_INTERNAL_SERVER
     
 }