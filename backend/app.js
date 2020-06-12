var express = require('express'),
  session = require('express-session'),
  passport = require('passport'),
  swig = require('swig'),
  SpotifyStrategy = require('passport-spotify').Strategy;
  //SpotifyStrategy = require('../../lib/passport-spotify/index').Strategy;

var consolidate = require('consolidate');

var appKey = 'bb200fb215c346448b3c34bbccaac25d';
var appSecret = '0902db0eb5274d4a8f3ec07d3d00d2c8';

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, expires_in
//   and spotify profile), and invoke a callback with a user object.
passport.use(
  new SpotifyStrategy(
    {
      clientID: appKey,
      clientSecret: appSecret,
      callbackURL: 'http://localhost:3000/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);

var app = express();

// configure Express
app.set('views', __dirname + '/views');




app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

app.engine('html', consolidate.swig);

app.get('/', function(req, res) {
  res.render('index.html', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res) {
  res.render('account.html', { user: req.user });
});

app.get('/login', function(req, res) {
  res.render('login.html', { user: req.user });
});


app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  }),
  function(req, res) {
 
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
)

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

 app.listen(8888, () => {
     console.log("Listening at :3000...");
 });


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}