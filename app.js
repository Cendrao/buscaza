'use strict'

var express = require('express'),
bodyParser = require('body-parser');


var app = express();


app.use(bodyParser.json());

app.set('port', 8000);
app.use(express.static(__dirname + '/public'));


app.use('/', require('./middleware/routes'));

app.use(function(req,res,next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.listen(app.get('port'), function(){
	
	console.log('Rodando na porta ' + app.get('port'));
	
});

module.exports = app;