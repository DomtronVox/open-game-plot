//connect to mongodb
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DBURL || 'mongodb://localhost/open_game_plot')
  .then(() =>  console.log('Database connection succesfull'))
  .catch((err) => console.error(err));

var port = process.env.PORT || 8080;
require("./app.js").listen(port);
console.log("Running on http://127.0.0.1:"+port)
