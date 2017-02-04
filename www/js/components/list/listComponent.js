app.component("list", {

    templateUrl: "js/components/list/list.html",

    controller: function($scope,$ionicListDelegate,ListService,sessionService) {
    
        $scope.data = [];

        $scope.update = function(item) {
          console.log(item);
          $ionicListDelegate.closeOptionButtons();  // this closes swipe option buttons after alert
        
        };
        $scope.normal = function(item) {
         
          $ionicListDelegate.closeOptionButtons();  // this closes swipe option buttons after alert
        
        };
        $scope.ok = function(item) {

          $ionicListDelegate.closeOptionButtons();  // this closes swipe option buttons after alert

        };
         var currentUser= {};
         currentUser = sessionService.get("moduser");
        // console.log(currentUser.authKey);
         ListService.list({Authorization:currentUser.authKey}).then(
                    function(res) {
                     console.log(res.data);
                     if(res.data.status=='fail'){

                     }else{
                     $scope.data = res.data.CaseNotes;
                     }

        })
    }
});
