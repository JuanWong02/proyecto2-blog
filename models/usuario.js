const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./../config/db');

const Model = Sequelize.Model;

class Usuario extends Model { };

Usuario.init({
    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'usuario'
});

//Usuario.sync();
module.exports = { Usuario };