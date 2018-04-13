var express = require('express');

var router = express.Router();


router.get('/', function(req, res, next) {

  res.json([{
  	id: 1,
  	username: "ossie"
  }, {
  	id: 2,
  	username: "fraser"
  }, {
  	id: 3,
  	username: "gabriel"
  }, {
  	id: 4,
  	username: "alex"
  }]);

});

module.exports = router;
