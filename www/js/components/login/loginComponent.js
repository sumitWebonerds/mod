app.component("login", {
    templateUrl: "js/components/login/login.html",
    controller: function($scope, $state, LoginService,$ionicPopup) {
      $scope.title = $state.name;
      $scope.user = {};
      $scope.msg = [];
      $scope.login = function(frm) {
           console.log($scope.user); 
            // If Form Valid 
        if (frm.$valid) {

            LoginService.login($scope.user).then(
                    function(res) {

                     console.log(res.data); 
            })
        }; // Sign up END 
      }
      
     }
});
