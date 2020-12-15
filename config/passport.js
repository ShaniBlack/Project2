const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const db = require('../models')

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our traveler will sign in using an email, rather than a "username"
    {
      usernameField: 'email'
    },
    (email, password, done) => {
      // When a traveler tries to sign in this code runs
      db.Traveler.findOne({
        where: {
          email: email
        }
      }).then(dbTraveler => {
        // If there's no traveler with the given email
        if (!dbTraveler) {
          return done(null, false, {
            message: 'Incorrect email.'
          })
        } else if (!dbTraveler.validPassword(password)) {
          // If there is a traveler with the given email, but the password the traveler gives us is incorrect

          return done(null, false, {
            message: 'Incorrect password.'
          })
        }
        // If none of the above, return the traveler
        return done(null, dbTraveler)
      })
    }
  )
)

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the traveler
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((traveler, cb) => {
  cb(null, traveler)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

// Exporting our configured passport
module.exports = passport
