const { PrismaClient } = require('@prisma/client')
const { deleteClassificacao } = require('./classificacao')

const prisma = new PrismaClient()


const insertNovoAtor = async function(dadosAtor){

    try{
        
        let sql
        // let idSQL

        //if pq a dat de relancamento pode ser vazia, ent se faz esse tratamento, obs: essa condicao é provisoria e errada, iremos tratar no bd com uma procedure;
        if(dadosAtor.data_falecimento == null || 
        dadosAtor.data_falecimento == undefined ||
        dadosAtor.data_falecimento == ''){  
            
             sql = `insert into tbl_atores (nome, 
                                            data_nascimento, 
                                            data_falecimento,   
                                            foto,
                                            biografia,
                                            id_sexo,
                                            id_nacionalidade ) 
                                            values (
                                                '${dadosAtor.nome}',
                                                '${dadosAtor.data_nascimento}',
                                                null,
                                                '${dadosAtor.foto}',
                                                '${dadosAtor.biografia}',
                                                '${dadosAtor.id_sexo}',
                                                '${dadosAtor.id_nacionalidade}'
                                                )`

        } else {
            
            sql = `insert into tbl_atores (nome, 
                                            data_nascimento, 
                                            data_falecimento,   
                                            foto,
                                            biografia,
                                            id_sexo,
                                            id_nacionalidade) 
                                            values (
                                                '${dadosAtor.nome}',
                                                '${dadosAtor.data_nascimento}',
                                                '${dadosAtor.data_falecimento}',
                                                '${dadosAtor.foto}',
                                                '${dadosAtor.biografia}',
                                                '${dadosAtor.id_sexo}',
                                                '${dadosAtor.id_nacionalidade}'
                                                )`

        }
    
        //$executeRawUnsafe para utilizar um sql de insert que nao retornam valores. o outro queryrawunsafee para select e retornm dados.
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return result
        } else {
            return false
        }

    }catch(error){
        return false
    }


}

const updateAtores = async function(){

    try {
        let sql
        if(dadosAtor.data_falecimento != '' && dadosAtor.data_falecimento != null && dadosAtor.data_falecimento != undefined){
            sql = `update tbl_atores set 
            nome = '${dadosAtor.nome}',
            data_nascimento =  '${dadosAtor.data_nascimento}',
            data_falecimento = '${dadosAtor.data_falecimento}',
            foto = '${dadosAtor.foto}', 
            biografia =   '${dadosAtor.biografia}',
            id_sexo =  '${dadosAtor.id_sexo}',
            where tbl_atores.id = ${dadosAtor.id}`

        }else{

            sql = `update tbl_atores set 
            nome = '${dadosAtor.nome}',
            data_nascimento =  '${dadosAtor.data_nascimento}',
            foto = '${dadosAtor.foto}', 
            biografia =  '${dadosAtor.biografia}',
            id_sexo =  '${dadosAtor.id_sexo}',
            where tbl_atores.id = ${dadosAtor.id}`
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

const deleteAtor = async (id) => {
    try {
        let sql = `delete from tbl_atores where id = ${id}`;
    
        let redeletedAtor = await prisma.$queryRawUnsafe(sql);
    
        return redeletedAtor;
      } catch (error) {
        return false;
    }
}
const selectAllAtores = async function(){
    
    try {
        let sql = 'select * from tbl_atores';

        //rs = result (resultado do banco)
        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsAtores = await prisma.$queryRawUnsafe(sql);

         return rsAtores;


    } catch (error) {

        return false
    }
}

const selectByIdAtores = async function(id){ 
    
    try {
        //sql pra pesquisa por id
    let sql = `select * from tbl_atores where id = ${id}`

     //executa o sql no bd e retorna o ator
    let rsAtores = await prisma.$queryRawUnsafe(sql)
    return rsAtores

    } catch (error) {
        return false
    }

   
}

const selectByNameAtores = async function(nome){
    try {
        
        let sql = `select * from tbl_atores where nome like "%${nome}%"`
         console.log(sql)

        let rsAtores = await prisma.$queryRawUnsafe(sql)
        return rsAtores
    } catch (error) {
        return false
    }
}

module.exports = {
    insertNovoAtor,
    updateAtores,
    selectAllAtores,
    selectByIdAtores,
    deleteAtor,
    selectByNameAtores
}