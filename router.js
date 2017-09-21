var router = require('express').Router();
var bodyParser = require('body-parser');
var controllers = require('./controllers/controllers.js');

router.post('/addItem', controllers.addItem.post);
router.get('/testConnection', controllers.testConnection.get);

module.exports = router;