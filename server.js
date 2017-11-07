////////////////////////
// Set Up
// Get all the tools we need
///////////////////////

const cookieParser = require('cookie-parser'),
      bodyParser   = require('body-parser'),
      mongoose     = require('mongoose'),
      passport     = require('passport'),
      session      = require('express-session'),
      express      = require('express'),
      morgan       = require('morgan'),
      flash        = require('connect-flash'),
      port         = process.env.PORT || 8080,
      app          = express();

const configDB = require('./config/database.js');


//////////////////////////////
// Configuration
/////////////////////////////

mongoose.connect(configDB.url) // Connect to our database

require('./config/passport')(passport); // pass passport for configuration


//////////////////////////////
// Express Setup
/////////////////////////////

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookeis (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'asdf40j3nas.dj212jasdf0cj012;!@$a9df%'
}))
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash message stored in the session


/////////////////////////////////
// Routes
////////////////////////////////

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


//////////////////////////////
// Launch
/////////////////////////////
app.listen(port);
console.log('the magic happens on ' + port)