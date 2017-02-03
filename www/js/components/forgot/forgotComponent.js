app.component("forgot", {
    templateUrl: "js/components/forgot/forgot.html",
    controller: function($scope, $state,ForgotPasswordService,$ionicPopup) {
      $scope.title = $state.name;
      $scope.user = {};
      $scope.msg = [];
      $scope.forgot = function(frm) {
           
            // If Form Valid 
        if (frm.$valid) {
             ForgotPasswordService.forgot($scope.user).then(
                    function(res) {

                     console.log(res.data); 
            })
        }; // forgot password END 
      }
      
     }
});
