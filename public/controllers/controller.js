var clientsApp = angular.module('clientsApp', ['ngMaterial', 'ngMessages', 'ngAnimate'])
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


        $scope.addNewClient = function () {
            $scope.exibirForm = true;
        }

        $scope.submitForm = function () {
            console.log("clicou submit");
            $http.post('/clients', $scope.client);
        }
}]);
