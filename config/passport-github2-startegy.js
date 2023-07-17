require('dotenv').config();
const passport = require('passport');
const githubStrategy = require('passport-github2').Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for github login
passport.use(new githubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async function(request, accessToken, refreshToken, profile, done) {
        const user = await User.findOne({email: profile.emails[0].value});

        if (!user) {
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            console.log('New user created!');
            return done(null, newUser);
        }

        return done(null, user);
    }
));

// serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user);
});

// deserialize the user from the key in the cookies
passport.deserializeUser(function(user, done) {
    done(null, user);
});
