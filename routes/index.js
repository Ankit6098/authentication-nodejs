const express = require('express');
const router = express.Router();

const welcomeController = require('../controllers/welcomeController');
const usersController = require('../controllers/usersController');
const dashboardController = require('../controllers/dashboardController');

router.get('/', welcomeController.welcome);
router.get('/authentication', usersController.signinsignout);
router.use('/user' , require('./signin-signout'));
router.use('/dashboard' , require('./dashboard'));

module.exports = router;