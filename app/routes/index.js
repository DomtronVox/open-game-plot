var express = require('express');
var router = express.Router();
var view_content = require("../controllers/ViewContentController.js");

// restrict index for logged in user only
router.get('/', view_content.home);

//allow showing content by id
router.get('/view', view_content.page);

module.exports = router;

