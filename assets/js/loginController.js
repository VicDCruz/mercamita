app.controller('loginController', ($scope, toastr, $http, $window) => {
    $scope.verify = () => {
        if (!$scope.account || !$scope.password) {
            toastr.error('Usuario o contraseña incorrecta', 'Error');
        } else {
            $http.get('/users/verify?account=' + $scope.account+'&password=' + $scope.password)
                .then((response) => {
                    if (response.data.status === 200) {
                        toastr.success('Bienvenido', 'Éxito');
                        $window.location.href = '/';
                    } else {
                        toastr.error('Usuario o contraseña incorrecta', 'Error');
                    }
                });
        }
    };
})