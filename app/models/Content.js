var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./User.js');

var ObjectId = Schema.Types.ObjectId;

var ContentSchema = new Schema({
    author: { type: ObjectId, ref: 'User' },
    type: { type: String, required: true },
    license: { type: String, required: true },
    title: { type: String, required: true },
    setting: Array, //the worlds setting: modern, sci-fi, etc
    style: { type: String, required: true },   //style of the content: playful, grimdark, etc
    tags: Array,
    
    //points to another Schema that holds details based on the type above
    detail: { type: ObjectId, refPath: 'detail' }
},
{
  timestamps: true //automatically handles createdAt and updatedAt fields
});


//includes used by utitlity functions
var CharacterDetail = require("../models/CharacterDetail");

module.exports = {
  model: mongoose.model('Content', ContentSchema)

//utility functions
, getDetailByName: function(type) {
    switch(type.toLowerCase()){
        case("character"):
            return CharacterDetail;
            break;
    }
}
}

