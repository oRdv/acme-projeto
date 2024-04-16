const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const insertNovaClassificacao = async (dadosClassificacao) => {
    let sql;
    try {
        sql = `insert into tbl_classificacao ( foto_classificacao,
                                                nome,
                                                descricao,
                                                sigla
              ) values (
                                                  '${dadosClassificacao.foto_classificacao}',
                                                  '${dadosClassificacao.nome}',
                                                  '${dadosClassificacao.descricao}',
                                                  '${dadosClassificacao.sigla}',
  );`
  
      let result = await prisma.$executeRawUnsafe(sql);

      if (result) return true;
      else return false;

    } catch (error) {
      return false;
    }
}

const updateClassificcao = async (dadosClassificacao, id) => {
    let sql;
    try {
          sql = `UPDATE tbl_classificacao
          SET
              foto_classificacao = '${dadosClassificacao.foto_classificacao}',
              nome = '${dadosClassificacao.nome}',
              descricao = '${dadosClassificacao.descricao}',
              sigla = '${dadosClassificacao.sigla}'
          WHERE tbl_classificacao.id = ${id};`;
  
      let result = await prisma.$executeRawUnsafe(sql);
  
      if (result) return true;
      else return false;
  
    } catch (error) {
      return false;
    }
}

const deleteClassificacao = async (id) => {
    try {
        let sql = `delete from tbl_classificacao where id = ${id}`;
    
        let redeletedClassificacao = await prisma.$queryRawUnsafe(sql);
    
        return redeletedClassificacao;
      } catch (error) {
        return false;
    }
}

const selectAllClassificacoes = async () => {
    try {
        let sql = "select * from tbl_classificacao";
    
        let rsClassificacao = await prisma.$queryRawUnsafe(sql);
    
        return rsClassificacao;
      } catch (error) {
        return false;
    }
}

const selectByIdClassificacao = async (id) => {
    try {
        let sql = `select * from tbl_classificacao where id =${id}`;
    
        let rsClassificacao = await prisma.$queryRawUnsafe(sql);
    
        return rsClassificacao;
      } catch (error) {
        return false;
      }
}

const selectByNameClassificacao = async function(nome){
    try {
        
        let sql = `select * from tbl_classificacao where nome like "%${nome}%"`
         console.log(sql)

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)
        return rsClassificacao
    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovaClassificacao,
    selectByIdClassificacao,
    updateClassificcao,
    deleteClassificacao,
    selectAllClassificacoes,
    selectByNameClassificacao
}