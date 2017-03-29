var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);

var mongoose = require('mongoose');

//configure the app
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://admin:admin@ds145220.mlab.com:45220/contentstoredb');

var Content = require(path.join(__dirname, './models/Content.js'))(mongoose);

//routing in duedate-calculator.js
require(path.join(__dirname, './routes/content.js')).contentManager(app, Content);

//create server
http.listen(app.get('port'), function() {
    console.log('content-store listening on localhost:' + app.get('port'));
});