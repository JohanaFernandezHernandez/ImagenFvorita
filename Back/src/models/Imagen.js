const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Imagen', {
        ImagenID: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ImagenURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};