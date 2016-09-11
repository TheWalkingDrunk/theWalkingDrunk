const fs = require('fs');
const yelpSearch = require('./yelpSearch.js');
const db = require('./database/database.js');
const bodyParser = require('body-parser');


module.exports = (app, express) => {

  app.use(express.static(__dirname + '/../client'));

  app.route('/')
    .get((req, res) => {
      res.render('index');
    });

  app.route('/cached/routes')
    .get((req, res) => {
      console.log('GET - /cached/routes');
      db.retrievePubRoutes(req, res);
    })
    .post((req, res) => {
      console.log('POST - /cached/routes');
      db.cachePubRoutes(req, res);
    });

  app.use((req, res) => {
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