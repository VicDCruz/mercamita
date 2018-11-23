app.controller('createUserCtrl', ($scope, toastr, $http, $window) => {
    $scope.logout = () => {
        $http.get('/logout')
            .then((response) => {
                toastr.success('Sesión cerrada', 'Éxito');
                $window.location.href = '/';
            });
    };
    $scope.create = (user, passwordNew) => {
        if (!$scope.verifyParams(user, passwordNew)) {
            toastr.error('Contraseñas no coinciden o correo mal escrito', 'Verificar');
        } else {
            
            if (!($scope.user && $scope.user.name && $scope.user.account &&
                    $scope.user.email && $scope.user.telephone)) {
                toastr.error('Faltan datos', 'Verificar');
            } else {
                $http.post('/users/new', user)
                    .then((response) => {
                        if (response.data.status === 200) {
                            toastr.success('Nuevo usuario creado', 'Éxito');
                            $scope.user.id = response.data.id;
                        } else {
                            toastr.error('Usuario o contraseña incorrecta', 'Error');
                        }
                    });
                $http.get('/users/verify?account=' + $scope.user.account+'&password=' + $scope.user.password)
                    .then((response) => {
                        if (response.data.status === 200) {
                            toastr.success('Bienvenido', 'Éxito');
                            $window.location.href = '/profile';
                        } else {
                            toastr.error('Usuario o contraseña incorrecta', 'Error');
                        }
                    });
            }
        }
    };
    $scope.verifyParams = (user, passwordNew) => {
        return passwordNew && user && 
            user.password === passwordNew && user.email.includes('@');
    };
})