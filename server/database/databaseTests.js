// var mocha = require('mocha');
// var chai = require('chai');

// const testData = {}
//   valid1: {name: 'foo', address: '123 Foo Street', latitude: 1.2, longitude: 3.4, rating: 1, price: 2, tags: ['irish']},  //Valid test data
//   valid2: {name: 'bar', address: '111 Foo Street', latitude: 5.6, longitude: 7.8, rating: 1, price: 4, tags: []},  //Valid test data
//   valid3: {name: 'baz', address: '333 Baz Street', latitude: 9, longitude: 10, rating: 3, price: 2, tags: ['loud', 'big']},  //Valid test data
//   incomplete: {name: "foo", address: '123 Foo Street', latitude: 11.2}, //Incomplete test data
//   invalid: {name: "foo", address: 123, latitude: 'foo', longitude: 55.6, rating: , price: 2, tags: []}  //Invalid test data
//   outOfRange1: {name: 'foo', address: '123 Foo Street', latitude: 1.2, longitude: 3.4, rating: 1, price: 0, tags: []},  //Out of range test data (price)
//   outOfRange2: {name: 'foo', address: '123 Foo Street', latitude: 1.2, longitude: 3.4, rating: 6, price: 2, tags: []},  //Out of range test data (rating)
// ]}

// describe('database.js', function () {
//   describe('addStop method', function () {
//     //Test addStop()
//       //Test adding docs
//       it('should add docs'/*, function () {}*/);
//       //Test adding duplicate docs
//       it('should not add duplicate documents'/*, function () {}*/);
//       //Test adding docs that lack required data
//       it('should not add docs that lack required data'/*, function () {}*/);
//       //Test adding docs with data of the wrong type
//       it('should not add docs with data of the wrong type'/*, function () {}*/);
//       //Test adding docs with data which is out of range
//       it('should not add docs with data that is out of range'/*, function () {}*/);
//   });

//   describe('findOneStop and findStops methods', function () {
//     //Test findOneStop() and findStops()
//       //Test finding docs that do exist
//       it('should find docs which do exist');
//       //Test finding docs that do not exist
//       it('should not find docs which do not exist');
//       //Test finding docs when none exist
//       it('should not find docs or throw an error when no docs exist');
//   });

//   describe('updateStops method', function () {
//     //Test updateStops()
//       //Test updating docs
//       it('should update docs');
//       //Test updating docs to create duplicates
//       it('should not allow updating docs to create duplicates');
//       //Test updating docs that don't exist
//   });

//   describe('removeStops method', function () {
//     //Test removeStops()
//       //Test removing docs
//       it('should remove docs');
//       //Test re-adding removed docs
//       it('should re-add previously removed docs');
//       //Test removing docs that don't exist
//   });
// });
