app.controller('createProdCtrl', ($scope, toastr, $http, $window, fileUpload) => {
    $scope.user = null;
    var id;
    $scope.init = () => {
        if (!$scope.user) $window.location.href = '/';
        id = $scope.user.id
        $scope.images = [];
    };
    $scope.logout = () => {
        $http.get('/logout')
        .then((response) => {
           toastr.success('Sesión cerrada', 'Éxito');
           $window.location.href = '/';
        });
    };
    var seller = id;
    var views = 0;

    $scope.verificaImg = () => {
        var cant = document.getElementById('fileUp').files.length;
        if (cant == 0){
            return false;
        }
        if (cant > 4) {
            toastr.error("Seleccione menos de 5 archivos");
            return false;
        }else{
            return true;
        }
    };

    $scope.checkAndCreate = () => {
        var cat = [];
        var cantCheck = 0;
        var cantRadio = 0;
        /* if (document.getElementById('check1').checked)
            cantCheck++; */
        for(var i = 1; i <= 7; i++){
            var nom = 'check'+i;
            if(document.forms['dataForm'][''+nom].checked){
                cat.push(document.forms['dataForm'][''+nom].value)
                cantCheck++;
            }                
        }

        var tag = '';
        for(var i=1; i<=6; i++){
            if(document.getElementById('radio'+i).checked) {
                tag = document.getElementById('radio'+i).value
            }
        }
        
        if(cantCheck == 0) toastr.error('Eliga al menos una categoría')

        if(tag == '') toastr.error('Eliga una etiqueta')
        
        var prod = {
            name: document.forms['dataForm']['inputName'].value.toString(),
            views: 0,
            price: document.forms['dataForm']['inputPrice'].value,
            description: document.forms['dataForm']['inputDesc'].value.toString(),
            category: cat,
            tag: tag,
            seller: id,
            images: []
        }

        $http.post('/products/new', prod)
            .then((response) => {
                if(response.data.status === 200){
                    $http.put('/users/'+id+'?change=product&item='+response.data.id)
                        .then((response1) => {
                            if(response1.data.status === 200){
                                console.log(response.data)
                                $scope.prod = response.data
                                $scope.proceed = false;
                                $scope.guardaImgs();
                                toastr.success('¡Producto creado!');
                                // $window.location.href = '/products/' + $scope.prod.id;
                            }else{
                                toastr.error('No se ha podido publicar el producto');
                            }

                        })
                }else{
                    toastr.error('No se ha podido publicar el producto');
                }
            })
    },

    $scope.addImage = () => {
        if ($scope.images.length < 3) {
            $scope.images.push(document.getElementById('image').files[0]);
            var input = document.createElement('input');
            input.setAttribute('id', 'image');
            input.type = "file";
            document.getElementById('imagesDiv').replaceChild(input, document.getElementById('imagesDiv').childNodes[1]);
        } else {
            toastr.error('Solo 4 imágenes y con archivos');
        }
    },

    $scope.guardaImgs = () => {
        console.log(document.getElementById('image').files[0]);
        
        if (document.getElementById('image').files[0]) {
            $scope.images.push(document.getElementById('image').files[0]);
        }
        var uploadUrl = "/picture";

        console.log($scope.images);
        
        for (let i = 0; i < $scope.images.length; i++) {
            const image = $scope.images[i];
            fileUpload.uploadFileToUrl(image, uploadUrl, $scope.prod.id);
        }
        
    },

    $scope.createProd = () => {
        var prod = {
            name: document.forms['dataForm']['inputName'].value.toString(),
            views: 0,
            price: document.forms['dataForm']['inputPrice'].value,
            description: document.forms['dataForm']['inputDesc'].value.toString(),
            category: cat,
            tag: tag,
            seller: id,
            images: []
        }

        $http.post('/products/new', prod)
            .then((response) => {
                if(response.data.status === 200){
                    $http.put('/users/'+id+'?change=product&item='+response.data.id)
                        .then((response1) => {
                            if(response1.data.status === 200){
                                alert('Producto publicado exitosamente');
                                $window.location.href='/profile';
                            }else{
                                toastr.error('No se ha podido publicar el producto');
                            }

                        })
                }else{
                    toastr.error('No se ha podido publicar el producto');
                }
            })
    },

    $scope.clickToOpen = function () {
        console.log('Click a editar info de usuario');
        var newScope = $scope.$new();
        newScope.user = $scope.user;
        
        ngDialog.open({
            template: '../websites/subirImgs.html',
            //plain: true
            scope: newScope
        });
     };
    
});

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = (file, uploadUrl, id) => {
        var output = {
            id: id
        }
        var reader = new FileReader();

        reader.onload = function(e) {
            var data = reader.result;
            output.image = data;
            console.log(output);
            
            return $http({
                method: "post",
                url: uploadUrl,
                data: output,
                config: {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': 'multipart/form-data'}
                }
            }).then((response) => {
                if (response.data.status === 200) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        reader.readAsDataURL(file); 
    }
}]);