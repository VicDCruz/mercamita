app.controller('infoEditorPopUpCtrl', ($scope, toastr, $http, $window) => {
    $scope.validate = () => {
        toastr.info('Hola. Funciono');
        // if (!$scope.password) {
        //     toastr.error('Contraseña incorrecta. Favor de reingresar', 'Error');
        // } else {
        //     $http.get('/users/verify?password=' + $scope.password)
        //         .then((response) => {
        //             if (response.data.status === 200) {
        //                 toastr.success('Éxito al cambiar', 'Éxito');
        //                 $window.location.href = '/';
        //             } else {
        //                 toastr.error('Contraseña incorrecta. Favor de reingresar', 'Error');
        //             }
        //         });
        // }
    };
});
