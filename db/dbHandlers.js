var pool = require('./dbConnection.js');

exports.getAllItems = (cb) => {
  var query = 'SELECT * FROM items;';
  pool.query(query, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows);
    }
  });
};

exports.addItem = (name, category, clean, cb) => {
  var query = 'INSERT INTO items (name, category, clean) VALUES ($1, $2, $3) RETURNING id;';
  pool.query(query, [name, category, clean], (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows[0].id);
    }
  });
};

exports.addImage = (itemId, imageUrl, cb) => {
  var query = 'INSERT INTO images (item_name, image_url) VALUES ($1, $2);';
  pool.query(query, [itemId, imageUrl], (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, true);
    }
  })
}