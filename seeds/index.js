const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedTrip = require('./tripData');
// const seedDestination = require('./destinationData');
// const seedDocument = require('./documentData');
// const seedDocumentType = require('./documentTypeData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUser();
  // await seedDocumentType();
  await seedTrip();
  // await seedDestination();
  // await seedDocument();
  process.exit(0);
};

seedAll();
