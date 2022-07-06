const { User } = require('../models');

const userData = [
  {
    name: 'Bob Smith',
    email: 'bob@fun.com',
    password: 'times123',
    date_created: 'July 6, 2022 11:00:00',
  },
  {
    name: 'Lola Lee',
    email: 'lola@fun.com',
    password: 'times234',
    date_created: 'July 5, 2022 13:00:00',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
