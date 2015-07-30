(function(){
	'use strict';

	var Promise = require('bluebird'),
	HelperZap = require('./HelperZap');


	var Busca = {};


	Busca.realizar = function(objBusca){

		return new Promise(function(resolve, reject){


			var listaImoveis = [];

			HelperZap.parse(objBusca).then(function(data){

				listaImoveis=data;
				resolve(listaImoveis);
				
			});




		});


	};

	module.exports = Busca;


}());