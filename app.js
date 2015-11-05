// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var morgan = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /sports
// ----------------------------------------------------
router.route('/sports')
// get all the sports (accessed at GET http://localhost:8080/api/sports)
	.get(function (req, res) {
		// sport.find(function(err, sports) {
		// 	if (err)
		// 		res.send(err);

		// 	res.json(sports);
		// });
	});

// on routes that end in /sports/:sport_id
// ----------------------------------------------------
router.route('/sports/:sport_id')

// get the sport with that id
	.get(function (req, res) {
		// sport.findById(req.params.sport_id, function(err, sport) {
		// 	if (err)
		// 		res.send(err);
		// 	res.json(sport);
		// });
	})


// REGISTER OUR ROUTES -------------------------------

// configure static files
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);