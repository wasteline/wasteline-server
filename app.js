require('dotenv').config()
var express = require('express');
// var path = require('path');
var bodyParser = require('body-parser');
var router = require('./router.js');

var app = express();
// var IP = process.env.IP || 'localhost';
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(router);

app.listen(port, function () {
  console.log('listening to port', port);
});
