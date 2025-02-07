"use strict";

require('dotenv').config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    native: config.native
  }
);

const modelDefiners = [];

// Lee todos los archivos de la carpeta Models
const modelsPath = path.join(__dirname, "/models");
if (fs.existsSync(modelsPath)) {
  fs.readdirSync(modelsPath)
    .filter((file) => (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    ))
    .forEach((file) => {
      modelDefiners.push(require(path.join(modelsPath, file)));
    });

  // Injectamos la conexion (sequelize) a todos los modelos
  modelDefiners.forEach(model => model(sequelize));

  // Capitalizamos los nombres de los modelos
  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
  ]);
  sequelize.models = Object.fromEntries(capsEntries);
}

module.exports = {
  ...sequelize.models,
  sequelize
};
