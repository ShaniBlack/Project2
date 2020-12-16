const db = require('../models')

// Routes
// =============================================================
module.exports = function(app) {
    // GET route for getting all of the posts author
    app.get('/api/journals', function(req, res) {
        const query = {}
        if (req.query.traveler_id) {
            query.TravelerId = req.query.traveler_id
        }
        db.Journal.findAll({
            where: query,
            include: [db.Traveler]
        }).then(function(dbJournal) {
            res.json(dbJournal)
        })
    })

    // Get route for retrieving a single Journal
    app.get('/api/journals/:id', function(req, res) {
        db.Journal.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Traveler]
        }).then(function(dbJournal) {
            console.log(dbJournal)
            res.json(dbJournal)
        })
    })

    // POST route for saving a new post
    app.post('/api/journals', function(req, res) {
        db.Post.create(req.body).then(function(dbJournal) {
            res.json(dbJournal)
        })
    })

    // DELETE route for deleting journals
    app.delete('/api/journals/:id', function(req, res) {
        db.Journal.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbJournal) {
            res.json(dbJournal)
        })
    })

    // PUT route for updating journals
    app.put('/api/journals', function(req, res) {
        db.Journal.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbJournal) {
            res.json(dbJournal)
        })
    })
}