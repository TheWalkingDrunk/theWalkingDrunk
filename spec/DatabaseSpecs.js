var mocha = require('mocha');
var chai = require('chai');
var http = require('http');
var db = require ('../server/database/database.js');
var expect = chai.expect;

describe('Database', function() {
	describe('cachePubRoutes', function() {
		it('Should respond with status code 200', function() {
			http.request({
				hostname: 'localhost:3000',
				method: 'POST',
				path: 'cached/routes'
			}, (res) => {
				expect(res.statusCode).to.equal(200);
			});
		});

		it('Should post data to database and retrieve same data', function() {
			http.request({
				hostname: 'localhost:3000',
				method: 'POST',
				path: 'cached/routes',
				data: {
					currPub: 'Tempest',
					nextPub: 'Hotel Zeta'
				}
			}, (res) => {
				http.request({
					hostname: 'localhost:3000',
					method: 'GET',
					path: 'cached/routes',
					headers: {
						currpub: 'Tempest'
					}
				}, (res) => {
					expect(res).to.deep.equal({
						currPub: 'Tempest',
						nextPub: 'Hotel Zeta'
					});
				});
			});
		});

		it('Should throw error when requesting data not in database', function() {
			http.request({
				hostname: 'localhost:3000',
				method: 'GET',
				path: 'cached/routes',
				headers: {
					currpub: 'This is not a bar'
				}
			}, (res) => {
				expect(res).to.be.false;
			});
		});
	});
});