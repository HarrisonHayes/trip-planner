const router = require('express').Router();
const { Trip, User, Destination } = require('../../models');
const isAuth = require('../../utils/auth');

// create new trip
router.post('/', async (req, res) => {
  try {
    const tripData = await Trip.create({
      name: req.body.name,
      date_start: req.body.date_start,
      date_end: req.body.date_end,
      user_id: req.session.user_id,
    });

    const trip = tripData.get({ plain: true });
    if (tripData) {
      res.status(201).json({ id: trip.id });
    } else {
      res
        .status(500)
        .json({ message: 'There was an error while creating the trip' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a trip by id
router.put('/:id', async (req, res) => {
  if (req.session.loggedIn) {
    // try {
    let tripData = await Trip.update(
      {
        name: req.body.name,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
      },
      { where: { id: req.params.id } }
    );
    tripData = await Trip.findOne({
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
          attributes: ['id', 'city', 'country', 'date_start', 'date_end'],
        },
        // {
        //   model: Document,
        //   attributes: ['id', 'name', 'content'],
        // },
      ],
    });
    const trip = tripData.get({ plain: true });
    res.render('edit-trip', { trip, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  } else {
    res.render('login');
  }
});

module.exports = router;
