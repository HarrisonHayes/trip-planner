const { Destination } = require('../models');

const destinationData = [
  {
    city: 'Playa Del Carmen',
    country: 'Mexico',
    date_start: 'March 19, 2021 07:00:00',
    date_end: 'March 24, 2021 22:00:00',
    trip_id: 1,
  },
  {
    city: 'Wilmington',
    country: 'USA',
    date_start: 'June 19, 2021 07:00:00',
    date_end: 'June 27, 2021 22:00:00',
    trip_id: 2,
  },
];

const seedDestination = () => Destination.bulkCreate(destinationData);

module.exports = seedDestination;
