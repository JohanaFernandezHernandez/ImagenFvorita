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
        filename: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mimetype: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
    });
};