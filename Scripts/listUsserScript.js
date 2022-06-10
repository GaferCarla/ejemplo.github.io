var myApp = angular.module('myApp', []);

myApp.controller('namesCtrl', function ($scope, $filter) {
    $scope.triggerForm = false;
    $scope.order = 'name';

    $scope.users = [
        { id: 1, name: 'Jani', lastname: 'Mendez', email: 'example@gustr.com', bussiness: 'Google', department: 'Gerencia', office: 'California', role: 'Gerente', group: 'Ejecutivo' },
        { id: 2, name: 'Daniela', lastname: 'Ortega', email: 'example@gustr.com', bussiness: 'Facebook', department: 'Gerencia', office: 'California', role: 'Gerente', group: 'Ejecutivo' },
        { id: 1, name: 'Luis', lastname: 'Contreras', email: 'example@gustr.com', bussiness: 'Twitter', department: 'Gerencia', office: 'California', role: 'Gerente', group: 'Ejecutivo' },
    ];



    $scope.orderBy = function (filter) {
        $scope.order = filter;
    };

});
