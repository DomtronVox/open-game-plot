var port = process.env.PORT || 8080;
require("./app.js").listen(port);
console.log("Running on http://127.0.0.1:"+port)
