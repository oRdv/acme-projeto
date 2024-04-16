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

    try{
        
        let sql
        // let idSQL

        //if pq a dat de relancamento pode ser vazia, ent se faz esse tratamento, obs: essa condicao é provisoria e errada, iremos tratar no bd com uma procedure;
        if(dadosFilme.data_relancamento == null || 
        dadosFilme.data_relancamento == undefined ||
        dadosFilme.data_relancamento == ''){  
            
             sql = `insert into tbl_filme (nome, 
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
                                                '${dadosFilme.valor_unitario}'
                                                )`

                                                // idSQL = `select cast(id as decimal) from tbl_filme order by id desc limit 1`
        } else {
            
            sql = `insert into tbl_filme (nome, 
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
                                                '${dadosFilme.valor_unitario}'
                                                )`

                                                // idSQL = `select cast(id as decimal) from tbl_filme order by id desc limit 1`
        }
    
        //$executeRawUnsafe para utilizar um sql de insert que nao retornam valores. o outro queryrawunsafee para select e retornm dados.
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)
        // let idResult = await prisma.$queryRawUnsafe(idSQL)
        console.log(result)
        
        // if(result /*&& idResult*/){
            return result //, idResult
        // }else{
        //     return false
        // }
    }catch(error){
        return false
    }


}

//Função para atualizar um filme existente no banco de dados
const updateFilme = async function(){

    try {
        let sql
        if(dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined){
            sql = `update tbl_filme set 
            nome = '${dadosFilme.nome}',
            sinopse =  '${dadosFilme.sinopse}',
            duracao = '${dadosFilme.duracao}',
            data_lancamento = '${dadosFilme.data_lancamento}',
            data_relancamento = '${dadosFilme.data_relancamento}',
            foto_capa = '${dadosFilme.foto_capa}',
            valor_unitario = '${dadosFilme.valor_unitario}'
            where tbl_filme.id = ${dadosFilme.id}`
        }else{
            sql = `update tbl_filme set 
            nome = '${dadosFilme.nome}',
            sinopse =  '${dadosFilme.sinopse}',
            duracao = '${dadosFilme.duracao}',
            data_lancamento = '${dadosFilme.data_lancamento}',
            foto_capa = '${dadosFilme.foto_capa}',
            valor_unitario = '${dadosFilme.valor_unitario}',
            where tbl_filme.id = ${dadosFilme.id}`
        }
        
            let result = await prisma.$executeRawUnsafe(sql)


            if(result)
                return result

            else
                return false
    } catch (error) {
        return false
    }

}

//Função para deletar um filme existente no banco de dados
const deleteFilme = async function(id){

    try {
        let sql = `delete from tbl_filme where tbl_filme.id = ${id}`
        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    }catch (error) {
        return false
    }

}

//Função para listar todos os filmes existentes no banco de dados
const selectAllFilmes = async function(){
    
    try {
        let sql = 'select * from tbl_filme';

        //rs = result (resultado do banco)
        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsFilmes = await prisma.$queryRawUnsafe(sql);

         return rsFilmes;


    } catch (error) {

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