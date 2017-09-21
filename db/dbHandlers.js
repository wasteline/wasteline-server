var pool = require('./dbConnection.js');

exports.getAllItems = (cb) => {
  var query = 'SELECT * FROM items;';
  pool.query(query, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows);
    }
  });
};

exports.addItem = (name, category, clean, cb) => {
  var query = 'INSERT INTO items (name, category, clean) VALUES ($1, $2, $3) RETURNING id;';
  pool.query(query, [name, category, clean], function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result.rows[0].id);
    }
  });
};