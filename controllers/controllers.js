var dbHandlers = require('../db/dbHandlers.js');
var index = require('../algolia/algoliaConnection.js');

exports.addItem = {
  post: (req, res) => {
    dbHandlers.addItem(req.body.name, req.body.category, req.body.clean, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        index.addObjects([{
          objectID: result,
          name: req.body.name,
          category: req.body.category,
          clean: req.body.clean
        }], (err, content) => {
          if (err) {
            console.log(err);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  }
}

exports.testConnection = {
  get: (req, res) => {
    res.sendStatus(200);
  }
}