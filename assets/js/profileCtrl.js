app.controller('profileCtrl', ($scope, toastr, $http, $window) => {
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


         /* 
app.directive('fileModel', ['$parse', function ($parse) {
   return {
      restrict: 'A',
      link: function(scope, element, attrs) {
         var model = $parse(attrs.fileModel);
         var modelSetter = model.assign;
         
         element.bind('change', function() {
            scope.$apply(function() {
               modelSetter(scope, element[0].files[0]);
            });
         });
      }
   };
}]);
app.service('fileUpload', ['$https:', function ($https) {
   this.uploadFileToUrl = function(file, uploadUrl) {
      var fd = new FormData();
      fd.append('file', file);
   
      $https.post(uploadUrl, fd, {
         transformRequest: angular.identity,
         headers: {'Content-Type': undefined}
      })
      .success(function() {
      })
      .error(function() {
      });
   }
}]);
app.controller('picCtrl', ['$scope', 'fileUpload', function($scope, fileUpload) {
   $scope.uploadFile = function() {
      
      var file = $scope.myFile;
      console.log('file is ' );
      console.dir(file);
      var uploadUrl = "/fileUpload";
      fileUpload.uploadFileToUrl(file, uploadUrl);
   };
}]); */
