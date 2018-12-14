app.controller('readCtrl', ($scope, toastr, $http, $window) => {
    $scope.logout = () => {
        $http.get('/logout')
            .then((response) => {
                toastr.success('Sesión cerrada', 'Éxito');
                $window.location.href = '/';
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
})