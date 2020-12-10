// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require('path')

const isAuthenticated = require('../config/middleware/isAuthenticated')

// Routes
// =============================================================
module.exports = function (app) {
  app.get('/', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members')
    }
    res.sendFile(path.join(__dirname, '../public/signup.html'))
  })

  app.get('/login', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members')
    }
    res.sendFile(path.join(__dirname, '../public/login.html'))
  })

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/members', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/members.html'))
  })
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  // app.get("/journal", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/journal.html"));
  // });

  // cms route loads cms.html
  app.get('/post', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/post.html'))
  })

  // blog route loads blog.html
  app.get('/blog', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/blog.html'))
  })

  // s route loads-manager.html
  app.get('/travelers-travel', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/travelers-travel.html'))
  })
}
