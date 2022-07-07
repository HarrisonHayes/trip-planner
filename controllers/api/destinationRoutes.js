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
    tripData = await Trip.findOne({
      where: { id: req.params.id, user_id: req.session.user_id },
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

// TODO: create GET route (not a DETELE route) for deleting a destination
// use the same logic from the POST route to refresh the page with a trip object

module.exports = router;
