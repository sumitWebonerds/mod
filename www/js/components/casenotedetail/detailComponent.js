app.component("casenoteDetails", {
   
    templateUrl: "js/components/casenotedetail/detail.html",
    controller: function($scope, $state, CasenoteDetailService, IMG_BASE) {

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

        CasenoteDetailService.find({ id: $state.params.id }).then(
            function(res) {
              
                $scope.details = res.data;
               
                
                
               
            },
            function(error) {

                console.log(error);

            });
    }
});