var chai = require('chai');
var http = require('http');
var fs = require('fs');
var expect = chai.expect;

describe('Endpoints', function() {
  describe('/', function() {
  	describe('GET', function() {
	    it('should respond with HTML', function() {
	    	http.get('http://localhost:3000/', (res) => {
				  expect(res.body).to.be.a('string');
				});
	    });
	    it('should respond with a status code of 200', function() {
			  http.get('http://localhost:3000/', (res) => {
				  expect(res.statusCode).to.equal(200);
 				});
	    });
	    it('should not be 404', function() {
	    	http.get('http://localhost:3000/', (res) => {
				  expect(res.statusCode).to.equal(404);
 				});
	    });
	  });
  });
  describe('/cached/routes', function() {
    describe('GET', function() {
	    it('should receive request with query', function() {
	    	http.get('http://localhost:3000/', (res) => {
				  expect(typeof res.body).to.equal("object");
 				});
	    });
	    it('should respond with a status code of 200', function() {
	    	http.get('http://localhost:3000/', (res) => {
				  expect(res.statusCode).to.equal(200);
 				});
	    });
	    it('should not be 404', function() {
	    	http.get('http://localhost:3000/', (res) => {
				  expect(res.statusCode).to.equal(404);
 				});
	    });
	  });
  });
  describe('404', function() {
    it('should respond with 404', function() {
  		http.get('http://localhost:3000/', (res) => {
			  expect(res.statusCode).to.equal(404);
			});
    });
  });
});