var express = require("express");
var router = express.Router();

// Import the models to use its database functions.
var index = require("../models/index.js");
var journal = require("../models/journal.js");
var location = require("../models/location.js");
var post = require("../models/post.js");
var traveler = require("../models/traveler.js");
var user = require("../models/user.js");

// router.get('/', function(req, res) {
//     res.render('main', {
//         layout: '../login'
//     });
// });
// Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//     cat.all(function(data) {
//         var hbsObject = {
//             cats: data
//         };
//         console.log(hbsObject);
//         res.render("index", hbsObject);
//     });
// });

router.post("/api/cats", function(req, res) {
    cat.create([
        "name", "sleepy"
    ], [
        req.body.name, req.body.sleepy
    ], function(result) {
        // Send back the ID of the new quote
        res.json({
            id: result.insertId
        });
    });
});

router.put("/api/cats/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    cat.update({
        sleepy: req.body.sleepy
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/cats/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    cat.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;