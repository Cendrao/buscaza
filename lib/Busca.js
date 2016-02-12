(function(){
	'use strict';

	var Promise = require('bluebird'),
	HelperZap = require('./HelperZap'),
	Mongo = require('./Mongo');

	var Busca = {};

	Busca.realizar = function(objBusca){

		return new Promise(function(resolve, reject){


			var listaImoveis = [];

			HelperZap.parse(objBusca).then(function(data){

				listaImoveis=data;

				// for(var i = 0 ; i < listaImoveis.length; i++)
				// {
				// 	Mongo.insert('imoveis', data, function(err, result){

				// 		console.log(err,'err');
				// 		console.log(result, 'result');

				// 	});
				// }

				resolve(listaImoveis);

			});

		});

	};

	module.exports = Busca;

}());