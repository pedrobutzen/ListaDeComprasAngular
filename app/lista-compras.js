var compras = angular.module('compras', []);
compras.filter('getIndexById', function() {
    return function(input, id) {
        var len = input.length;
        for (var i = 0; i < len; i++) {
            if (input[i].id === id) {
                return i;
            }
        }
        return null;
    };
});
compras.controller('ListaComprasController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
        $scope.itens = {};
        $scope.itemInput = {produto: '', quantidade: '', comprado: false};
        $http.get('webservice/').
                success(function(data) {
                    $scope.itens = data;
                    $scope.ordenador = 'produto';
                    $scope.inverter = false;
                }).
                error(function(data, status, headers, config) {
                    alert("Erro ao listar!");
                });

        $scope.adicionaItem = function() {
            $http.post('webservice/', $scope.itemInput).
                    success(function(data) {
                        $scope.itens.push({comprado: false, produto: $scope.itemInput.produto,
                            quantidade: $scope.itemInput.quantidade, id: data[0].id});
                        $scope.itemInput.produto = $scope.itemInput.quantidade = '';
                    }).
                    error(function(data, status, headers, config) {
                        alert("Erro ao inserir!");
                    });
        };
        $scope.deleteItem = function(id) {
            $http.delete('webservice/?id=' + id).
                    success(function(data) {
                        var indice = $filter('getIndexById')($scope.itens, id);
                        $scope.itens.splice(indice, 1);
                    }).
                    error(function(data, status, headers, config) {
                        alert("Erro ao deletar!");
                    });

        };
        $scope.editarItem = function(id) {
            var itemEditar = $filter('filter')($scope.itens, {id: id}, true);
            console.log(itemEditar);
            $scope.itemInput.produto = itemEditar.produto;
            $scope.itemInput.quantidade = itemEditar.quantidade;
            /*$http.post('webservice/', $scope.item).
             success(function(data) {
             console.log(data);
             $scope.itens.push({produto: $scope.item.produto,
             quantidade: $scope.item.quantidade,
             comprado: false});
             $scope.item.produto = $scope.item.quantidade = '';
             }).
             error(function(data, status, headers, config) {
             alert("Erro ao inserir!");
             });*/
        };
    }]);