const { DocumentType } = require('../models');

const documentTypeData = [
<<<<<<< HEAD
    {
        name: 'placeholder',
    },
    {
        name: 'placeholder',
    },
=======
  {
    name: 'placaeholder',
  },
  {
    name: 'placeholder',
  },
>>>>>>> 21f247231da1ea4527fa0cee174304bad034bfb7
];

const seedDocumentType = () => DocumentType.bulkCreate(documentTypeData);

module.exports = seedDocumentType;
