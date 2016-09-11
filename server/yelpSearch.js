const yelp = require("node-yelp");

const client = yelp.createClient({
  oauth: {
    "consumer_key": "_Qs9S9ohkGj32ygCz0vhyA",
    "consumer_secret": "qA3YVgM_Z31LVHSV9qRLxtriboE",
    "token": "VWLlZeJqo7anSjDjWe4i9N0SwuItniCZ",
    "token_secret": "R21cba_B2dJmoElanqq1Wb1GWAQ"
  },
  
  // Optional settings: 
  httpClient: {
    maxSockets: 25  // ~> Default is 10 
  }
});
 
 
// exports promise
module.exports = (req) => {
	return client.search({
	  terms: "bar",
	  location: "elk grove, ca",
    category_filter: "nightlife"
	});
};