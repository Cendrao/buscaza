(function(){

	'use strict';


	function Imovel(valor, cidade, quartos, vagas, bairro, fotos, link, area){
		this.Valor = valor;
		this.Cidade= cidade;
		this.Quartos = quartos;
		this.Vagas = vagas;
		this.Bairro = bairro;
		this.Fotos = [];

		for(var i = 0 ; i < fotos.length; i++)
		{
			var foto  = fotos[i];
			this.Fotos.push({ Imagem: foto});
		}
		this.Link = link;
		this.Area = area;
	}


	module.exports = Imovel;

})();