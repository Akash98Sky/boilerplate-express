
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use(function(req, res, next) {
	console.log(req.method + ' ' + req.path + ' - ' + req.ip);
	next();
});

// --> 11)  Mount the body-parser middleware  here
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
//app.get("/", function(req, res) {
//  res.send('Hello Express');
//});

/** 3) Serve an HTML file */
app.get("/", function(req, res) {
	let path = __dirname + "/views/index.html";
	res.sendFile(path);
});

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
app.get("/json", function(req, res) {
	let obj = { message: "Hello json" };
	if (process.env.MESSAGE_STYLE === "uppercase")
		obj.message = obj.message.toLocaleUpperCase();
	res.send(obj);
});

/** 6) Use the .env file to configure the app */
process.env.MESSAGE_STYLE = "uppercase"

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', (req, res, next) => {
	req.time = new Date().toString();
	next();
}, (req, res) => {
	res.send({ time: req.time });
});


/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res) => {
	res.send({ echo: req.params.word });
});


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
/**
 * @param {Requests} req
 * @param {Response} res
 */
const nameHandler = (req, res) => {
	res.send({ name: req.query.first + ' ' + req.query.last });
};
app.route('/name').get(nameHandler)//.post(nameHandler);


/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post('/name', (req, res) => {
	res.send({ name: req.body.first + ' ' + req.body.last });
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
