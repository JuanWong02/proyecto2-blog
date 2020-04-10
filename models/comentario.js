const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('./../config/db');

const Model = Sequelize.Model;

class Comentario extends Model {};

Comentario.init({
    comment: {
        type: DataTypes.STRING(180),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'comentario'
});

//Comentario.sync();
module.exports = {Comentario};