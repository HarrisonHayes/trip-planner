const sequelize = require('../config/connection');
const seedTrip = require('./tripData');
const seedDestination = require('./destinationDatat');
const seedDocument = require('./documentData');
const seedDocumentType = require('./documentTypeData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedTrip();
  await seedDestination();
  await seedDocument();
  await seedDocumentType();

  process.exit(0);
};

seedAll();
