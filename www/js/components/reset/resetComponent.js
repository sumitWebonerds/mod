app.component("reset", {
    templateUrl: "js/components/reset/reset.html",
    controller: function($scope, $state,ResetPasswordService,$ionicPopup) {
      $scope.title = $state.name;
      $scope.user = {};
      $scope.msg = [];


      $scope.isEmpty = function(obj) {
            for (var i in obj)
                if (obj.hasOwnProperty(i)) return false;
            return true;
        };
      $scope.reset = function(frm) {
           
            // If Form Valid 
        if (frm.$valid) {
             ResetPasswordService.reset($scope.user).then(
                    function(res) {

                     console.log(res.data); 
                     if(res.data.status=='fail'){
                      $scope.msg=res.data.data;
                     }else{
                      $scope.msg=res.data.data;
                     }
            })
        }; // forgot password END 
      }
      
     }
});
