// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending travelers to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================

const isAuthenticated = require('../config/middleware/isAuthenticated')

// Routes
// =============================================================
module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render('welcome')
  })
  app.get('/login', (req, res) => {
    if (req.user) {
      res.render('members')
    }
    res.render('login')
  })
  app.get('/signup', (req, res) => {
    if (req.user) {
      res.render('login')
    }
    res.render('signup')
  })
  app.get('/members', isAuthenticated, (req, res) => {
    res.render('members')
  })
  app.post('/members', isAuthenticated, (req, res) => {
    res.render('members')
  })
  app.get('/cms', (req, res) => {
    res.render('cms')
  })
  app.get('/blog', (req, res) => {
    res.render('blog')
  })
  app.get('/travelers', (req, res) => {
    res.render('travelers')
  })
}
