app.controller('profileController', ($scope, toastr, $http, $window) => {
    $scope.user = null;
    $scope.init = () => {
        if (!$scope.user) $window.location.href = '/';
    };
    $scope.logout = () => {
        $http.get('/logout')
            .then((response) => {
                toastr.success('Sesión cerrada', 'Éxito');
                $window.location.href = '/';
            });
    };
})