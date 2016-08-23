var clientsApp = angular.module('clientsApp', ['ngMaterial', 'ngAnimate'])
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
            "maritalstatus": ""
        }

        $scope.exibirForm = false;
        $scope.textoBotao = "+";


        $scope.addNewClient = function () {
            $scope.exibirForm = !$scope.exibirForm;
            $scope.textoBotao = $scope.exibirForm ? "-" : "+";
        }

        $scope.submitForm = function () {
            console.log("clicou submit");
            $http.post('/clients', $scope.client);

            $scope.exibirForm = false;
            $http.get('/clients').success(function (response) {
                $scope.clientList = response;
                addNewClient();
            });

        }
}]);
