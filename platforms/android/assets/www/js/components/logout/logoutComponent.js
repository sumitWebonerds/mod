app.component("logout", {
    templateUrl: "js/components/logout/logout.html",
    controller: function($scope, $state,sessionService,$ionicPopup) {
      $scope.title = $state.name;
      $scope.user = {};
      $scope.msg = [];
      $scope.logout = function(){
          var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm',
            template: 'Are you sure?'
          });
          confirmPopup.then(function(res) {
               if(res) {

                 sessionService.destroy("moduser");               
                 $state.go('app.login'); 
                 
               
               } else {

                  console.log('Not sure!');
               }
          });
          
      
      };


        
     }
});
