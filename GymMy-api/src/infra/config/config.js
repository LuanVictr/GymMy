require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE_NAME,
    "host": process.env.MYSQL_HOSTNAME,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE_NAME,
    "host": process.env.MYSQL_HOSTNAME,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE_NAME,
    "host": process.env.MYSQL_HOSTNAME,
    "dialect": "mysql"
  }
}

// configurar a tabela do sequelize e terminar de criar a model de usuario e a função de login
// configurar a openai