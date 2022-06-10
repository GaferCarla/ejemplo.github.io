

/* FUNCIÓN PARA REORDENAR LAS COLUMNAS POR ORDEN ALFABÉTICO */
var myApp = angular.module('myApp', []);

myApp.controller('namesCtrl', function ($scope, $filter) {
    $scope.triggerForm = false;
    $scope.order = 'title';

    $scope.users = [
        { id: 1, title: 'Z', dateSurvey: '22/02/2022' },
        { id: 2, title: 'B', dateSurvey: '23/02/2022' },
        { id: 3, title: 'A', dateSurvey: '24/02/2022' },
    ];



    $scope.orderBy = function (filter) {
        $scope.order = filter;
    };

});



