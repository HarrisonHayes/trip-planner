const { Model, DataTypes } = require('sequelize');

class Destination extends Model {}

Destination.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_start: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        date_end: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        trip_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'trip',
                key: 'id',
            }
        },
    }
)