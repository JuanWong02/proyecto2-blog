const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('./../config/db');

const Model = Sequelize.Model;

class Publicacion extends Model {};

Publicacion.init({
    text: {
        type: DataTypes.STRING(220),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'publicacion'
});

//Publicacion.sync();
module.exports = {Publicacion};