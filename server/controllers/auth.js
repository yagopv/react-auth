const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).send({ error: 'You must provide an email and a password' });
  }

  User.findOne({ email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(422).send({ error: 'Email is in use' })
      }
      
      const newUser = new User({ email, password });
      newUser.save()
        .then((user) => res.status(200).send({ token: createToken(user) }))
        .catch(err => res.status(400).send({ error: err }))
    })
    .catch(err => res.status(400).send({ error: err }));
}

exports.signin = (req, res, next) => {
    res.send({ token: createToken(req.user) });
}

function createToken (user) {
  return jwt.encode({ sub: user.id, iat: new Date().getTime() }, config.secret);
}

function decodeToken (token) {
  return jwt.decode(token, config.secret);
}