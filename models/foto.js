const {Sequelize} = require('sequelize');
const {sequelize} = require('./../config/db');

const Model = Sequelize.Model;

class Foto extends Model {};

Foto.init({
    url: {
        type: Sequelize.STRING,
    }
}, {
    sequelize,
    modelName: 'foto'
});

//Foto.sync();
module.exports = {Foto};