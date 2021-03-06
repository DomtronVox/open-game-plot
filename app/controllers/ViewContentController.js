var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var Content = require("../models/Content");

//var dateFormat = require('dateformat');

var async = require("async");

var viewContentController = {};

//columns used in preview. order matters
viewContentController.preview_columns = 
    ["title", "author", "license", "type", "setting", "tags", "createdAt"]

// Show summery lists on root page
viewContentController.home = function(req, res) {
    var recent_previews = [];
    var popular_previews = [];

    var recent_query = { skip:0 // Starting Row
                       , limit:10 // Ending Row
                       , sort:{
                             createdAt: -1 //Sort by Date Added DESC
                         }
                       }

    //run the database queries in parellel
    //TODO desperatly need to handle the err in callbacks 
    //TODO try to make this less convoluted.
    async.parallel([
        //One of the tasks is to pull the most recently created content
        function(parallel_callback) {
            Content.model
                .find( {}, viewContentController.preview_columns, recent_query)
                .populate("author")
                .exec( 
                    function(err, recent_list) {
                        if(err) {return;}

                        //step through each element in the data and render it to html     
                        async.each(recent_list, function(data, each_callback) {
                            
                            //tweak the date formate
                            var date = new Date(data.createdAt);
                            data.date = date; //dateFormat(date);

                            //render data into a htmlet and add it to the data list for final render
                            res.app.render("content_htmlet_summery", data, function(err, html){
                                if(err) {
                                    console.err(err)
                                    each_callback(err);
                                } else {
                                    recent_previews.push(html);
                                    each_callback();
                                }
                            })
                        })

                        //do not care about the results return since we make it ourselves
                        parallel_callback(null, "");
                    }
                )
                    
         }//,

         //Another task is to pull the most popular content
         //TODO: popular looks exactly like the first one exept we push to the popular list
      ],
    //send data
    function(err, results) {
        res.render('index', 
          { user : req.user, recent : recent_previews, popular : popular_previews }
        )
    });
    
};

// allow polling for any content by id or ?
viewContentController.page = function(req, res) {

    //TODO improve this. If a user makes a bad request (i.e. doesn't define content id) 
    //    then a bad request status should be sent
    var error = function(req, res, err) {
        var message 

        if (!err) {
            message = "The content you are looking for does not exist.";
            res.status(404);

        } else {
            message = "Internal server error: "+err;
            res.status(500);
            console.log(err)
        }

        res.render('error', { user: req.user, message: message, error: {status: 404} });
    }

    //if the id query variable is defined look for the database entry
    if (req.query.id) {
        Content.model.findOne( {_id: req.query.id} )
               .populate("author")
               .exec(function(err, content) {
                   //internal server error occured
                   if(err) {
                       return error(req, res, err);
                   }

                   //determin which model we need to search
                   var ContentDetail = Content.getDetailByName(content.type)

                   ContentDetail.model.findOne( {_id: content.detail }, function(err, detail) {
                       if(err) {
                           return error(req, res, err);
                       }

                       //set the details data then render the page
                       content.details = {}
                       for (var index in ContentDetail.public_details) {
                           var key = ContentDetail.public_details[index];
                           content.details[key] = detail[key];
                       }
                       res.render('content', { user : req.user, data : content })
                   })
               })

    //if that ID does not exist send a 404 error
    } else {
        error(req, res);
    }

    
};


module.exports = viewContentController;
