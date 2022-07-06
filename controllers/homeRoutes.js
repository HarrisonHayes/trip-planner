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
      const trips = allTripData.map((trip) => trip.get({ plain: true }));
      res.render('homepage', { trips, loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.render('login');
  }
});

//get a specific trip
router.get('/trip/:id', isAuth, async (req, res) => {
  //check for login
  if ((req.session.loggedIn = false)) {
    res.redirect('/login');
  } else {
    try {
      const tripData = await Trip.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: 'name',
          },
          {
            model: Document,
            attributes: ['id', 'name', 'content'],
          },
        ],
      });

      if (tripData) {
        const trip = tripData.get({ plain: true });
        res.render('view-trip', {
          post,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res.status(404).json({ message: 'No trip found with this id' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

module.exports = router;
