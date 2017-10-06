
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./User.js');

var ContentSchema = new Schema({
    //author: User,
    type: String,
    license: String,
    title: String,
    setting: Array, //the worlds setting: modern, sci-fi, etc
    style: String,   //style of the content: playful, grimdark, etc
    tags: Array,
    
    //points to another Schema that holds details based on the type above
    details: Object
},
{
  timestamps: true //automatically handles createdAt and updatedAt fields
});

var CharacterSchema = new Schema({
    //author: User,
    type: String,
    license: String,
    title: String,
    setting: Array, //the worlds setting: modern, sci-fi, etc
    style: String,   //style of the content: playful, grimdark, etc
    tags: Array,
    
    //points to another Schema that holds details based on the type above
    details: Object
},
{
  timestamps: true //automatically handles createdAt and updatedAt fields
});

module.exports = mongoose.model('Content', ContentSchema);

