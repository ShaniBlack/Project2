const http = require('http')
const formidable = require('formidable')
const fs = require('fs')

http.createServer(function(req, res) {
    if (req.url === '/fileupload') {
        const form = new formidable.IncomingForm()
        form.parse(req, function(err, fields, files) {
            const oldpath = files.filetoupload.path
            const newpath = './Assets/file_uploads' + files.filetoupload.name
            fs.rename(oldpath, newpath, function(err) {
                if (err) throw err
                res.write('File uploaded and moved!')
                res.end()
            })
        })
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
        res.write('<input type="file" name="filetoupload"><br>')
        res.write('<input type="submit">')
        res.write('</form>')
        return res.end()
    }
}).listen(9000)

// const express = require('express');
// const formidable = require('formidable');

// const app = express();

// app.get('/', (req, res) => {
//   res.send(`
//     <h2>With <code>"express"</code> npm package</h2>
//     <form action="/api/upload" enctype="multipart/form-data" method="post">
//       <div>Text field title: <input type="text" name="title" /></div>
//       <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
//       <input type="submit" value="Upload" />
//     </form>
//   `);
// });

// app.post('/api/upload', (req, res, next) => {
//   const form = formidable({ multiples: true });

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.json({ fields, files });
//   });
// });

// app.listen(9000, () => {
//   console.log('Server listening on http://localhost:9000 ...');
// });