const exprerss = require('express');
const router = exprerss.Router();
// const passport = require('passport');

const usersController = require('../controllers/userController');
const passport = require('passport');

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/'},
), usersController.createSession);

router.get('/welcome', passport.checkAuthentication, usersController.welcome);
router.get('/sign-up', usersController.signup)
router.post('/create-user', usersController.create)
router.get('/sign-out', usersController.destroySession)

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/oauth2callback', passport.authenticate('google', {successRedirect: '/user/welcome', failureRedirect: '/'}), usersController.createSession);

router.get('/auth/github', passport.authenticate('github', {scope: ['profile', 'email']}));
router.get('/auth/github/callback', passport.authenticate('github', {successRedirect: '/user/welcome', failureRedirect: '/'}), usersController.createSession);

module.exports = router;