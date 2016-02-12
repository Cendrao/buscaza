app.controller('buscaController', [ '$scope', '$http', buscaController]);

function buscaController($scope, $http){
	
	function init(){
		$scope.listaImoveis=[];
		$scope.busca = {cidade: '', precoMaximo: 0};
		
		//$scope.fazPesquisa();
	}

	$scope.fazPesquisa = function(){

		var objConsulta = { acao: 'venda', tipoDeImovel: 'casas', cidade: $scope.busca.cidade, precoMaximo: $scope.busca.precoMaximo };

		$http.post('/casas', objConsulta)
		.success(function(data){

			$scope.listaImoveis = data;

		});

	};

	init();

}