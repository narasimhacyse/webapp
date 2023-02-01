const config = require('../serve/config');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = database = {};

let created= false;

database.initialize = initialize;

initialize();''

async function initialize() {
  if(created){
    return;
  }
    // create database if it doesn't already exist
    const { HOST, SERVER_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, DATABASE } = config;

    const connection = await mysql.createConnection({  
      host: HOST,
      user: MYSQL_USERNAME,
      password: MYSQL_PASSWORD
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`);

    // connect to database
    const sequelize = new Sequelize(DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, { dialect: 'mysql' });

    // init models and add them to the exported database object
    database.User = require('../../User/user.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
    
    created = true;
}
