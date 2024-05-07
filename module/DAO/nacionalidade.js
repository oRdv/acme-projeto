const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllNacionalidades = async() => {
    try {
        let sql = `SELECT * FROM tbl_nacionalidade`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        console.log(rsnacionalidade)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByAtor = async(id) => {
    try {
        let sql = `SELECT tbl_nacionalidade.id, nome FROM tbl_nacionalidade JOIN tbl_ator_nacionalidade ON tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade WHERE id_ator = ${id}`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByAtorU = async(id_ator) => {
    try {
        let sql = `SELECT id FROM tbl_ator_nacionalidade WHERE id_ator = ${id_ator};`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}

const selectNacionalidadeAtorId = async(id) => {
    try {
        let sql = `SELECT * FROM tbl_ator_nacionalidade WHERE id = ${id};`

        let rs = await prisma.$queryRawUnsafe(sql)
        if(rs)
            return rs
        else
            return false
    } catch (error) {
        return false
    }
}

const updateAtorNacionalidade = async(id, id_ator, id_nacionalidade) => {
    try {
        let sql = `UPDATE tbl_ator_nacionalidade SET id_ator = '${id_ator}', id_nacionalidade = '${id_nacionalidade}' WHERE tbl_ator_nacionalidade.id = ${id};`

        let rsnacionalidade = await prisma.$executeRawUnsafe(sql)

        if(rsnacionalidade)
            return rsnacionalidade
        else
            return false
    } catch (error) {
        return false
    }
}


const deleteNacionalidadeByAtor = async(id_ator) => {
    try {
        let sql = `DELETE FROM tbl_ator_nacionalidade WHERE id_ator = ${id_ator}`


        let rs = await prisma.$queryRawUnsafe(sql)


        if(rs)
            return rs
        else
            return false
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByDiretor = async(id) => {
    try {
        console.log(id);
        let sql = `SELECT tbl_nacionalidade.id, nome FROM tbl_nacionalidade JOIN tbl_diretor_nacionalidade ON tbl_diretor_nacionalidade.id_nacionalidade = tbl_nacionalidade.id WHERE id_diretor = ${id};`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}

const insertAtorNacionalidade = async(id_ator, id_nacionalidade) => {
    try {
        let sql = `INSERT INTO tbl_ator_nacionalidade (id_ator, id_nacionalidade) VALUES ('${id_ator}', '${id_nacionalidade}')`
        console.log(sql);

        let rsnacionalidade = await prisma.$executeRawUnsafe(sql)

        if(rsnacionalidade)
            return rsnacionalidade
        else
            return false
    } catch (error) {
        return false
    }
}



const insertDiretorNacionalidade = async(id_diretor, id_nacionalidade) => {
    try {
        let sql = `INSERT INTO tbl_diretor_nacionalidade (id_diretor, id_nacionalidade) VALUES ('${id_diretor}', '${id_nacionalidade}')`

        console.log(sql);

        let rsnacionalidade = await prisma.$executeRawUnsafe(sql)

        if(rsnacionalidade)
            return rsnacionalidade
        else
            return false
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByDiretorU = async(id_diretor) => {
    try {
        let sql = `SELECT id FROM tbl_diretor_nacionalidade WHERE id_diretor = ${id_diretor};`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}

const selectNacionalidadeDiretorId = async(id) => {
    try {
        let sql = `SELECT * FROM tbl_diretor_nacionalidade WHERE id = ${id};`

        let rs = await prisma.$queryRawUnsafe(sql)
        if(rs)
            return rs
        else
            return false
    } catch (error) {
        return false
    }
}

const updateDiretorNacionalidade = async(id, id_diretor, id_nacionalidade) => {
    try {
        let sql = `UPDATE tbl_diretor_nacionalidade SET id_diretor = '${id_diretor}', id_nacionalidade = '${id_nacionalidade}' WHERE tbl_diretor_nacionalidade.id = ${id};`
        console.log(sql);

        let rsnacionalidade = await prisma.$executeRawUnsafe(sql)

        if(rsnacionalidade)
            return rsnacionalidade
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteNacionalidadeByDiretor = async(id_diretor) => {
    try {
        let sql = `DELETE FROM tbl_diretor_nacionalidade WHERE id_diretor = ${id_diretor}`


        let rs = await prisma.$queryRawUnsafe(sql)


        if(rs)
            return rs
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteNacionalidadeDiretor = async(id) => {
    try {
        let sql = `DELETE FROM tbl_diretor_nacionalidade WHERE id = ${id}`
        console.log("teste " + sql);


        let rs = await prisma.$queryRawUnsafe(sql)
        console.log(sql);


        if(rs)
            return rs
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllNacionalidades,
    selectNacionalidadeByAtor,
    selectNacionalidadeByDiretor,
    insertAtorNacionalidade,
    insertDiretorNacionalidade,
    updateAtorNacionalidade,
    selectNacionalidadeByAtorU,
    selectNacionalidadeAtorId,
    selectNacionalidadeByDiretorU,
    selectNacionalidadeDiretorId,
    updateDiretorNacionalidade,
    deleteNacionalidadeByAtor,
    deleteNacionalidadeByDiretor,
    deleteNacionalidadeDiretor
}