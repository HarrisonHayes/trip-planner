const router = require("express").Router();
const { Trip } = require("../../models");
const isAuth = require("../../utils/auth");

// create new trip
router.post("/", async (req, res) => {
    console.log(req.body.name,req.body.date_start,req.body.date_end,req.session.user_id)
    try {
      const tripData = await Trip.create({
        name: req.body.name,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
        user_id: req.session.user_id
      });

      const trip = tripData.get({ plain: true });
      console.log(trip, tripData)
      if (tripData) {
        res.status(201).json({ id: trip.id });
      } else {
        res
          .status(500)
          .json({ message: "There was an error while creating the trip" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;