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
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

//home page
router.get("/", async (req, res) => {
      res.render("homepage", {
          loggedIn: req.session.loggedIn
      });
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
