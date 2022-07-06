const router = require("express").Router();
const { Trip } = require("../../models");
const isAuth = require("../../utils/auth");

// create new trip
router.post("/trip", async (req, res) => {
    try {
      const tripData = await Trip.create({
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        user_id: req.session.user_id,
      });
      const trip = tripData.get({ plain: true });
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