const { DocumentType } = require('../models');

const documentTypeData = [
    {
        name: 'placeholder',
    },
    {
        name: 'placeholder',
    },

];

const seedDocumentType = () => DocumentType.bulkCreate(documentTypeData);

module.exports = seedDocumentType;
