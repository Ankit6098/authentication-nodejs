// imported necessary modules
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
require('dotenv').config();

// set up session cookie
const session = require('express-session');

// set up passport
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth-strategy');
const passportGithub = require('./config/passport-github2-startegy');

// set up the database
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');

// set up middleware
app.use(express.urlencoded());

// set up static files
app.use(express.static('assets'));

// set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'nodejs-authentication',
    // TODO change the secret before deployment in production mode
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: process.env.mongoUrl,
        autoRemove: 'disabled'
    })
}));

// set up flash messages
app.use(flash());
app.use(customMware.setFlash);

// set up passport
app.use(passport.initialize());
app.use(passport.session());

// set up passport local strategy
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

// server listens on port 3000 for incoming connections
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});