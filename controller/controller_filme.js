// Arquivo responsavel por realizar validacoes, consistencias e regra de negocio para os filmes

//importe do arquivo DAO para maipular dados dos filmes 
const filmesDAO = require ('../module/DAO/filme.js')


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
        //Cria o JSON de retorno dos dados
        filmesJson.filmes = dadosFilmes
        filmesJson.quantidade = dadosFilmes.length
        filmesJson.status_code = 200

    }else {
        return false
    }

}

//Função para retornar um filme a partir do ID 
const getBuscarFilme = async function(){

}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}