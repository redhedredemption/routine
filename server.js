const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify the token and assign the user object to req.user
app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/routines', require('./routes/api/routines'));
app.use('/api/exercises', require('./routes/api/exercises'));
app.use('/api/medications', require('./routes/api/medications'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});