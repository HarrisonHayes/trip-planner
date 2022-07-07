const router = require('express').Router();
const { Trip, User, Destination } = require('../../models');
const isAuth = require('../../utils/auth');

// add a destination
router.post('/:id', async (req, res) => {

  try {
    const destinationData = await Destination.create({
      city: req.body.city,
      country: req.body.countryName,
      iso: req.body.countryIso,
      date_start: req.body.date_start,
      date_end: req.body.date_end,
      user_id: req.session.user_id,
      trip_id: req.params.id,
    });

    const destination = destinationData.get({ plain: true });
    if (destination) {

      const tripData = await Trip.findOne({
        where: { id: req.params.id, user_id: req.session.user_id },
        attributes: ['id', 'name', 'date_start', 'date_end'],
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Destination,
            attributes: ['id', 'city', 'iso', 'country', 'date_start', 'date_end'],
            order: [["date_start", "ASC"], ["date_end", "ASC"]],
          },
          // {
          //   model: Document,
          //   attributes: ['id', 'name', 'content'],
          // },
        ],
      });
      const trip = tripData.get({ plain: true });

      console.log(trip);
      res.render('edit-trip', { trip, loggedIn: req.session.loggedIn });

    } else {
      res
        .status(500)
        .json({ message: 'There was an error while adding the destination' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/delete/:id', async (req, res) => {
  if (req.session.loggedIn) {
    const destination = await Destination.findOne({
      where: { id: req.params.id },
    });
    if (destination) {
      const tripId = destination.trip_id;
      console.log(tripId);
      //try {
      const destDelete = await Destination.destroy({
        where: { id: req.params.id },
      });
      const tripData = await Trip.findOne({
        where: { id: tripId, user_id: req.session.user_id },
        attributes: ['id', 'name', 'date_start', 'date_end'],
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Destination,
            attributes: ['id', 'city', 'country', 'iso', 'date_start', 'date_end'],
            order: [["date_start", "ASC"], ["date_end", "ASC"]],
          },
          // {
          //   model: Document,
          //   attributes: ['id', 'name', 'content'],
          // },
        ],
      });
      const trip = tripData.get({ plain: true });
      res.render('edit-trip', { trip, loggedIn: req.session.loggedIn });
      // } catch (err) {
      //   res.status(500).json(err);
      // }
    }
  } else {
    res.render('login');
  }
});

module.exports = router;
