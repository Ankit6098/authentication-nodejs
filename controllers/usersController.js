const User = require('../models/user');
const bcrypt = require('bcrypt');
const signupMailer = require('../mailers/signup_mailer');

module.exports.signinsignout = async function(req, res) {
    try {
      if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
      }
      return res.render('signin-signout', {
        title: 'Sign In | Sign Up',
      });
    } catch (err) {
      console.log('Error', err);
      return;
    }
}

// create session
module.exports.createSession = async function(req, res) {
    console.log("create session");
    if (req.user) {
    //   req.flash('success', 'Logged In');
        console.log("logged in successfully");
    } else {
    //   req.flash('error', 'Invalid Username/Password');
        console.log("invalid username/password");
    }
  
    return res.redirect('/dashboard');
}

// destroy session
module.exports.destroySession = function(req, res) {
    req.logout(function(error) {
      req.session.destroy();
        if (error) {
            // req.flash('error', 'Something went wrong!');
            return;
        }
    });
    // req.flash('success', 'Logged Out');
    return res.redirect('/');
}

// create user
module.exports.create = async function(req, res) {
    // check if password and confirm_password are same
    if (req.body.password != req.body.confirmPassword) {
        console.log('password and confirm_password are not same');
        return res.redirect('back');
    }

    // check if user already exists
    const user = await User.findOne({ email: req.body.email });

    // if user does not exist, create user
    // if (!user) {
    //     // create user
    //     User.create(req.body)
    //     .then(user => {
    //         console.log('user created successfully');
    //         return res.redirect('/');
    //     })
    //     .catch(err => {
    //         console.log('error in creating user while signing up');
    //         return;
    //     });
    // }
    // else {
    //     console.log('user already exists');
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
            signupMailer.signupWelcome(newUser);
            return res.redirect('back');
          } catch (err) {
            console.error(err);
            return res.status(500).send('Error creating user');
          }
        });
      } else {
        console.log('User already exists!');
        req.flash('info', 'User already exists!');
        return res.redirect('back');
    }
}