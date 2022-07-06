const router = require("express").Router();
const {
  User,
  Trip,
  Destination,
  Document,
  DocumentType,
} = require("../models");



// create new trip
router.post("/trip", async (req, res) => {
  try {
    const tripData = await Post.create({
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

// update a trip by id
router.put("/trip/:id", async (req, res) => {
  try {
    const tripData = await Trip.update(
      {
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (tripData) {
      res.status(201).json({ id: req.params.id });
    } else {
      res
        .status(500)
        .json({ message: "There was an error while updating the trip" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a trip by id
router.delete("/trip/:id", async (req, res) => {
  try {
    const tripData = await Trip.destroy({ where: { id: req.params.id } });
    if (tripData) {
      res.status(200).json(tripData);
    } else {
      res.status(404).json({ message: "No trip was found with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new trip page
router.get("/post", async (req, res) => {
  const trip = { name: "", user_id: req.session.user_id };
  res.render("create-trip", { post, loggedIn: req.session.loggedIn });
});

// get existing trip for edit by id
router.get("/trip/:id", async (req, res) => {
  try {
    const tripData = await Trip.findOne({
      where: { id: req.params.id },
      attributes: ["name", "date_start", "date_end"],
    });
    if (tripData) {
      const trip = tripData.get({ plain: true });
      res.render("edit-trip", { trip, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).json({ message: "No trip found with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
