var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

var formOpts = {
    gender: ["male", "female", "either", "genderless"]
}

//list all details that are publically displayed. 
//   used to determin what values to send to the templater and what order to display them
//TODO see if this is listed in the object somewhere
var public_details = ["name", "gender", "short_description", "long_description", "dialog"];

var CharacterDetailSchema = new Schema({
    
    name: { type: String, required: true },
    gender: { type: String, lowercase: true, enum: formOpts.gender },
    short_description: { type: String, required: true },
    long_description: String,
    dialog: String
});

module.exports = {
  model: mongoose.model('CharacterDetail', CharacterDetailSchema)
, formOpts: formOpts
, public_details: public_details
}
