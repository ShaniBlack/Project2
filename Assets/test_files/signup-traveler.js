app.post('/api/signup', (req, res) => {
    console.log("pizzapizza")
    db.Traveler.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then((data) => {
            app.get('/api/travelers/' + data.id, function(req, res) {
                // Find one Author with the id in req.params.id and return them to the traveler with res.json
                db.Traveler.findOne({
                    where: {
                        id: req.params.id
                    },
                }).then(function(dbTraveler) {
                    console.log("dbtraveler", dbTraveler)
                    console.log("traveler id", dbTraveler.id)
                    res.json(dbTraveler)
                }).then(() => {

                    res.sendStatus(200, )
                })
            })
        })
        .catch(err => {
            res.status(401).json(err)
        })
})