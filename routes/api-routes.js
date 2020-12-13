// Requiring our models and passport as we've configured it
const db = require('../models')
const passport = require('../config/passport')

module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        })
    })

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post('/api/signup', (req, res) => {
        db.User.create({
                email: req.body.email,
                password: req.body.password
            })
            .then(() => {
                res.redirect(307, '/api/login')
            })
            .catch(err => {
                res.status(401).json(err)
            })
    })

    // Route for logging user out
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

    // Route for getting some data about our user to be used client side
    app.get('/api/user_data', (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({})
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            })
        }
    })
}