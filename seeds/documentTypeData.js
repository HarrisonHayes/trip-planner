const { DocumentType } = require('../models');

const documentTypeData = [
  {
    name: 'Hotel Reservation',
  },
  {
    name: 'Train ticket Information',
  },
];

const seedDocumentType = () => DocumentType.bulkCreate(documentTypeData);

module.exports = seedDocumentType;
