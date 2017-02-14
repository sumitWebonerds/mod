app.component("list", {

    templateUrl: "js/components/list/list.html",

    controller: function($scope,$state,$ionicListDelegate,ListService,sessionService) {
    
        $scope.data = [];
        $scope.msg = [];
        
        $scope.isEmpty = function(obj) {
            for (var i in obj)
                if (obj.hasOwnProperty(i)) return false;
            return true;
        };

                
        $scope.update = function(item) {
          //$state.go(edit/item);
          $state.go('app.edit',{id:item}); 
          console.log(item);
          $ionicListDelegate.closeOptionButtons();  // this closes swipe option buttons after alert
        
        };
        $scope.view = function(item) {
          //$state.go(edit/item);
          $state.go('app.detail',{id:item}); 
          console.log(item);
          $ionicListDelegate.closeOptionButtons();  // this closes swipe option buttons after alert
        
        };
    
         var currentUser= {};
         currentUser = sessionService.get("moduser");
        // console.log(currentUser.authKey);
         ListService.list({Authorization:currentUser.authKey}).then(
                    function(res) {
                    // console.log(res.data);
                     if(res.data.status=='fail'){
                        $scope.msg = res.data.msg;
                        console.log($scope.msg);
                     }else{

                         $scope.data = res.data.CaseNotes;
                           // $state.reload();   
                     }

        })
    }
});
