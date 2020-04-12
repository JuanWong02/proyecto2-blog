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
const {Publicacion} = require('./../models/publicacion');
const {Comentario} = require('./../models/comentario');

Usuario.hasMany(Publicacion);
Publicacion.belongsTo(Usuario);  //getusuario()

Usuario.hasMany(Comentario);
Comentario.belongsTo(Usuario); //getgetusuario()

Publicacion.hasMany(Comentario);
Comentario.belongsTo(Publicacion); //getpublicacion()



//sequelize.sync({force: true});

(async () => {

})