const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectAllSexo = async() => {
    try {
        let sql = `SELECT * FROM tbl_sexo`

        let rsgenero = await prisma.$queryRawUnsafe(sql)
        console.log(rsgenero)
        return rsgenero
        
    } catch (error) {
        return false
    }
}

const selectSexoById = async(id) => {
    try {
        let sql = `SELECT * FROM tbl_sexo WHERE id = ${id}`

        let rsgenero = await prisma.$queryRawUnsafe(sql)
        return rsgenero
        
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllSexo,
    selectSexoById,
}