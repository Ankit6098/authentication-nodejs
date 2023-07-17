const exprerss = require('express');
const router = exprerss.Router();

// const usersController = require('../controllers/usersController');
const usersController = require('../controllers/userController')
const homeController = require('../controllers/homeController')

router.get('/', homeController.home);
router.use('/user', require('./users'));

module.exports = router;