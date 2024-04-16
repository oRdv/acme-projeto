const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const insertNovoGenero = async (dadosGenero) => {
    let sql;
    try {
        sql = `insert into tbl_genero (  nome
              ) values (
                                                  '${dadosGenero.nome}'
  );`
  
      let result = await prisma.$executeRawUnsafe(sql);

      if (result) return true;
      else return false;

    } catch (error) {
      return false;
    }
}

const updateGenero = async (dadosGenero, id) => {
    let sql;
    try {
          sql = `UPDATE tbl_genero
          SET
              nome = '${dadosGenero.nome}'
          WHERE tbl_genero.id = ${id};`;
  
      let result = await prisma.$executeRawUnsafe(sql);
  
      if (result) return true;
      else return false;
  
    } catch (error) {
      return false;
    }
}

const deleteGenero = async (id) => {
    try {
        let sql = `delete from tbl_genero where id = ${id}`;
    
        let redeletedGenero = await prisma.$queryRawUnsafe(sql);
    
        return redeletedGenero;
      } catch (error) {
        return false;
    }
}

const selectAllGeneros = async () => {
    try {
        let sql = "select * from tbl_genero";
    
        let rsGeneros = await prisma.$queryRawUnsafe(sql);
    
        return rsGeneros;
      } catch (error) {
        return false;
    }
}

const selectByIdGenero = async (id) => {
    try {
        let sql = `select * from tbl_genero where id =${id}`;
    
        let rsGenero = await prisma.$queryRawUnsafe(sql);
    
        return rsGenero;
      } catch (error) {
        return false;
      }
}

const selectByNameGenero = async function(nome){
    try {
        
        let sql = `select * from tbl_genero where nome like "%${nome}%"`
         console.log(sql)

        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero
    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovoGenero,
    selectByIdGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByNameGenero
}