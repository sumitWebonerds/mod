app.component("login", {
    templateUrl: "js/components/login/login.html",
    controller: function($scope, $state, LoginService,sessionService,$ionicPopup) {
      $scope.title = $state.name;
      $scope.user = {};
      $scope.msg = [];

      //function for check empty object 

      $scope.isEmpty = function(obj) {
            for (var i in obj)
                if (obj.hasOwnProperty(i)) return false;
            return true;
        };


      $scope.login = function(frm) {
           console.log($scope.user); 
            // If Form Valid 
        if (frm.$valid) {

            LoginService.login($scope.user).then(
                    function(res) {
                     if(res.data.status=='fail'){

                      $scope.msg=res.data.message;                      
                     
                     }else{

                        sessionService.set("moduser",res.data.data);
                        var alertPopup = $ionicPopup.alert({
                             title: 'Success',
                             template: res.data.message,
                           });

                             alertPopup.then(function(res) {
                        
                               $state.go('app.list'); 
                            });
                         console.log(res.data);   
                     
                     } 
                    
            })
        }; // login END 
      }
      
     }
});
