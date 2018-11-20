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
    $scope.getProds = (id) =>{    
        $http.get('/product?id=' + id).then(function(result) {
            var res = result.data[0]
            console.log(res)
            $scope.prods.push(res)
        }).catch(function() {
            return null
        });
  
    };
    $scope.getProductos = () =>{  
        $scope.user.products.forEach(element => {
            $scope.getProds(element)
        });
    };
    $scope.cambiaProdModal = (p) =>{  
        $scope.prodModal = p
    };
});

app.filter('toString', function() {
    return function(x) {
        var i, c, txt = "";
        for (i = 0; i < x.length; i++) {
            c = x[i];
            if (i % 2 == 0) {
            
            }
            txt += c;
        }
        return txt;
    };
});

