var mongoose = require("mongoose");
var passport = require("passport");
var Content = require("../models/Content");

var dateFormat = require('dateformat');

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
        function(parallel_callback) {
            Content.find( {} 
                , viewContentController.preview_columns
                , recent_query 
                , function(err, recent_list) {
                    if(err) {return;}

                    //step through each element in the data and render it to html     
                    async.each(recent_list, function(data, each_callback) {

                        //tweak the date formate
                        var date = new Date(data.createdAt);
                        data.date = dateFormat(date);
                        
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
         //popular looks exactly like the first one exept we push to the popular list
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
    var type_list = submitContentController.type_list;
    res.render('content', { user : req.user, type_list : type_list });
};


module.exports = viewContentController;
