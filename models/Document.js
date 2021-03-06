const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
    // type_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'documentType',
    //     key: 'id',
    //   },
    // },
    type: {
      type: DataTypes.STRING,
      allowNull: false 
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
