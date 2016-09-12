// connect to DB
// if schema doesnt exist
  // create schema
// create Model
// export utilityFunctions

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// connect to DB
mongoose.connect('mongodb://localhost/test');

// check connection
mongoose.connection.on('error', function(err) {
    console.log('Mongo Error:\n');
    console.log(err);
}).on('open', function() {
    console.log('Connection opened');
});

// define Mongoose Schema
var pubSchema = new Schema({
  currPub: String,
  nextPubs: String
});

var yelpInfoSchema = new Schema({
  name: String,
  yelpObj: String
});

var YelpInfo = mongoose.model('YelpInfo', yelpInfoSchema);

// define Mongoose Model
var Pubs = mongoose.model('Pubs', pubSchema);

// Utility object to be exported
var utils = {};

utils.cachePubRoutes = (req, res) => {
  new Pubs({
    currPub: req.body.currPub,
    nextPubs: req.body.nextPubs
  })
  .save((err) => {
    if(err)
      throw err;
    res.send(200);
  })
};

// make promise then it will work
utils.retrievePubRoutes = (req, res) => {
  Pubs.findOne({currPub:req.headers.currpub}, (err, query) => {
      if (err) {
        res.send(err);
      } else {
        res.send(query)
      }
    });
};

utils.cacheYelpInfo = (obj) => {
  new YelpInfo({
    name: obj.name,
    yelpObj: obj
  })
  .save();
};

module.exports = utils;
