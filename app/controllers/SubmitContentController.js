var mongoose = require("mongoose");
var passport = require("passport");
var Content = require("../models/Content");

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

    //callback function for the database model register function
    callback = function(err, content) {
        console.log(err)
        if (err) {
            return res.render('submit', { user : req.user });
        }
        res.redirect('/');
    }

    //register content with database
    var content = new Content(content);
    content.save(callback);
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
