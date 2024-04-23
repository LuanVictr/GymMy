import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  `mysql://${process.env.MYSQL_USERNAME}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOSTNAME}:${process.env.MYSQL_PORT}/gymmy`
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida.');
  })
  .catch(err => {
    console.error('Erro ao conectar:', err);
  });