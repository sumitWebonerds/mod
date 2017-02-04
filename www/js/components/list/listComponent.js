app.component("list", {

    templateUrl: "js/components/list/list.html",

    controller: function($scope,$ionicListDelegate,ListService,sessionService) {
    
        $scope.data = [
          {
            previous_date:"31-01-2017",
            court_name:"ABC",
            court_no:"CC/12/333",
            name_of_party1:"XYZ",
            name_of_party2:"PQR",
            case_stage:"qweerrr",
            next_date:"02-02-2017",
          },
          {
            previous_date:"31-01-2017",
            court_name:"ABC",
            court_no:"CC/12/333",
            name_of_party1:"XYZ",
            name_of_party2:"PQR",
            case_stage:"qweerrr",
            next_date:"02-02-2017",
          }, 
          {
            previous_date:"31-01-2017",
            court_name:"ABC",
            court_no:"CC/12/333",
            name_of_party1:"XYZ",
            name_of_party2:"PQR",
            case_stage:"qweerrr",
            next_date:"02-02-2017",
          },
           {
            previous_date:"31-01-2017",
            court_name:"ABC",
            court_no:"CC/12/333",
            name_of_party1:"XYZ",
            name_of_party2:"PQR",
            case_stage:"qweerrr",
            next_date:"02-02-2017",
          }
        ];

        $scope.critical = function(item) {
        
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
         //console.log(currentUser.authKey);
         ListService.list(currentUser.authKey).then(
                    function(res) {


        })
    }
});
