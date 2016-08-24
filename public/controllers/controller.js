var clientsApp = angular.module('clientsApp', ['ngMaterial', 'ngAnimate', 'md.data.table', 'ngMessages'])
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
        $scope.client = {
            "maritalstatus": "",
            "phonenumber": [{
                id: 'phone0'
            }]
        }

        $scope.exibirForm = false;
        $scope.edicao = false;
        $scope.textoBotao = "+";
        /*        $scope.client.phonenumber = [{
                    id: 'phone1'
                }];*/

        /* CONTROLE CAMPO DE TELEFONE */
        $scope.addPhone = function () {
            $scope.client.phonenumber.push({
                'id': 'phone' + ($scope.client.phonenumber.length + 1)
            });
        };

        $scope.removePhone = function (item) {
            $scope.client.phonenumber.splice(item, 1);
        };

        var mostrarForm = function () {
            $scope.exibirForm = !$scope.exibirForm;
            $scope.textoBotao = $scope.exibirForm ? "-" : "+";
        }

        $scope.addNewClient = function () {
            $scope.client = "";
            $scope.exibirForm = !$scope.exibirForm;
            $scope.textoBotao = $scope.exibirForm ? "-" : "+";
        }

        $scope.submitForm = function () {
            console.log("submitForm");
            $http.post('/clients', $scope.client).success(function (response) {
                console.log("POST!");
                refresh();
            });
        }

        var refresh = function () {
            $http.get('/clients').success(function (response) {
                console.log("SUBMIT OK!");
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

        $scope.remove = function (id) {
            $http.delete('/clients/' + id).success(function (response) {
                refresh();
            })
        }

        $scope.edit = function (id) {
            $http.get('/clients/' + id).success(function (response) {
                console.log("EDIT:", response);
                $scope.client = response;
                mostrarForm();
                $scope.edicao = true;
            });
        }

        $scope.update = function () {
            console.log("UPDATE", $scope.client);
            console.log($scope.client._id);
            $http.put('/clients/' + $scope.client._id, $scope.client).success(function (response) {
                refresh();
            });
        }
}]);
