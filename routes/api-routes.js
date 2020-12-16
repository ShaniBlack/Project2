// Requiring our models and passport as we've configured it
const db = require('../models')
const passport = require('../config/passport')
    // const Post = require('../models/traveler.js')

module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the traveler has valid login credentials, send them to the members page.
    // Otherwise the traveler will be sent an error
    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        // Sending back a password, even a hashed password, isn't a good idea
        console.log(req.user.email)
        res.json({
            email: req.user.email,
            id: req.user.id
        })
    })
    app.get('/api/posts/:traveler', function(req, res) {
        db.Post.findAll({
            where: {
                name: req.params.traveler
            }
        }).then(function(results) {
            res.json(results)
        })
    })
    app.get('/api/posts/:traveler', function(req, res) {
        db.Post.findOne({
            where: {
                name: req.params.traveler
            }
        }).then(function(results) {
            console.log(results)
            res.json(results)
        })
    })

    // Route for signing up a traveler. The traveler's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize Traveler Model. If the traveler is created successfully, proceed to log the traveler in,
    // otherwise send back an error
    app.post('/api/signup', (req, res) => {
        db.Traveler.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(() => {
                res.redirect(307, '/api/login')
            })
            .catch(err => {
                res.status(401).json(err)
            })
    })

    // Route for logging traveler out
    app.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

    // Route for getting some data about our traveler to be used client side
    app.get('/api/traveler_data', (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({})
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                name: req.user.name,
                email: req.user.email,
                id: req.user.id
            })
        }
    })

    app.get('/api/user_data', (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({})
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                name: req.user.name,
                email: req.user.email,
                id: req.user.id
            })
        }
    })
}