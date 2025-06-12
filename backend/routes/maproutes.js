const express = require('express');
const router = express.Router();
const controller = require('../controllers/map_controller.js');
const authMiddleware = require('../middleware/auth_middleware.js');

router.get('/get-cordinates',  controller.getCoordinates);
router.get('/get-distance-time',controller.getDistanceAndTime);
router.get('/get-suggestions',controller.getSuggestions);

module.exports = router;
