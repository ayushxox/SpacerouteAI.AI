// /server/routes/gameRoutes.js

const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Define routes and associate them with the controller functions
router.post('/start', gameController.startGame);
router.post('/hint', gameController.getHint);
router.post('/score', gameController.submitAnswer);

module.exports = router;