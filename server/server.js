const express = require("express");
const app = express();

let server = app.listen(3000, function() {
	console.log("Listening on port 3000...");
});

app.use(express.static("../code"));