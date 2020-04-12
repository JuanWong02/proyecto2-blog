const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('./../config/db');

const Model = Sequelize.Model;

class Titulo extends Model {};

//Titulo.init({
  //  title: {
    //    type: DataTypes.STRING(40),
      //  allowNull: false,
    //},
    //publicacion: { 
      //type: DataTypes.STRING(220),
      
     
    
    //}
    
//}, {
  //  sequelize,
    //modelName: 'titulo'
//});

//Titulo.sync();
//module.exports = {Titulo};