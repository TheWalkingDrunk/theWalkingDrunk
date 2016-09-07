//This class is a collection of stops of a given type (bars, restaurants, etc.)
//that the user can visit on their trip.

//A new collection in the database can be created using:
//_______________

//Each stop has the following properties:
//name:  The name of the stop (string)
//address:  The address of the stop (string)
//latitude:  The latitude of the stop (floating point number)
//longitude:  The longitude of the stop (floating point number)
//rating:  The stop's Yelp rating from 0 - 5 (integer)
//price:  The stop's Yelp price, 0 - 5 $'s (integer)
//tags:  Optional tags for the stop.  E.g. "irish pub", "michelin star", "non-smoking", etc. (array of strings)

//The available methods are:
//addStop(data, callback):
//Adds a new stop to the database.
//data is an object whose key value pairs are the data that you want to use for the new stop.
//  E.g. {name: "Tempest", address: "431 Natoma Street, San Francisco, CA   94103", ...}
//callback is a function that is called when new stop has been created.  The callback is passed
//  err which contains error information if there is an error and is ________ otherwise and the
//  newly created stop.
//
//removeStops(options, callback)
//Removes any stops from the database that match the provided options.
//options is an object whose key value pairs are the data that you want to match in your removal.
//  E.g. {price: 3} would remove stops whose Yelp price is "$$$".
//callback ______________
//
//updateStops(options, data, callback)
//Updates the data in stops which match the provided options.
//options is an object whose key value pairs are the data that you want to match in your update.
//  E.g. {price: 3} would update stops whose Yelp price is "$$$".
//  In addition you also include the options listed here: http://mongoosejs.com/docs/api.html#model_Model.update
//data is an object whose key value pairs are the data you want to change.
//  E.g. {rating: 3} would update the selected stops to have a Yelp score of 3 stars.
//callback ________________
//
//findOneStop(options, callback)
//Finds the first stop which matches the provided options and passes it to the callback.
//options is an object whose key value pairs are the data that you want to match in your search.
//  E.g. {price: 3} would match stops whose Yelp price is "$$$".
//callback ___________________
//
//findStops(options, callback)
//Finds stops which match the provided options and passes them to the callback.
//options is an object whose key value pairs are the data that you want to match in your search.
//  E.g. {price: 3} would match stops whose Yelp price is "$$$".
//callback ___________________
//

// class Stops () {
//   constructor(modelName, url) {
//     mongoose.connect('mongodb:' + url);

//     this._schema = new mongoose.Schema({
//       name: {type: String, required: true}       //The name of the stop
//       address: {type: String, required: true}    //The address of the stop as a string
//       latitude: {type: Number, required: true}   //The latitude of the stop
//       longitude: {type: Number, required: true}  //The longitude of the stop
//       rating: {type: Number, min: 0, max: 5}     //The stop's Yelp rating from 0 - 5
//       price: {type: Number, min: 1, max: 5}      //The stop's Yelp price, 1 - 5 $'s
//       tags: [String]            //Optional tags for the stop.  E.g. "irish pub", "michelin star", "non-smoking", etc.
//     });

//     this._name = modelName;

//     this._model = mongoose.Model(modelName, this._Schema);
//   }

//   addStop(data, callback) {
//     this._model.create(data, callback);
//   }

//   removeStops(options, callback) {
//     this._model.remove(options, callback);
//   }

//   updateStops(options, data, callback) {
//     this._model.update(id, data, callback);
//   }

//   findOneStop(options, callback) {
//     this._model.findOne(options, callback);
//   }

//   findStops(options, callback) {
//     this._model.find(options, callback);
//   }
// }

