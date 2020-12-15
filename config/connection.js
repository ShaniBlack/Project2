const mysql = require('mysql')

if (process.env.JAWSDB_URL) {
  // eslint-disable-next-line no-use-before-define
  connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
  // eslint-disable-next-line no-var
  var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootroot',
    database: 'travelbookDB'
  })
};

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})

module.exports = connection
