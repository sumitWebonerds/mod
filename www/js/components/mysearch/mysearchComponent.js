app.component("mySearch", {
    templateUrl: "js/components/mysearch/mysearch.html",
    controller: function($scope) {
    
  


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
          previous_date:"26-01-2017",
          court_name:"XYZ",
          court_no:"AA/42/334",
          name_of_party1:"pqr",
          name_of_party2:"qwe",
          case_stage:"qwerty",
          next_date:"03-02-2017",
        }, 
        {
          previous_date:"31-01-2017",
          court_name:"sdsk",
          court_no:"CC/12/333",
          name_of_party1:"hjdsds",
          name_of_party2:"tyyuiue",
          case_stage:"hjkla",
          next_date:"04-02-2017",
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
      ]
      

     }
});
