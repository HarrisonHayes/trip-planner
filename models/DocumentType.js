const { Model, DataTypes } = require('sequelize');

class DocumentType extends Model {}

DocumentType.init(
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
    }
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'DocumentType',
    }
);

module.exports = DocumentType;