var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var router = express.Router();

app.use('/api', router);

console.log('Listening on port:', port);
app.listne(port);