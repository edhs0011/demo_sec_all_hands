var express = require('express');
var app = express();
var mysql = require('mysql');
var path    = require("path");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'demo'
});
connection.connect();

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/count.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/api', function (req, res) {
  connection.query('SELECT COUNT(*) AS count FROM hit_count WHERE DATE_SUB(NOW(), INTERVAL 1 HOUR)', function(err, rows) {
    if (err) throw err;
    console.log('Query respond');
    res.send({count: rows[0].count});
  });
});

app.post('/api', function (req, res) {
  connection.query('INSERT INTO hit_count SET ?', {time: new Date()}, function(err, result) {
    if (err) throw err;
    console.log('inserted');
  });
  res.send('OK\n');
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
