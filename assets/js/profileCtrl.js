app.controller('profileCtrl', ($scope, toastr, $http, $window) => {
   $scope.user = null;
   $scope.init = () => {
      if (!$scope.user) $window.location.href = '/';
        id = $scope.user.id
      $http.get('user/?id='+$scope.user.id).then(function(result) {
         $scope.user = result.data[0]
         $scope.getProductos()
         if($scope.user.products.length > 0)
            $scope.contP = true;
         if($scope.user.wishList.length > 0)
            $scope.contW = true;
         

         console.log($scope.user)
      })
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
      $scope.prods.push(res)
      console.log(res)
   }).catch(function() {
      return null
   });
 };
 $scope.getWL = (id) =>{
   $http.get('/product?id=' + id).then(function(result) {
      var res = result.data[0]
      $scope.prodsWL.push(res)
   }).catch(function() {
      return null
   });
 };
 $scope.getProductos = () =>{
   var prod = $scope.user.products
   var prodWL = $scope.user.wishList
   if(prod != undefined)
      prod.forEach(element => {
      $scope.getProds(element)
   });
 
   if(prodWL != undefined)
      prodWL.forEach(element =>{
         $scope.getWL(element)
      })
   };
 
 $scope.cambiaProdModal = (p) =>{
   $scope.prodModal = p
 };
 
 $scope.getVendedor = (id) => {
   $scope.prodModal = id
   $http.get('/user?id=' + id.seller).then(function(result) {
      var res = result.data[0]
      $scope.sellers.push(res)
   }).catch(function() {
      return null
   });
 }
 });
 
 app.controller('imgCtrl',($scope,toastr,$http,$window) => {
   $scope.verificaCantImgs = (tipo) =>{
      var imgs = document.getElementById('fileUp');
      var cant = imgs.files.length
      switch (tipo){
         case "profile": if(cant == 0)
                           toastr.error("Seleccione un archivo archivo");
                        else
                           if(cant > 1)
                              toastr.error("Solamente 1 imagen permitida")
                           else
                              $scope.subeImg(1,tipo)
                        break;
         case "prod":  if(cant == 0)
                           toastr.error("Seleccione entre 1 y 4 archivos");
                        else
                           if(cant > 4)
                              toastr.error("Máximo 4 archivos");
                           else
                              $scope.subeImg(cant,tipo)
                        break;
      }
 
   },
   $scope.subeImg = (cant,tipo) => {
      var id = $scope.user.id
      for(var i = 0; i < cant; i++){
         console.log("va imagen: " + (i+1))
         console.log(id)
         $http.get('/users/'+id+'?tipo='+tipo).then(function(result) {
            var res = result
            console.log(res)
 
        }).catch(function() {
            return null
        });
 
      }
   },
   $scope.msgRefreca = ()=>{
      toastr.info("Refresque la página para ver cambios")
   }
 });