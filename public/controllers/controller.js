var clientsApp = angular.module('clientsApp', ['ngMaterial', 'ngAnimate', 'ngAria', 'md.data.table', 'ngMessages'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('blue');
    });

clientsApp.controller('ClientsListCtrl', ['$scope', '$http',

function ($scope, $http) {

        $http.get('/clients').success(function (response) {
            $scope.clientList = response;
        });

        $scope.maritalstatuses = [
            {
                id: 'single',
                value: 'Single'
            },
            {
                id: 'married',
                value: 'Married'
            },
            {
                id: 'divorced',
                value: 'Divorced'
            },
            {
                id: 'widowed',
                value: 'Widowed'
            },
    ];

        $scope.exibirForm = false;
        $scope.edicao = false;
        $scope.textoBotao = "+";

        $scope.addPhone = function () {
            $scope.client.phonenumber.push({
                'id': 'phone' + ($scope.client.phonenumber.length + 1)
            });
        };

        $scope.removePhone = function (item) {
            $scope.client.phonenumber.splice(item, 1);
        };

        var mostrarForm = function () {
            $scope.exibirForm = true;
            $scope.textoBotao = $scope.exibirForm ? "-" : "+";
        }

        $scope.addNewClient = function () {
            $scope.client = "";
            $scope.client = {
                "maritalstatus": ""
            }
            $scope.client.phonenumber = [{
                id: 'phone1'
        }];
            $scope.exibirForm = !$scope.exibirForm;
            $scope.textoBotao = $scope.exibirForm ? "-" : "+";
        }

        $scope.submitForm = function () {
            $http.post('/clients', $scope.client).success(function (response) {
                refresh();
            });
        }

        var refresh = function () {
            $http.get('/clients').success(function (response) {
                $scope.clientList = response;
                $scope.client = "";
                $scope.exibirForm = false;
                $scope.edicao = false;
                $scope.textoBotao = $scope.exibirForm ? "-" : "+";
            });
        }

        $scope.cancelForm = function () {
            refresh();
        }

        $scope.remove = function (cpf) {
            $http.delete('/clients/' + cpf).success(function (response) {
                refresh();
            })
        }

        $scope.edit = function (cpf) {
            if (cpf != null) {
                $http.get('/clients/' + cpf).success(function (response) {
                    if (response != "") {
                        $scope.client = response;
                        mostrarForm();
                        $scope.edicao = true;
                    }
                });
            }
        }

        $scope.update = function () {
            $http.put('/clients/' + $scope.client.cpf, $scope.client).success(function (response) {
                refresh();
            });
        }


}]);
