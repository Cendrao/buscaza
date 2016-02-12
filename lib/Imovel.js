(function(){

	'use strict';


	function Imovel(valor, cidade, quartos, vagas, bairro, fotos, link, area){
		this.Valor = valor;
		this.Cidade= cidade;
		this.Quartos = quartos;
		this.Vagas = vagas;
		this.Bairro = bairro;
		this.Fotos = fotos;
		this.Link = link;
		this.Area = area;
	}


	module.exports = Imovel;

})();