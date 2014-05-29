var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var sets;

router.all('*', function(req, res, next) {
  request('http://api.mtgapi.com/v1/list/sets', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			sets = JSON.parse(body);

			next();
		} else {
			sets = {};
			next();
		}
	});
});

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Magic: The Gathering Card Search', data: sets});	
});

router.get('/:set', function(req, res) {
	set = req.params.set;

	  request('http://api.mtgapi.com/v1/card/set/' + set, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			cards = JSON.parse(body);

			res.render('index', { title: 'Magic: The Gathering Card Search', data: sets, set: set, cards: cards });
		} else {
			res.render('index', { title: 'Magic: The Gathering Card Search', data: sets, set: set });
		}
	});	
});


router.get('/:set/:id', function(req, res) {
	set = req.params.set;
	id = req.params.id;

	  request('http://api.mtgapi.com/v1/card/set/' + set, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			cards = JSON.parse(body);
			request('http://api.mtgapi.com/v1/card/id/' + id, function (error, response, body) {
				card = JSON.parse(body);
				console.log(card);
				if (!error && response.statusCode == 200) {
					res.render('index', { title: 'Magic: The Gathering Card Search', data: sets, set: set, cards: cards, card: card[0] });
				} else {
					res.render('index', { title: 'Magic: The Gathering Card Search', data: sets, set: set });			
				}
			});
		}
	});	
});

module.exports = router;
