app.controller('createProdCtrl', ($scope, toastr, $http, $window) => {
    $scope.user = null;
    var id;
    $scope.init = () => {
        if (!$scope.user) $window.location.href = '/';
        id = $scope.user.id
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
        var cant = document.getElementById('fileUp').files.length;
        console.log(cant)
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
            if(document.getElementById('radio'+i).checked)
                tag = document.getElementById('radio'+i).value
        }
        
        if(cantCheck == 0){
            toastr.error('Eliga al menos una categoría')
        }

        if(tag == '')
            toastr.error('Eliga una etiqueta')
        
        
        console.log(tag)
        
        console.log(':)')
        
            /* if($scope.guardaImgs(cant)){
                //falta subir imagenes */
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
                                //alert('Producto publicado exitosamente');
                                //$window.location.href='/profile';
                            }else{
                                toastr.error('No se ha podido publicar el producto');
                            }

                        })
                }else{
                    toastr.error('No se ha podido publicar el producto');
                }
            })
            
            
        
    },

    $scope.guardaImgs = (cant) =>{
        for(var i = 0; i < cant; i++){
            var f = document.getElementById('fileUp').files[i]
            
            
            console.log(f)
            $http.post('/picture?prod='+f).then((response) => {
                if(response.data.status === 200){
                    toastr.info("Imágenes exitosamente cargadas");
                    return true
                }else{
                    toastr.error('No se ha podido subir las imágenes');
                    return false
                }
            })
        }
        
    },

    $scope.createProd = () => {
        if($scope.guardaImgs(cant)){
            //falta subir imagenes
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
        }
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