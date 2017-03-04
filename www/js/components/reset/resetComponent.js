app.component("reset", {
    templateUrl: "js/components/reset/reset.html",
    controller: function($scope, $state,$ionicLoading,ResetPasswordService,$ionicPopup,sessionService) {
      $scope.title = $state.name;
      $scope.user = {};
      $scope.successmsg = [];
      $scope.failmsg = [];

      $scope.isEmpty = function(obj) {
            for (var i in obj)
                if (obj.hasOwnProperty(i)) return false;
            return true;
        };
      $scope.reset = function(frm) {
           
            // If Form Valid 
        if (frm.$valid) {
        $ionicLoading.show({
          template: '<ion-spinner icon="spiral" class="spinner-positive"></ion-spinner> <br>Loading...',
          noBackdrop: true,
          animation: 'fade-in'
        });  
         var currentUser= {};
         currentUser = sessionService.get("moduser");
            
             ResetPasswordService.reset({Authorization:currentUser.authKey,data:$scope.user}).then(
                    function(res) {

                     console.log(res.data); 
                     if(res.data.status=='fail'){
                       $ionicLoading.hide();
                      $scope.failmsg = res.data.msg;
                     
                     }else{
                       $ionicLoading.hide();
                      $scope.successmsg = res.data.msg;
                     
                     }
                     
                    
            })
        }; // forgot password END 
      }
      
     }
});
