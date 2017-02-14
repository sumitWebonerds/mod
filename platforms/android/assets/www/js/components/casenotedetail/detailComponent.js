app.component("casenoteDetails", {
   
    templateUrl: "js/components/casenotedetail/detail.html",
    controller: function($scope, $state,sessionService,CaseNoteDetailsService, IMG_BASE) {

        var self = this;
        $scope.title = $state.name;
        $scope.IMG_BASE = IMG_BASE;
        $scope.details = [];
        var rate = 2;
        $scope.isEmpty = function(obj) {
            for (var i in obj)
                if (obj.hasOwnProperty(i)) return false;
            return true;
        };
        var currentUser= {};
        currentUser = sessionService.get("moduser");

        CaseNoteDetailsService.find({Authorization:currentUser.authKey,id: $state.params.id }).then(
            function(res) {
                if(res.data.status=='fail'){

                }else{
                    $scope.details = res.data.CaseNotes;
                }
                
               
                
                
               
            },
            function(error) {

                console.log(error);

            });
    }
});