var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {

    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,

    pool: {
        max: process.env.DB_POOLMAX,
        min: process.env.DB_POOLMIN,
        idle: process.env.DB_IDLE,
        acquire: process.env.DB_ACQUIRE,
        handleDisconnects: process.env.DB_DISC
    },

});

module.exports = sequelize;