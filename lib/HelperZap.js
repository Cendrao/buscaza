(function(){

	'use strict';

	var Promise = require('bluebird'),
	request = require('request'),
	Imovel = require('./Imovel'),
	ArrayProto = require('./ArrayProto');



	var HelperZap = {};

	HelperZap.parse = function(objBusca) {

		var quantidadePaginas =1;

		return new Promise(function(resolve, reject){

			var objRequest = gerarDadosRequest(objBusca);

			request({
				headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36' },
				url: objRequest.link,
				method: 'POST',
				formData : objRequest.data
			},function(error, headers, json){

				var objJson = JSON.parse(json);
				
				if (objBusca.pagina == 0)
					objBusca.pagina = objJson.Resultado.QuantidadePaginas;

				resolve(objJson.Resultado.QuantidadePaginas);


			});

		}).then(function(qtd){



			return new Promise(function(resolveParse, rejectParse) {
				if (quantidadePaginas==1){
					quantidadePaginas=qtd;
				}


				var objRequest = gerarDadosRequest(objBusca);

				request({
					headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36' },
					url: objRequest.link,
					method: 'POST',
					formData : objRequest.data
				},function(error, headers, json){

					var objJson = JSON.parse(json);
				

					extrairDados(objJson).then(function(data){

					var retVal = { Resultado: data.reverse(), QuantidadePaginas: quantidadePaginas };


						resolveParse(retVal);

					});


				});



			});

		});

	};


	function gerarDadosRequest(obj) {

		var url = 'http://www.zapimoveis.com.br/Busca/RetornarBuscaAssincrona/';

		var formData = {};

		formData.tipoOferta =1;
		formData.paginaAtual=obj.pagina;
		formData.pathName = '/' + obj.acao + '/' + obj.tipoDeImovel + '/' + obj.cidade + '/';
		formData.hashFragment = {};

		if (!obj.precoMinimo) obj.precoMinimo = 0;

		var hashFragment = { precominimo: obj.precoMinimo, precomaximo: obj.precoMaximo, parametrosautosuggest: [], pagina: obj.pagina, ordem: "Valor" };

		hashFragment.parametrosautosuggest.push({Cidade: obj.cidade});

		if (obj.bairro)
			hashFragment.parametrosautosuggest.push({Bairro: obj.bairro});

		formData.hashFragment= JSON.stringify(hashFragment);

		return { link: url, data:formData};

	}


	function extrairDados(objJson) {

		return new Promise(function(resolve, reject){
			objJson = objJson.Resultado.Resultado;

			var casas = [];

			for (var i = 0 ; i < objJson.length; i++) {


				var casaJson = objJson[i];

				var fotos =[];

				for (var j = 0 ; j < casaJson.Fotos.length; j++) {

					fotos.push(casaJson.Fotos[j].UrlImagemTamanhoP);
				}

				var casa = new Imovel(casaJson.Valor, casaJson.Cidade, casaJson.QuantidadeQuartos, casaJson.QuantidadeVagas, casaJson.Bairro, fotos, casaJson.UrlFicha, casaJson.Area);

				casas.push(casa);
			}


			resolve(casas);
		});
	}


	function requestPing(objBusca){


		return new Promise(function(resolve, reject){

			objBusca.pagina=1;

			var objRequest = gerarDadosRequest(objBusca);

			request({
				headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36' },
				url: objRequest.link,
				method: 'POST',
				formData : objRequest.data
			},function(error, headers, json){

				var objJson = JSON.parse(json);

				resolve(5);


			});


		});



	}


	module.exports = HelperZap;



})();