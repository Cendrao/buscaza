var express = require('express'),
router= express.Router(),
Promise = require('bluebird'),
bodyParser = require('body-parser'),
Busca = require('../lib/Busca');


router.get('/casas', function(req,res,next){

	res.json({'teste:' : 'ok'});

});


router.post('/casas', function(req, res, next){

	var busca = req.body;

	Busca.realizar(busca).then(function(data){ 

		res.json(data);

	});

});

module.exports = router;