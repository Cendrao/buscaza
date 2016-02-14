app.controller('buscaController', [ '$scope', '$http', buscaController]);

function buscaController($scope, $http){

	function init(){
		$scope.listaImoveis=[];
		$scope.busca = {cidade: '', precoMaximo: 0};

		$scope.quantidadePaginas = 1;
		$scope.paginaAtual = 0;
		
		$scope.app = { carregando: false };

	}

	$scope.fazPesquisa = function(pagina){
		if (pagina == 0)
			$scope.listaImoveis =[];

		$scope.app.carregando=true;
		var objConsulta = { acao: 'venda', tipoDeImovel: 'casas', cidade: $scope.busca.cidade, precoMinimo: $scope.busca.precoMinimo, precoMaximo: $scope.busca.precoMaximo, pagina: pagina };

		$http.post('/casas', objConsulta)
		.success(function(data){

			if (pagina == 0)
				$scope.paginaAtual = data.QuantidadePaginas;

			$scope.listaImoveis.addRange( data.Resultado);
			$scope.app.carregando=false;


		});

	};

	$scope.carregarMais = function(){

		if ( ($scope.paginaAtual > 1 ) &&  !$scope.app.carregando){

			$scope.paginaAtual--;
			$scope.fazPesquisa($scope.paginaAtual);

		}

	};

	init();

}

