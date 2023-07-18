const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.welcome = function(req, res) {
    res.render('home', {
        title: 'NodeJS Authentication'
    });
}

// Function to sign in user using session 
module.exports.createSession = async function(req, res) {
    if (req.user) {
        console.log("logged in successfully");
    } else {
        console.log("invalid username/password");
    }

    return res.redirect('/user/welcome');
}



// Function to sign out and destroy session
module.exports.destroySession = function(req, res) {
    req.logout(function(error) {
        if (error) {
            console.log("error signing out");
            // req.flash('error', 'Something went wrong!');
            return;
        }
    });
    // req.flash('success', 'Logged Out');
    console.log("logged out successfully");
    return res.redirect('/');
    
}

module.exports.signup = function(req, res) {
    // if(req.isAuthenticated()) {
    //     return res.redirect('/user/welcome');
    // }

    return res.render('user_sign_up', {
        title: 'register'
    });
}

// const User = require('../models/user');

module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirmPassword) {
        console.log('Passwords do not match!');
        return res.redirect('back');
    }

    // find user if exists
    const user = await User.findOne({email: req.body.email});

    // if doesn't exist, create user
    // if (!user) {

    //     const password = req.body.password;

    //     // hashing password
    //     const newUser = await User.create(req.body);
    //     console.log('New user created!');
    //     return res.redirect('/')
    // } else {
    //     console.log('User already exists!');
    //     return res.redirect('back');
    // }

    if (!user) {
        const plaintextPassword = req.body.password;
        const saltRounds = 10;
      
        // Generate a hash of the password
        bcrypt.hash(plaintextPassword, saltRounds, async (err, hash) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Error creating user');
          }
      
          try {
            const newUser = await User.create({
              ...req.body,
              password: hash // Store the hashed password in the database
            });
            console.log('New user created!');
            return res.redirect('/');
          } catch (err) {
            console.error(err);
            return res.status(500).send('Error creating user');
          }
        });
      } else {
        console.log('User already exists!');
        return res.redirect('back');
      }

    // redirect to login page
    // return res.redirect('/');
}