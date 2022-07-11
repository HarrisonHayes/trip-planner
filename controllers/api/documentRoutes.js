const router = require('express').Router();
const { Trip, User, Destination, Document } = require('../../models');
const isAuth = require('../../utils/auth');

// add a document
router.post('/', async (req, res) => {
  //try {
  const documentData = await Document.create({
    name: req.body.name,
    type: req.body.type,
    content: req.body.contents,
    destination_id: req.body.destination_id,
  });
  res.render('close-window');
  //} catch (err) {
  //  res.status(500).json(err);
  //}
});

router.get('/delete/:id', async (req, res) => {
  const params = req.params.id.split('.');
  if (params.length == 2) {
    const document_id = params[0];
    const destination_id = params[1];
    if (req.session.loggedIn) {
      const document = await Document.findOne({
        where: { id: document_id, destination_id: destination_id },
      });

      const destination = await Destination.findOne({
        where: { id: destination_id },
      });
      const trip_id = destination.trip_id;
      if (document) {
        const docDelete = await Document.destroy({
          where: { id: document_id },
        });
      }
      const tripData = await Trip.findOne({
        where: { id: trip_id, user_id: req.session.user_id },
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
              },
            ],
          },
        ],
      });
      const trip = tripData.get({ plain: true });
      res.render('edit-trip', {
        trip,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
      // } catch (err) {
      //   res.status(500).json(err);
      // }
    } else {
      res.render('login');
    }
  }
});

module.exports = router;
