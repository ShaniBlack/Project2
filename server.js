// Requiring necessary npm packages
const express = require('express')
const session = require('express-session')
    // Requiring passport as we've configured it
const passport = require('./config/passport')
    // const path = require('path')

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080
const db = require('./models')

// import express - handlebars

// Creating express app and configuring middleware needed for authentication
const app = express()
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())
app.use(express.static('public'))

/// /-----------HANDLEBARS---------//////////////////////////////////////////////////////////////
// express-handlebars engine setup
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// We need to use sessions to keep track of our user's login status
// Import routes and give the server access to them.

// const routes = require('./controllers/ltbController.js')

// app.use(routes)

// app.get('/', (req, res) => {
//         // Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
//         res.render('login')
//     })
// app.set('views', path.join(__dirname, 'views'));
/// /------^^^^^HANDLEBARS^^^^^------//////////////////////////////

app.use(
    session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
    })
)
app.use(passport.initialize())
app.use(passport.session())

// // Requiring our routes
require('./routes/html-routes.js')(app)
require('./routes/api-routes.js')(app)
require('./routes/post-api-routes.js')(app)
require('./routes/traveler-api-routes.js')(app)

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({
    force: false
}).then(() => {
    app.listen(PORT, () => {
        console.log(
            '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
            PORT,
            PORT
        )
    })
})