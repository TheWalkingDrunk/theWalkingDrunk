var fs = require('fs');

module.exports = function (app, express) {

  app.use(express.static(__dirname + '/../client'));

  app.route('/')
    .get(function(req, res) {
      res.render('index');
    });

  app.use(function(req, res, next){
    res.status(404);

    if (req.accepts('html')) {
      // respond with html page
      res.send('404 - Not found');
      return;
    } else if (req.accepts('json')) {
      // respond with json
      res.send({ error: '404 - Not found' });
      return;
    }
    // default to plain-text. send()
    res.type('txt').send('404 - Not found');
  });
};