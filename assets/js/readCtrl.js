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
    $scope.addWL = () => {
        console.log($scope.product)
        $http.put('/users/'+$scope.user.id+'?prod='+$scope.product.id+'&change=wl').then((response) => {
            alert('Añadido a lista de deseos');
            $scope.enWL = true;
            //$window.location.href = '/products/'+$scope.product.id;
        })
    },
    $scope.removeWL = () => {
        $http.put('/users/'+$scope.user.id+'?prod='+$scope.product.id+'&change=wl&remove=true').then((response) => {
            alert('Eliminado de la lista de deseos');
            $scope.enWL = false;
            //$window.location.href = '/products/'+$scope.product.id;
        })
    },
    $scope.init = () => {
        if($scope.user != null){
            $http.get('/users/'+$scope.user.id).then((response) => {
                console.log('en read')
                var wl = response.data.wishList;
                wl.forEach(element => {
                    if(element == $scope.product.id){
                        $scope.enWL = true;
                    }
                });
                
            })
        }
        
    }
})