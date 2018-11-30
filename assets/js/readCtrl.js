app.controller('readCtrl', ($scope, toastr, $http, $window, $mdDialog) => {
    var alert;
    $scope.logout = () => {
        $http.get('/logout')
            .then((response) => {
                toastr.success('Sesión cerrada', 'Éxito');
                $window.location.href = '/';
            });
    };
    $scope.confirmBuy = function () {
        alert = $mdDialog.confirm({
            title: 'Confirmar compra',
            textContent: '¿Estás seguro de comprar el producto?',
            ariaLabel: $scope.product.name,
            ok: 'Sí',
            cancel: 'No'
        });

        $mdDialog
            .show(alert)
            .then(function() {
                // $http.post('http://www.google.com.mx', user)
                //     .then((response) => {
                //         if (response.data.status === 200) {
                //             // toastr.success('Nuevo usuario creado', 'Éxito');
                //             // $scope.user.id = response.data.id;
                //         } else {
                //             // toastr.error('Usuario o contraseña incorrecta', 'Error');
                //         }
                //     });
                $window.location.href = 'http://www.google.com.mx'; // Mientras no estén las rutas
            }, function() { });
    };
    $scope.addToWishlist = () => {
        if ($scope.user == null) {
            toastr.error("Debes iniciar sesión para continuar");
        } else {
            $http.put('/users/' + $scope.user.id + '/wishlist', {newProduct: $scope.product.id})
                .then((response) => {
                    if (response.data.status === 200) {
                        toastr.success('Producto agregado a tu Wishlist', 'Éxito');
                    } else {
                        toastr.error('Ocurrió un error', '¡Ups!');
                    }
                });
        } 
    }
})