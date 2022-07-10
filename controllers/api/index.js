const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
const destinationRoutes = require('./destinationRoutes');
const documentRoutes = require('./documentRoutes');

router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/destinations', destinationRoutes);
router.use('/documents', documentRoutes);

module.exports = router;
