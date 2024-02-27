const { json } = require('body-parser')
var jsonFilmes = require('../module/filmes.js')

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

const getFilmesId = function (id) {

    let idFilme = Number(id)
    let filme = jsonFilmes.filmes.filmes
    let arrayFilmes = []
    let jsonFilme = {}

    filme.forEach(function (getFilmesId) {
        if(getFilmesId.id == idFilme) {

            let filmesId = {

            id: getFilmesId.id,
            nome: getFilmesId.nome,
            sinopse: getFilmesId.sinopse,
            duracao: getFilmesId.duracao,
            data_lancamento: getFilmesId.data_lancamento,
            data_relancamento: getFilmesId.data_relancamento,
            foto_capa: getFilmesId.foto_capa,
            valor_unitario: getFilmesId.valor_unitario
            }

            arrayFilmes.push(filmesId)

        }

        jsonFilme.getFilmes = arrayFilmes
    })

}


module.exports = {
    getTodosFilmes,
    getFilmesId
}
