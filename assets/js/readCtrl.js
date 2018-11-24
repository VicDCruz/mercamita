app.controller('readCtrl', ($scope, toastr, $http, ngDialog, $window) => {
    $scope.logout = () => {
        $http.get('/logout')
            .then((response) => {
                toastr.success('Sesión cerrada', 'Éxito');
                $window.location.href = '/';
            });
    };
    $scope.clickToOpen = function () {
        console.log('Hola');
        
        ngDialog.open({
            template: '<p>my template</p>',
            plain: true
        });
    };
})