const router = require('express').Router();
const {
  User,
  Trip,
  Destination,
  Document,
  DocumentType,
} = require('../models');
const isAuth = require('../utils/auth');

//login handler
router.get('/login', (req, res) => {
  console.log('login handler');
  if (req.session.loggedIn) {
    console.log('logged in');
    res.render('homepage', { loggedIn: req.session.loggedIn });
  } else {
    console.log('not logged in');
    res.render('login');
  }
});

// home page - get all trips for a user
router.get('/', async (req, res) => {
  if (req.session.user_id) {
    try {
      const tripData = await Trip.findAll({
        where: { user_id: req.session.user_id },
        attributes: ['id', 'name', 'date_start', 'date_end'],
      });
      const trips = tripData.map((trip) => trip.get({ plain: true }));
      res.render('homepage', { trips, loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
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
      const trips = allTripData.map((trip) => Trip.get({ plain: true }));
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
        //here: { id: req.params.id },
        attributes: ['id', 'name', 'date_start', 'date_end'],
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Destination,
            attributes: ['id','city','country','date_start','date_end'],
          },
          // {
          //   model: Document,
          //   attributes: ['id', 'name', 'content'],
          // },
        ],
      });
      const trip = tripData.get({ plain: true });
      res.render('edit-trip', { trip, loggedIn: req.session.loggedIn });
  } else {
    res.render('login');
  }
});


module.exports = router;
