const express = require("express");
const path = require("path");

//add configuration using MML_BACKEND_URI if available, otherwise, use http://localhost:3001
//To run on heroku with heroku backend
//    heroku config:set MML_BACKEND_URI="https://mml-test-back.herokuapp.com"
//To run on local machine with heroku backend
//    export  MML_BACKEND_URI="https://mml-test-back.herokuapp.com"
//    node server.js
//To run on local machine with localhost as backend
//    export  MML_BACKEND_URI=""
//    node server.js
//
//const backendUri = process.env.MML_BACKEND_URI || "http://localhost:3001";
const port = process.env.PORT || 9090;
const app = express();

//disable x-powered-by header so that attacker does not use it to detect if it is node express server
app.disable("x-powered-by");
app.use(express.static(path.join(__dirname, "./dist")));

//proxy to back-end api calls
	//here we can do cookieDomainRewrite etc
	//cookieDomainRewrite: {
	//  "unchanged.domain": "unchanged.domain",
	//  "old.domain": "new.domain",
	//  "*": ""
	//}

	//cookiePathRewrite: {
	//  "/unchanged.path/": "/unchanged.path/",
	//  "/old.path/": "/new.path/",
	//  "*": ""
	//}

//app.get('env') returns 'development' if NODE_ENV is not defined.
//if ( //app.get('env' === 'production')) {
if (process.env.NODE_ENV === "production") {
	//NODE_ENV
	app.set("trust proxy", 1); // trust firs
}

//send the user to index html page inspite of the url
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./dist/index.html"));
});

app.listen(port);