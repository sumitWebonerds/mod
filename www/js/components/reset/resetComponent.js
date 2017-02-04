app.component("reset", {
    templateUrl: "js/components/reset/reset.html",
    controller: function($scope, $state,ResetPasswordService,$ionicPopup,sessionService) {
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
         var currentUser= {};
         currentUser = sessionService.get("moduser");
        
             ResetPasswordService.reset({Authorization:currentUser.authKey,data:$scope.user}).then(
                    function(res) {

                     console.log(res.data); 
                     if(res.data.status=='fail'){

                      $scope.failmsg = res.data.msg;
                     
                     }else{

                      $scope.successmsg = res.data.msg;
                     
                     }
                     
                    
            })
        }; // forgot password END 
      }
      
     }
});
