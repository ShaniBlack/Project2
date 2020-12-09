const db = require('../models')

module.exports = function (app) {
  app.get('/api/travelers', function (req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Traveler.findAll({
      include: [db.Post]
    }).then(function (dbTraveler) {
      res.json(dbTraveler)
    })
  })

  app.get('/api/travelers/:id', function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Traveler.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function (dbTraveler) {
      res.json(dbTraveler)
    })
  })

  app.post('/api/travelers', function (req, res) {
    db.Traveler.create(req.body).then(function (dbTraveler) {
      res.json(dbTraveler)
    })
  })

  app.delete('/api/travelers/:id', function (req, res) {
    db.Traveler.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTraveler) {
      res.json(dbTraveler)
    })
  })
}
