const Auth  = require('./controllers/auth');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = (app) => {
  app.post('/', requireAuth, (req, res) => res.send('Authenticated user'));
  app.post('/signin', requireSignin, Auth.signin);
  app.post('/signup', Auth.signup);
}
