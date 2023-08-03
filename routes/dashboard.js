const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
const passport = require('passport');

router.get('/', passport.checkAuthentication, dashboardController.dashboard);

module.exports = router;