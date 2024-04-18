const { connection } = require("../database/connection")
const { DataTypes } = require("sequelize")


const Professor = connection.define('professores', {
    nome: {
        type: DataTypes.STRING
    },
    salario_hora: {
        type: DataTypes.FLOAT
    },
    carga_horaria: {
        type: DataTypes.INTEGER
    },


})


module.exports = Professor