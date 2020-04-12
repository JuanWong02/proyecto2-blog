const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('./../config/db');

const Model = Sequelize.Model;

class Publicacion extends Model {};

Publicacion.init({
    cpublicacion: {
        type: DataTypes.STRING(220),
        allowNull: false,
    },
    title: { 
      type: DataTypes.STRING(40),
      
     
    
    }
    
}, {
    sequelize,
    modelName: 'publicacion'
});

//Publicacion.sync();
module.exports = {Publicacion};