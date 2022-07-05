const { DocumentType } = require('../models');

const documentTypeData = [
  {
    name: 'placaeholder',
  },
  {
    name: 'placeholder',
  },
];

const seedDocumentType = () => DocumentType.bulkCreate(documentTypeData);

module.exports = seedDocumentType;
