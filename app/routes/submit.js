var express = require('express');
var router = express.Router();
var submit_content = require("../controllers/SubmitContentController.js");

router.get('/', submit_content.page);

router.post('/', submit_content.doSubmit);

//router.get('/edit', submit_content.edit_page);

//router.post('/edit', submit_content.doEdit);

module.exports = router;
