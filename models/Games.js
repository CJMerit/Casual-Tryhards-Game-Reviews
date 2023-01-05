const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Games extends Model { }

Games.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        platforms: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        game_description: {
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        release_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cover: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underescored: true,
        modelName: 'games', 
    }
)

module.exports = Games;
