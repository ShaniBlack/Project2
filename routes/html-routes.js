// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================

const isAuthenticated = require('../config/middleware/isAuthenticated')

// Routes
// =============================================================
module.exports = function (app) {
  // app.get('/signup', (req, res) => {
  //     // If the user already has an account send them to the members page
  //     if (req.user) {
  //         res.redirect('/members')
  //     }
  //     res.sendFile(path.join(__dirname, '../public/signup.html'))
  // })

  // app.get('/login', (req, res) => {
  //     // If the user already has an account send them to the members page
  //     if (req.user) {
  //         res.redirect('/members')
  //     }
  //     res.sendFile(path.join(__dirname, '../public/login.html'))
  // })

  // // Here we've add our isAuthenticated middleware to this route.
  // // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get('/members', isAuthenticated, (req, res) => {
  //         res.sendFile(path.join(__dirname, '../public/members.html'))
  //     })
  //     // Each of the below routes just handles the HTML page that the user gets sent to.

  // // index route loads view.html
  // // app.get("/journal", function(req, res) {
  // //   res.sendFile(path.join(__dirname, "../public/journal.html"));
  // // });

  // // cms route loads cms.html
  // app.get('/cms', function(req, res) {
  //     res.sendFile(path.join(__dirname, '../public/cms.html'))
  // })

  // // blog route loads blog.html
  // app.get('/blog', function(req, res) {
  //     res.sendFile(path.join(__dirname, '../public/blog.html'))
  // })

  // // s route loads-manager.html
  // app.get('/travelers', function(req, res) {
  //     res.sendFile(path.join(__dirname, '../public/traveler-manager.html'))
  // })

  // app.get('/', function(req, res) {
  //     res.sendFile(path.join(__dirname, '../public/welcome.html'))
  // })
  app.get('/', (req, res) => {
    res.render('welcome')
  })
  app.get('/login', (req, res) => {
    if (req.user) {
      res.redirect('/cms')
    }
    res.render('login')
  })
  app.get('/signup', (req, res) => {
    if (req.user) {
      res.redirect('/cms')
    }
    res.render('signup')
  })
  app.get('/members', isAuthenticated, (req, res) => {
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
