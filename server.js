const morgan = require('morgan') // Requiring necessary npm packages
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



// create "middleware"
app.use(morgan('combined'))

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

/// //file uploads////
// const http = require('http')
// const formidable = require('formidable')
// const fs = require('fs')

// http.createServer(function(req, res) {
//     if (req.url === '/fileupload') {
//         const form = new formidable.IncomingForm()
//         form.parse(req, function(_err, fields, files) {
//             const oldpath = files.filetoupload.path
//             const newpath = './Assets/file_uploads' + files.filetoupload.name
//             fs.rename(oldpath, newpath, function(err) {
//                 if (err) throw err
//                 res.write('File uploaded and moved!')
//                 res.end()
//             })
//         })
//     } else {
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         })
//         res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
//         res.write('<input type="file" name="filetoupload"><br>')
//         res.write('<input type="submit">')
//         res.write('</form>')
//         return res.end()
//     }
// }).listen(9000)

// const express = require('express');
// const formidable = require('formidable');
// const fs = require('fs')
// const app = express();

// app.get('/', (req, res) => {
//     res.send(`
//     <h2>With <code>"express"</code> npm package</h2>
//     <form action="/api/upload" enctype="multipart/form-data" method="post">
//       <div>Text field title: <input type="text" name="title" /></div>
//       <div>File: <input type="file" name="filetoupload" multiple="multiple" /></div>
//       <input type="submit" value="Upload" />
//     </form>
//   `);
// });

// app.post('/api/upload', (req, res, next) => {
//     const form = formidable({
//         multiples: true
//     });
//     form.parse(req, (err, fields, files) => {
//         console.log("fields:" + fields.title)
//         console.log(JSON.stringify(files.filetoupload, null, '\t'))

//         const oldpath = files.filetoupload.path
//         const newpath = 'public/assets/file_uploads/' + files.filetoupload.name
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

// app.listen(9000, () => {
//     console.log('Server listening on http://localhost:9000 ...');
// });

// export interface File {
//   // The size of the uploaded file in bytes.
//   // If the file is still being uploaded (see `'fileBegin'` event),
//   // this property says how many bytes of the file have been written to disk yet.
//   file.size: number;

//   // The path this file is being written to. You can modify this in the `'fileBegin'` event in
//   // case you are unhappy with the way formidable generates a temporary path for your files.
//   file.path: string;

//   // The name this file had according to the uploading client.
//   file.name: string | null;

//   // The mime type of this file, according to the uploading client.
//   file.type: string | null;

//   // A Date object (or `null`) containing the time this file was last written to.
//   // Mostly here for compatibility with the [W3C File API Draft](http://dev.w3.org/2006/webapi/FileAPI/).
//   file.lastModifiedDate: Date | null;

//   // If `options.hash` calculation was set, you can read the hex digest out of this var.
//   file.hash: string | 'sha1' | 'md5' | 'sha256' | null;
// }
/// //file uploads////

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