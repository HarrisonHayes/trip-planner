const router = require('express').Router();
const {
  User,
  Trip,
  Destination,
  Document,
  // DocumentType,
} = require('../models');
const isAuth = require('../utils/auth');

//login handler
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.render('homepage', { loggedIn: req.session.loggedIn });
  } else {
    res.render('login');
  }
});

// home page - get all trips for a user
router.get('/', async (req, res) => {
  if (req.session.user_id) {
    //try {
    const tripData = await Trip.findAll({
      where: { user_id: req.session.user_id },
      attributes: ['id', 'name', 'date_start', 'date_end', 'user_id'],
      order: [
        ['date_start', 'ASC'],
        ['date_end', 'ASC'],
      ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Destination,
          attributes: [
            'id',
            'city',
            'iso',
            'country',
            'date_start',
            'date_end',
          ],
          order: [
            ['date_start', 'ASC'],
            ['date_end', 'ASC'],
          ],
        },
      ],
    });
    const trips = tripData.map((trip) => trip.get({ plain: true }));
    let flagHTML = '';
    for (let tripOrd = 0; tripOrd < tripData.length; tripOrd++) {
      const thisTrip = tripData[tripOrd];
      for (let destOrd = 0; destOrd < thisTrip.destinations.length; destOrd++) {
        const thisDest = thisTrip.destinations[destOrd];
      }
    }

    res.render('homepage', { trips, loggedIn: req.session.loggedIn });
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  } else {
    res.render('homepage', { loggedIn: req.session.loggedIn });
  }
});

// create a trip
router.get('/createtrip', async (req, res) => {
  if (req.session.loggedIn) {
    res.render('create-trip', { loggedIn: req.session.loggedIn });
  } else {
    res.render('login');
  }
});

// delete a trip by id
router.get('/deletetrip/:id', async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const tripData = await Trip.destroy({ where: { id: req.params.id } });
      const allTripData = await Trip.findAll({
        where: { user_id: req.session.user_id },
        attributes: ['id', 'name', 'date_start', 'date_end'],
      });
      const trips = allTripData.map((trip) => trip.get({ plain: true }));
      res.render('homepage', { trips, loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.render('login');
  }
});

// view/edit a trip by id
router.get('/edittrip/:id', async (req, res) => {
  if (req.session.loggedIn) {
    const tripData = await Trip.findOne({
      where: { id: req.params.id, user_id: req.session.user_id },
      attributes: ['id', 'name', 'date_start', 'date_end', 'user_id'],
      order: [
        [Destination, 'date_start', 'ASC'],
        [Destination, 'date_end', 'ASC'],
      ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Destination,
          attributes: [
            'id',
            'city',
            'iso',
            'country',
            'date_start',
            'date_end',
          ],
          include: [ 
            {
              model: Document,
              attributes: ['id', 'name', 'content', 'type'],
            }
          ],
        },
      ],
    });
    const trip = JSON.parse(JSON.stringify(tripData));
    res.render('edit-trip', { trip, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
  } else {
    res.render('login');
  }
});

// add document to a destination id
router.get('/adddocument/:id', async (req, res) => {
  if (req.session.loggedIn) {
    const destinationData = await Destination.findOne({
      where: { id: req.params.id }
    });
    if(destinationData){
      const destination = JSON.parse(JSON.stringify(destinationData));
      res.render('add-document', { destination, loggedIn: req.session.loggedIn, user_id: req.session.user_id }); 
    }
  } else {
    res.render('login');
  }
});

module.exports = router;
