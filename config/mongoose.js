// require the library
const mongoose = require('mongoose');
require('dotenv').config();

// connect to the database
mongoose.connect(process.env.mongoUrl);

// acquire the connection (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the message
db.once('open', () => {
    console.log('successfully connected to database');
});