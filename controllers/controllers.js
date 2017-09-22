var dbHandlers = require('../db/dbHandlers.js');
var index = require('../algolia/algoliaConnection.js');
var multiparty = require('multiparty');
var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update({ accessKeyId: process.env.AWS_ID, secretAccessKey: process.env.AWS_KEY });

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

      console.log(fields);
      console.log(files);

      const s3 = new AWS.S3({region: 'us-west-1'});
      var base64data = new Buffer(files.photo, 'binary');

      var params = {
        Bucket: 'wasteline-images', 
        Key: fields.product[0], 
        ACL: 'public-read',
        Body: fs.createReadStream(files.photo[0].path)
      }

      s3.putObject(params, function (err, data) {
        if (err) {
            console.log("Error uploading image: ", err);
          } else {
            console.log("Successfully uploaded image on S3", data);
          }
      });
    
      console.log('Upload completed!');
      res.sendStatus(200);
    });
  }
}