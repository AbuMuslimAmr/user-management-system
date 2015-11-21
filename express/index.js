var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  config = require('./express-config');

// support json encoded bodies
app.use(bodyParser.json()); 

// serve static files
app.use(express.static(config.root + '/' + config.serveFolder));
app.get('/', function(req, res) {
  res.sendFile(config.index, {
    root: config.root
  });
});

// set routes
require('./routes')(app);

// run server
var server = app.listen(config.port, function () {
  var host = server.address().address,
      port = server.address().port;

  console.log('App is up and running on http://%s:%s', host, port);
});
