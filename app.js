var express = require('express');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var models = require('./models');

var router = require('./routes');

var app = express(),
    PORT = 3000;

nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('public'));

app.use('/', router);

Promise.all([ models.User.sync(), models.Page.sync()])
  .then(function () {
    console.log('Database succesfully synced');
    app.listen(PORT, function() {
      console.log('Server running on port', PORT);
    });
  })
  .catch(err => console.error(err));
