(function(){
	
	'use strict';

	var Promise = require('bluebird'),
	request = require('request'),
	cheerio = require('cheerio');


	var HelperZap = {};

	HelperZap.parse = function(objBusca) {


		return new Promise(function(resolve,reject) {
			var objZap = {acao: '', tipoDeImovel: '', cidade: '',precomaximo: 0, parametrosautosuggest: [], pagina: 1};

			objZap.acao = objBusca.acao;
			objZap.tipoDeImovel = objBusca.tipoDeImovel;
			objZap.cidade = objBusca.cidade;

			objZap.precomaximo = objBusca.precoMaximo;

			objZap.parametrosautosuggest.push({Cidade: objBusca.cidade});

			if (objBusca.bairro)
				objZap.parametrosautosuggest.push({Bairro: objBusca.bairro});


			objZap.pagina = 1;

			var url = gerarLink(objZap);

			request({
				headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36' },
				url: url,
				method: 'GET'
			},function(error, headers, html){

				resolve(extrairDados(html));


			});


		});
	};


	function gerarLink(obj){

		var url = 'http://www.zapimoveis.com.br/';

		url += obj.acao + '/';
		url += obj.tipoDeImovel + '/';
		url += obj.cidade + '/#';



		var objParametros = {};

		objParametros.precomaximo = obj.precomaximo;
		objParametros.parametrosautosuggest = obj.parametrosautosuggest;
		objParametros.pagina = obj.pagina;

		url += JSON.stringify(objParametros);
		console.log(url);
		return url;

	}


	function extrairDados(html) { 

		var $ = cheerio.load(html);

		var divs = $('.box-default');
		var casas = [];


		for (var i = 0 ; i < divs.length; i++) {

			var div = $(divs[i]);

			var casa = {};

			casa.link = $(div.find('a')[0]).attr('href');
			casa.bairro = div.find('.bairro').text();
			casa.preco = div.find('.price').text();
			casas.push(casa);

		};

		return casas;
	}

	module.exports = HelperZap;


})();