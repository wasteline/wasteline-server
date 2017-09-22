var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.update({ accessKeyId: process.env.AWS_ID, secretAccessKey: process.env.AWS_KEY });


exports.uploadImage = (name, path, cb) => {
  const s3 = new AWS.S3({region: 'us-west-1'});

  var params = {
    Bucket: 'wasteline-images', 
    Key: name, 
    ACL: 'public-read',
    Body: fs.createReadStream(path)
  }

  s3.putObject(params, (err, data) => {
    if (err) {
        console.log("Error uploading image: ", err);
        cb(err, null);
      } else {
        console.log("Successfully uploaded image on S3", data);
        cb(null, data);
      }
  });
}