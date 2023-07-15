const exprerss = require('express');
const router = exprerss.Router();

const loginController = require('../controllers/loginController');

router.get('/', loginController.login);

module.exports = router;