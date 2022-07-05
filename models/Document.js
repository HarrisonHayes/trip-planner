const { Model, DataTypes } = require('sequelize');

class Document extends Model {}

Document.init(
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'documentType',
        key: 'id',
      },
    },
    destination_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'destination',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'document',
  }
);

module.exports = Document;
