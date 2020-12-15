// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// const express = require('express');
const formidable = require('formidable')
const fs = require('fs')
// const app = express();
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
  // app.post('/api/posts', function(req, res) {
  //     db.Post.create(req.body).then(function(dbPost) {
  //         res.json(dbPost)
  //     })
  // })

  app.post('/api/upload', (req, res, next) => {
    const form = formidable({
      multiples: true
    })
    form.parse(req, (err, fields, files) => {
      console.log(fields)
      console.log('fields:' + fields.imgTitle)
      console.log(JSON.stringify(files.filetoupload, null, '\t'))
      console.log(req.user.id)

      const oldpath = files.filetoupload.path
      const newpath = 'public/assets/file_uploads/' + files.filetoupload.name
      console.log(newpath)

      db.Post.create({
        title: fields.postTitle,
        country: fields.country,
        city: fields.city,
        lodging: fields.lodging,
        ratings: fields.ratings,
        activities: fields.activities,
        body: fields.body,
        imgTitle: fields.imgTitle,
        imageUrl: newpath,
        TravelerId: req.user.id
      })

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err
      })
      if (err) {
        next(err)
        return
      }
      console.log('Image uploaded and moved!')
      console.log('Post added to your Journal!')
      console.log('taking you to the blog!')
      res.redirect('/blog')
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
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function (dbPost) {
      res.json(dbPost)
    })
  })
}
