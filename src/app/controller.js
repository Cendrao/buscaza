app.controller('buscaController', [ '$scope', '$http', buscaController]);

function buscaController($scope, $http){

	function init(){
		$scope.listaImoveis=[];
		$scope.busca = {cidade: '', precoMaximo: 0};

		$scope.paginaAtual = 1;
		$scope.quantidadePaginas =1;

		$scope.app = { carregando: false };

	}

	$scope.fazPesquisa = function(pagina){
		$scope.app.carregando=true;
		var objConsulta = { acao: 'venda', tipoDeImovel: 'casas', cidade: $scope.busca.cidade, precoMaximo: $scope.busca.precoMaximo, pagina: pagina };

		$http.post('/casas', objConsulta)
		.success(function(data){

			$scope.quantidadePaginas = data.QuantidadePaginas;
			$scope.listaImoveis.addRange( data.Resultado);
			$scope.app.carregando=false;


		});

	};

	$scope.carregarMais = function(){

		if ( ($scope.paginaAtual < $scope.quantidadePaginas ) &&  !$scope.app.carregando){

			$scope.paginaAtual++;
			$scope.fazPesquisa($scope.paginaAtual);

		}

	};

	init();

}

