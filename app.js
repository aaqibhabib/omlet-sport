/// <reference path="typings/tsd.d.ts" />

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var morgan = require('morgan');

var _ = require('lodash');
var rp = require('request-promise');

var key = 'mhqthku4pa3qtkytytxmacm7';
var baseUrl = 'http://api.sportradar.us/nfl-ot1';

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

// store games
var games = [];
var cache = {};


// Get years schedule
var now = new Date();
var url = baseUrl + '/games/' + now.getFullYear() + '/REG/schedule.json?api_key=' + key;

rp.get({ uri: url, json: true })
	.then(function (data) {
		for (var i = 0; i < data.weeks.length; i++) {
			var week = data.weeks[i];
			games = [].concat(games, week.games);
		}

		for (var i = 0; i < games.length; i++) {
			var game = games[i];
			game.scheduled = new Date(game.scheduled);
		}

	});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
	res.json({ message: 'hooray! welcome to the omlet sports api!' });
});

// on routes that end in /sports
// ----------------------------------------------------
router.route('/games')
// get all the sports (accessed at GET http://localhost:8080/api/games)
// returns the next 16 games;
	.get(function (req, res) {
		if (!games.length) res.status(500).json({ message: 'No games!' });
		var gamesToBePLayed = _.filter(games, function (game) {
			return game.scheduled >= Date.now();
		});
		
		// send the next 16 games, 16 games in a week
		if (gamesToBePLayed.length <= 16) {
			res.json(gamesToBePLayed);
		} else {
			res.json(gamesToBePLayed.slice(0, 16));
		}
	});

// on routes that end in /sports/:sport_id
// ----------------------------------------------------
router.route('/games/:game_id')

// get the sport with that id
	.get(function (req, res) {
		var gameID = req.params.game_id;
		var url = 'http://api.sportradar.us/nfl-ot1/games/' + gameID + '/statistics.json?api_key=' + key;

		if (!cache[gameID] || Date.now().valueOf() - new Date(cache[gameID].updatedAt).valueOf > 5 * 60 * 1000) {
			// if not in cache or older than 5 mins, then get data
			rp({ uri: url, json: true }).then(function (data) {
				var obj = {
					clock: data.clock || null,
					status: data.status || null,
					quarter: data.quarter,
					home: _.cloneDeep(data.summary.home),
					away: _.cloneDeep(data.summary.away),
					scheduled: data.scheduled,
					updatedAt: Date.now()
				}
				cache[gameID] = obj;
				res.json(obj);
			}).error(function (err) {
				res.status(500).json({ message: err });
			});
		} else {
			res.json(cache[gameID]);
		}
	})


// REGISTER OUR ROUTES -------------------------------

// configure static files
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);