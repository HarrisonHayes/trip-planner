const { Document } = require('../models');

const documentData = [
  {
    name: 'Passport',
    content: 'photo, birthday, address, expiration date',
    type_id: null,
    destination_id: null,
  },
  {
    name: 'Government ID',
    content: 'photo, birthday, address, expiration date',
    type_id: null,
    destination_id: null,
  },
];

const seedDocument = () => Document.bulkCreate(documentData);

module.exports = seedDocument;
