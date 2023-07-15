const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set up static files
app.use(express.static('assets'));

// set up middleware
app.use(express.urlencoded());

// use express router
app.use('/', require('./routes'));

// server listens on port 3000 for incoming connections
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});