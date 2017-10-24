var mongoose = require("mongoose");
var passport = require("passport");
var Content = require("../models/Content");
var CharacterDetail = require("../models/CharacterDetail");

var submitContentController = {};

// Restrict access to submit page
submitContentController.page = function(req, res) {
    var type_list = submitContentController.type_list;
    res.render('submit', { user : req.user, type_list : type_list });
};



// Post content data
submitContentController.type_list = [
    "Character", 
    "Quest",
    "Location", 
    "Item"
]

submitContentController.doSubmit = function(req, res) {

    //extract content from page
    content = req.body;
    content.tags = content.tags.split(',');
    content.author = req.user;

    //create content detail
    var detail;
    switch(content.type.toLowerCase()) {
        case "character":
            detail_obj = new CharacterDetail.model(content.character);
            break;
    }


    //set detail object id for Content object
    content.detail = detail_obj._id; 

    //register content with database
    var content_obj = new Content.model(content);
    content_obj.save(function(err, content) {
        if (err) {
            return res.render('error', 
                { user : req.user, message: err, error: {status: 500} }
            );
        }

        detail_obj.save(function(err, content) {
            if (err) {
                return res.render('error', 
                     { user : req.user, message: err, error: {status: 500} }
                );
            }

            res.redirect('/');
        })
    });
};

// populate submit page for editing
submitContentController.edit_page = function(req, res) {
    //get data from database
    var data = {}

    //pass data on and render page
    res.render('submit', data);
};

// Post edit update
submitContentController.doEdit = function(req, res) {
    //passport.authenticate('local', { failureRedirect: '/submit/edit?something' })(req, res, function () {
    //  res.redirect('/');
    //});
    //TODO not sure we need this
};

module.exports = submitContentController;
