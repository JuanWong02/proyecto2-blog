const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('./../config/db');

const Model = Sequelize.Model;

class Publica extends Model {};

Publica.init({
    name: {
        type: DataTypes.STRING(220),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'comentario'
});

//Publica.sync();
module.exports = {Publica};