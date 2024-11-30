require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();
var mysql = require('mysql');

// Create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});
connection.connect();

app.use(cors());

app.get('/hello', function (req, res, next) {
  res.json({ msg: 'hello world' });
});

app.get('/users', async function (req, res, next) {
  connection.query('SELECT * FROM user', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000');
});
