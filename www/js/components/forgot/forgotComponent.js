app.component("forgot", {
    templateUrl: "js/components/forgot/forgot.html",
    controller: function($scope, $state,ForgotPasswordService,$ionicPopup) {
      $scope.title = $state.name;
      $scope.user = {};
      $scope.msg = [];


      $scope.isEmpty = function(obj) {
            for (var i in obj)
                if (obj.hasOwnProperty(i)) return false;
            return true;
        };

      $scope.forgot = function(frm) {
           
            // If Form Valid 
        if (frm.$valid) {
             ForgotPasswordService.forgot($scope.user).then(
                    function(res) {

                     if(res.data.status=='fail'){

                      $scope.msg = res.data.msg;

                     }else{
                      $scope.msg = res.data.msg;
//                      res.data.msg = $scope.msg; 

                     }
            })
        }; // forgot password END 
      }
      
     }
});
