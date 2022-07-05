const { Trip } = require('../models');

const tripData = [
  {
    name: 'Spring Break',
    date_start: 'March 19, 2021 07:00:00',
    date_end: 'March 24, 2021 22:00:00',
    user_id: 2,
  },
  {
    name: 'Summer Vacation',
    date_start: 'June 19, 2021 07:00:00',
    date_end: 'June 27, 2021 22:00:00',
    user_id: 4,
  },
];

const seedTrip = () => Trip.bulkCreate(tripData);

module.exports = seedTrip;
