var express = require('express');
var router = express.Router();
var view_content = require("../controllers/ViewContentController.js");

// restrict index for logged in user only
router.get('/', view_content.home);



module.exports = router;

