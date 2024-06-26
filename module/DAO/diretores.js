const { PrismaClient } = require('@prisma/client')
const { deleteClassificacao } = require('./classificacao')

const prisma = new PrismaClient()


const insertNovoDiretor = async function(dadosDiretor){

    try{
        
        let sql
        // let idSQL

        //if pq a dat de relancamento pode ser vazia, ent se faz esse tratamento, obs: essa condicao é provisoria e errada, iremos tratar no bd com uma procedure;
        if(dadosDiretor.data_falecimento == null || 
        dadosDiretor.data_falecimento == undefined ||
        dadosDiretor.data_falecimento == ''){  
            
             sql = `insert into tbl_diretores (nome, 
                                            data_nascimento, 
                                            data_falecimento,   
                                            foto,
                                            biografia,
                                            id_sexo) 
                                            values (
                                                '${dadosDiretor.nome}',
                                                '${dadosDiretor.data_nascimento}',
                                                null,
                                                '${dadosDiretor.foto}',
                                                '${dadosDiretor.biografia}',
                                                '${dadosDiretor.id_sexo}'
                                                )`

        } else {
            
            sql = `insert into tbl_diretores (nome, 
                                            data_nascimento, 
                                            data_falecimento,   
                                            foto,
                                            biografia,
                                            id_sexo) 
                                            values (
                                                '${dadosDiretor.nome}',
                                                '${dadosDiretor.data_nascimento}',
                                                '${dadosDiretor.data_falecimento}',
                                                '${dadosDiretor.foto}',
                                                '${dadosDiretor.biografia}',
                                                '${dadosDiretor.id_sexo}'
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

const updateDiretor = async function(){

    try {
        let sql
        if(dadosDiretor.data_falecimento != '' && dadosDiretor.data_falecimento != null && dadosDiretor.data_falecimento != undefined){
            sql = `update tbl_diretores set 
            nome = '${dadosDiretor.nome}',
            data_nascimento =  '${dadosDiretor.data_nascimento}',
            data_falecimento = '${dadosDiretor.data_falecimento}',
            foto = '${dadosDiretor.foto}', 
            biografia =   '${dadosDiretor.biografia}',
            id_sexo =  '${dadosDiretor.id_sexo}',
            where tbl_atores.id = ${dadosDiretor.id}`

        }else{

            sql = `update tbl_diretores set 
            nome = '${dadosDiretor.nome}',
            data_nascimento =  '${dadosDiretor.data_nascimento}',
            foto = '${dadosDiretor.foto}', 
            biografia =  '${dadosDiretor.biografia}',
            id_sexo =  '${dadosDiretor.id_sexo}',
            where tbl_atores.id = ${dadosDiretor.id}`
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

const deleteDiretores= async (id) => {
    try {
        let sql = `delete from tbl_diretores where id = ${id}`;
    
        let redeletedDiretor = await prisma.$queryRawUnsafe(sql);
    
        return redeletedDiretor;
      } catch (error) {
        return false;
    }
}
const selectAllDiretores = async function(){
    
    try {
        let sql = 'select * from tbl_diretores';

        //rs = result (resultado do banco)
        //Executa o scriptSQL no BD e guarda o retorno dos dados
        let rsDiretores = await prisma.$queryRawUnsafe(sql);

         return rsDiretores;


    } catch (error) {

        return false
    }
}

const selectByDiretoresID = async function(id){ 
    
    try {
        //sql pra pesquisa por id
    let sql = `select * from tbl_diretores where id = ${id}`

     //executa o sql no bd e retorna o ator
    let rsDiretores = await prisma.$queryRawUnsafe(sql)
    return rsDiretores

    } catch (error) {
        return false
    }

   
}

const selectByNameDiretores = async function(nome){
    try {
        
        let sql = `select * from tbl_diretores where nome like "%${nome}%"`
         console.log(sql)

        let rsDiretores = await prisma.$queryRawUnsafe(sql)
        return rsDiretores
    } catch (error) {
        return false
    }
}

module.exports = {
    insertNovoDiretor,
    updateDiretor,
    selectAllDiretores,
    selectByDiretoresID,
    deleteDiretores,
    selectByNameDiretores
}