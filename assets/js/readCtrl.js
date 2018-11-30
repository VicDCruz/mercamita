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
            ariaLabel: product.name,
            ok: 'Sí',
            cancel: 'No'
        });

        $mdDialog
            .show(alert)
            .then(function() {
                $window.location.href = 'http://www.google.com.mx'; // Mientras no estén las rutas
            }, function() {
                $window.location.href = 'http://www.yahoo.com.mx';
            });
    };
})