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