const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    menu1:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    menu2:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    menu3:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    menu4:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    menu5:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});

User.sync({force: false});

module.exports = User;