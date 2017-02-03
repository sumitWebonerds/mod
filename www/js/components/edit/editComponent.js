app.component("edit", {
    templateUrl: "js/components/edit/edit.html",
    controller: function($scope,$ionicPopup) {

      $scope.data = [
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

     }
});
