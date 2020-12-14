// Requiring our models and passport as we've configured it
const db = require('../models')
const passport = require('../config/passport')

module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the traveler has valid login credentials, send them to the members page.
    // Otherwise the traveler will be sent an error
    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.traveler.email,
            id: req.traveler.id
        })
    })

    // Route for signing up a traveler. The traveler's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize Traveler Model. If the traveler is created successfully, proceed to log the traveler in,
    // otherwise send back an error
    app.post('/api/signup', (req, res) => {
        db.Traveler.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(() => {
                res.redirect(307, '/members')
            })
            .catch(err => {
                res.status(401).json(err)
            })
    })

    // Route for logging traveler out
    app.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

    // app.post('/api/upload', (req, res, next) => {
    //     const form = formidable({
    //         multiples: true
    //     });
    //     form.parse(req, (err, fields, files) => {
    //         console.log("fields:" + fields.title)
    //         console.log(JSON.stringify(files.filetoupload, null, '\t'))

    //         const oldpath = files.filetoupload.path
    //         const newpath = 'assets/file_uploads/' + files.filetoupload.name
    //         console.log(newpath)
    //         fs.rename(oldpath, newpath, function(err) {
    //             if (err) throw err;
    //         });
    //         if (err) {
    //             next(err);
    //             return;
    //         }
    //         console.log('File uploaded and moved!');
    //         res.json({
    //             fields,
    //             files
    //         });
    //     });
    // });

    // Route for getting some data about our traveler to be used client side
    app.get('/api/traveler_data', (req, res) => {
        if (!req.traveler) {
            // The traveler is not logged in, send back an empty object
            res.json({})
        } else {
            // Otherwise send back the traveler's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                name: req.traveler.name,
                email: req.traveler.email,
                id: req.traveler.id
            })
        }
    })
}