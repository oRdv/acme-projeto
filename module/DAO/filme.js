// arquivo que realiza o CRUD no banco de dados MYSQL para os filmes
/*
$queryRawUnsafe(sql) -- encaminha uma variavel
$queryRaw(select * from tbl_filme) --  encaminha direto do scripit sem concatenações
rs n é risadinha e sim result ou record set
*/

//import da biblioteca prisma client
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//Função para inserir um novo filme no banco de dados
const insertNovoFilme = async function(dadosFilme){
    let sql
    try{

        //if pq a dat de relancamento pode ser vazia, ent se faz esse tratamento, obs: essa condicao é provisoria e errada, iremos tratar no bd com uma procedure;
        if(dadosFilme.data_relancamento == null || 
        dadosFilme.data_relancamento == undefined ||
        dadosFilme.data_relancamento == ''){  
             sql = `insert ito tbl_filme (nome, 
                                            sinopse, 
                                            duracao,   
                                            data_lancamento, 
                                            data_relancamento,
                                            foto_capa, 
                                            valor_unitario) 
                                            values (
                                                '${dadosFilme.nome}',
                                                '${dadosFilme.sinopse}',
                                                '${dadosFilme.duracao}',
                                                '${dadosFilme.data_lancamento}',
                                                null,
                                                '${dadosFilme.foto_capa}',
                                                '${dadosFilme.vallor_unitario}'
                                                )`
        } else {
            sql = `insert ito tbl_filme (nome, 
                                            sinopse, 
                                            duracao,   
                                            data_lancamento, 
                                            data_relancamento,
                                            foto_capa, 
                                            valor_unitario) 
                                            values (
                                                '${dadosFilme.nome}',
                                                '${dadosFilme.sinopse}',
                                                '${dadosFilme.duracao}',
                                                '${dadosFilme.data_lancamento}',
                                                '${dadosFilme.data_relancamento}',
                                                '${dadosFilme.foto_capa}',
                                                '${dadosFilme.vallor_unitario}'
                                                )`
        }
    
        //$executeRawUnsafe para utilizar um sql de insert que nao retornam valores. o outro queryrawunsafee para select e retornm dados.
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }


}

//Função para atualizar um filme existente no banco de dados
const updateFilme = async function(){

}

//Função para deletar um filme existente no banco de dados
const deleteFilme = async function(){

}

//Função para listar todos os filmes existentes no banco de dados
const selectAllFilmes = async function(){
    
    try {
    //scriptSQL para registrar todos os registos do db
    let sql = 'select * from tbl_filme'
    //executa o scriptSQL na BD e guarda o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql)
    
    return rsFilmes
} catch (error) {
    
    return false
}


    //validação para retornar os dados e retornr falso
    if (rsFilmes.length > 0){
        return rsFilmes
    }else {
        return false
    }

}

//Função para retornar um filme a partir de um critério (ID) no banco de dados
const selectByIdFilme = async function(id){ 
    
    try {
        //sql pra pesquisa por id
    let sql = `select * from tbl_filme where id = ${id}`

     //executa o sql no bd e retorna o filme
    let rsFilme = await prisma.$queryRawUnsafe(sql)
    return rsFilme

    } catch (error) {
        return false
    }

   
}

const selectByNameFilme = async function(nome){
    try {
        
        let sql = `select * from tbl_filme where nome like "%${nome}%"`
         console.log(sql)

        let rsFilme = await prisma.$queryRawUnsafe(sql)
        return rsFilme
    } catch (error) {
        return false
    }
}

module.exports = {
    insertNovoFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNameFilme
}