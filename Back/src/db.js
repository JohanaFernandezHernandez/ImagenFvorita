require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
  } = process.env;

// Aqui va la conexion con la base de datos con MongoDB
  const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false,
    native: false, 
    dialectOptions: {
      ssl: false
    }
  });

const basename = path.basename(__filename);
const modelDefiners = [];

// Leer todos los archivos de la carpeta /models y requerirlos
fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, 'models', file)));
  });

// Inyectar la conexión (sequelize) a todos los modelos
modelDefiners.forEach(modelDefiner => modelDefiner(sequelize));

// Capitalizar los nombres de los modelos para mantener consistencia
const capitalizeModelNames = (models) => {
  const entries = Object.entries(models);
  const capsEntries = entries.map(([name, model]) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return [capitalized, model];
  });
  return Object.fromEntries(capsEntries);
};

sequelize.models = capitalizeModelNames(sequelize.models);

// Definición de relaciones entre modelos
const { Imagen } = sequelize.models;


module.exports = {
    ...sequelize.models, 
    conn: sequelize,     
  };