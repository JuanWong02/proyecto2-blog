const Sequelize = require('sequelize').Sequelize;

let sequelize = new Sequelize('blog','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('MySQL connection successful.');
    })
    .catch((err) => {
        console.error('MySQL connection error: ',err);
    });


module.exports = {
    sequelize
}

const {Usuario} = require('./../models/usuario');
const {Titulo} = require('./../models/titulo');
const {Comentario} = require('./../models/comentario');

Usuario.hasMany(Titulo);
Titulo.belongsTo(Usuario);

Usuario.hasMany(Comentario);
Comentario.belongsTo(Usuario);

//sequelize.sync();

(async () => {
    
})