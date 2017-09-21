var algoliasearch = require('algoliasearch');

var client = algoliasearch('3W1TNS1Z59', process.env.ALGOLIA_API_KEY);
var index = client.initIndex('items');

module.exports = index;