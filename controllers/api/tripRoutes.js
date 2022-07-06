const router = require("express").Router();
const { Trip } = require("../../models");
const isAuth = require("../../utils/auth");



router.post("/", async (req, res) => {
    if (req.session.loggedIn = true) {
        try {
            const tripData = await Trip.create({
                name: req.body.name,
                date_start: req.body.date_start,
                date_end: req.body.date_end
            });
            console.log(tripData)
            res.status(200).json(tripData);
        }
        catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    }
});
