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

const express = require('express');
const formidable = require('formidable');
const fs = require('fs')
const app = express();

app.get('/', (req, res) => {
    res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="filetoupload" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

app.post('/api/upload', (req, res, next) => {
    const form = formidable({
        multiples: true
    });
    form.parse(req, (err, fields, files) => {
        console.log("fields:" + fields.title)
        console.log(JSON.stringify(files.filetoupload, null, '\t'))

        const oldpath = files.filetoupload.path
        const newpath = '../file_uploads/' + files.filetoupload.name
        console.log(newpath)
        fs.rename(oldpath, newpath, function(err) {
            if (err) throw err;
        });
        if (err) {
            next(err);
            return;
        }
        console.log('File uploaded and moved!');
        res.json({
            fields,
            files
        });
    });
});

app.listen(9000, () => {
    console.log('Server listening on http://localhost:9000 ...');
});

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