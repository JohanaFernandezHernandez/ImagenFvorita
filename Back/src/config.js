require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

module.exports = {
  development: {
    username: DB_USER || 'postgres',
    password: DB_PASSWORD || 'Nancy',
    database: DB_NAME || 'ImagenesDB',
    host: DB_HOST || 'localhost',
    port: DB_PORT || '5432',
    dialect: 'postgres',
    logging: false,
    native: false
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
