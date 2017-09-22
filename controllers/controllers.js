var dbHandlers = require('../db/dbHandlers.js');
var index = require('../algolia/algoliaConnection.js');
var multiparty = require('multiparty');
var s3Handlers = require('../models/s3Handlers');

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

exports.uploadImage = {
  post: (req, res) => {
    var form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      // TODO: Make s3 image names guaranteed unique
      var imageName = files.photo[0].originalFilename.slice(0, -4);
      s3Handlers.uploadImage(imageName, files.photo[0].path, (err, data) => {
        if (!err) {
          console.log(data.ETag);
          var imageUrl = 'https://s3-us-west-1.amazonaws.com/wasteline-images/' + imageName;
          // TODO: tie in item id
          dbHandlers.addImage('1', imageUrl, (err, result) => {
            if (err) {
              console.log(err);
            }
          })
        }
      })
      res.sendStatus(200);
    });
  }
}