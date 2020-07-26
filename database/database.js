const Sequelize = require('sequelize');

const connection = new Sequelize('schemaname', 'usuario', 'senha',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;