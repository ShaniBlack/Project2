// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
const db = require('../models')

// Routes
// =============================================================
module.exports = function (app) {
  // GET route for getting all of the posts author
  app.get('/api/posts', function (req, res) {
    const query = {}
    if (req.query.traveler_id) {
      query.TravelerId = req.query.traveler_id
    }
    db.Post.findAll({
      where: query,
      include: [db.Traveler]
    }).then(function (dbPost) {
      res.json(dbPost)
    })
  })

  // Get route for retrieving a single post
  app.get('/api/posts/:id', function (req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Traveler]
    }).then(function (dbPost) {
      console.log(dbPost)
      res.json(dbPost)
    })
  })

  // POST route for saving a new post
  app.post('/api/posts', function (req, res) {
    db.Post.create(req.body).then(function (dbPost) {
      res.json(dbPost)
    })
  })

  // DELETE route for deleting posts
  app.delete('/api/posts/:id', function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbPost) {
      res.json(dbPost)
    })
  })

  // PUT route for updating posts
  app.put('/api/posts', function (req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbPost) {
      res.json(dbPost)
    })
  })
}