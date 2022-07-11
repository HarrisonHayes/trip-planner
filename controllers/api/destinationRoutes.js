const router = require('express').Router();
const { Trip, User, Destination, Document } = require('../../models');
const isAuth = require('../../utils/auth');

// add a destination
router.post('/:id', async (req, res) => {
  try {
    console.log("a")
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
      console.log("a")
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
      const trip = tripData.get({ plain: true });
      console.log("a")
      res.render('edit-trip', { trip, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
    } else {
      res
        .status(500)
        .json({ message: 'There was an error while adding the destination' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const destination_id=req.params.id;
  if (req.session.loggedIn) {
    const destination = await Destination.findOne({
      where: { id: destination_id },
    });
    if (destination) {
      const tripId = destination.trip_id;
      //try {
      const destDelete = await Destination.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json("successfully deleted "+destination_id);
    }
  } else {
    res.status(401)
  }
});


module.exports = router;
