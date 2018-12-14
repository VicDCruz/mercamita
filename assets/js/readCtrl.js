app.controller('readCtrl', ($scope, toastr, $http, $window, $mdDialog) => {
    $scope.logout = () => {
        $http.get('/logout')
            .then((response) => {
                toastr.success('Sesión cerrada', 'Éxito');
                $window.location.href = '/';
            });
    };
    $scope.comprar = (idProduct) => {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('¿Seguro que desea comprar el producto?')
            .textContent('')
            .ariaLabel('Lucky day')
            .ok('Sí')
            .cancel('No');

        $mdDialog.show(confirm).then(function() {
            if ($scope.user) {
                $window.location.href = '/buy/' + idProduct;
            } else {
                $window.location.href = '/login';
            }
        }, function() {
        
        });
    };
})