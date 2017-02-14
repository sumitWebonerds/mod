app.component("signup", {
    templateUrl: "js/components/signup/signup.html",
    controller: function($scope, $state, SignupService,$ionicPopup) {
        $scope.title = $state.name;
        $scope.user = {};
        $scope.msg = [];
        $scope.isEmpty = function(obj) {
            for (var i in obj)
                if (obj.hasOwnProperty(i)) return false;
            return true;
        };
        $scope.signup = function(frm) {
           
            // If Form Valid 
        if (frm.$valid) {
            //  console.log($scope.user);
                SignupService.signup($scope.user).then(
                    function(res) {
                      if(res.data.status=='fail'){

                        $scope.msg = res.data.errors;
                        console.log(res.data.errors);
                      
                      }else{
                        var alertPopup = $ionicPopup.alert({
                           title: 'Verify Email',
                           template: res.data.msg
                         });

                           alertPopup.then(function(res) {
                      
                              $state.go('app.login'); 
                          });

                          $scope.msg = res.data.data;
                          console.log(res.data.data);
                      
                      }
                      // $scope.msg = res.data.errors;
                      // console.log(res.data.errors);
            }) // if From valid END
        }; // Sign up END 
    }
      

     }
});
