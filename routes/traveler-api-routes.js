var db = require("../models");

module.exports = function(app) {
  // Find all Authors and return them to the user with res.json
  app.get("/api/travelers", function(req, res) {
    db.Traveler.findAll({
      include: [db.Post]
    }).then(function(dbTraveler) {
      res.json(dbTraveler);
    });
  });

  app.get("/api/travelers/:id", function(req, res) {
    // Find one Author with the id in req.params.id and return them to the user with res.json
    db.Traveler.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbTraveler) {
      res.json(dbTraveler);
    });
  });

  app.post("/api/travelers", function(req, res) {
    // Create an Author with the data available to us in req.body
    console.log(req.body);
    db.Traveler.create(req.body).then(function(dbTraveler) {
      res.json(dbTraveler);
    });
  });

  app.delete("/api/travelers/:id", function(req, res) {
    // Delete the Author with the id available to us in req.params.id
    db.Traveler.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTraveler) {
      res.json(dbTraveler);
    });
  });

};
