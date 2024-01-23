var jsonFilmes = require('../modulo/filmes.js')

const filme = jsonFilmes.filmes


const getTodosFilmes = function () {
    let filme = jsonFilmes.filmes.filmes
    let arrayFilmes = []
    let jsonFilme = {}

    filme.forEach(function (getFilmes) {

        let jsonfilmeIN = {
            id: getFilmes.id,
            nome: getFilmes.nome,
            sinopse: getFilmes.sinopse,
            duracao: getFilmes.duracao,
            data_lancamento: getFilmes.data_lancamento,
            data_relancamento: getFilmes.data_relancamento,
            foto_capa: getFilmes.foto_capa,
            valor_unitario: getFilmes.valor_unitario
            
        }

        arrayFilmes.push(jsonfilmeIN)

        jsonFilme.getFilmes = arrayFilmes

    })

    return jsonFilme

}

const getFilmesId = function () {
    let
}
getTodosFilmes()