var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var app = express();
var api = require('./router').apiRouter;

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(__dirname + '/../client'));


var apiRouter = express.Router();

// redirect all requests coming through /api to routers/apiRoutes.js
app.use('/api', apiRouter);
api(apiRouter);

console.log('Listening on port:', port);
app.listen(port);
