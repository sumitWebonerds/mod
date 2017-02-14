app.component("createCasenote", {
    templateUrl: "js/components/createcasenote/createcasenote.html",
    controller: function($scope,$state,$ionicPopup,CreateCasenoteService,sessionService,ionicDatePicker,$ionicHistory) {

        $scope.data = {};      
         $scope.msg = [];    
      $scope.prev_date = {
        callback: function (val) { 
          var d = new Date(val);
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          var date = [year, month, day].join('-');

         //Mandatory
         $scope.data.prev_date = date;
       //   console.log('Return value from the datepicker popup is : '+ $scope.data.next_date);
        },
        disabledDates: false,
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'popup'       //Optional
      };

    $scope.openDatePicker1 = function(){
      ionicDatePicker.openDatePicker($scope.prev_date);
    };

    $scope.next_date = {
        callback: function (val) { 
          var d = new Date(val);
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          var date = [year, month, day].join('-');

         //Mandatory
         $scope.data.next_date = date;
       //   console.log('Return value from the datepicker popup is : '+ $scope.data.next_date);
        },
        disabledDates: false,
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'popup'       //Optional
      };

      $scope.openDatePicker2 = function(){
        ionicDatePicker.openDatePicker($scope.next_date);
      };
        
      var currentUser= {};
      currentUser = sessionService.get("moduser");

        $scope.casenote = function(frm) {
   
        if (frm.$valid) {
        console.log($scope.data);
        CreateCasenoteService.create({Authorization:currentUser.authKey,data:$scope.data}).then(
            function(res) {
                if(res.data.status=='fail'){
                   
                     console.log(res);
                
                }else{

                      $scope.msg = res.data.msg;
                       
                       var alertPopup = $ionicPopup.alert({
                         title: 'Success',
                         template: $scope.msg
                       });
                        $state.reload();
                      alertPopup.then(function(res) {
                         $ionicHistory.nextViewOptions({
                            disableBack: true
                          });

                          $state.go('app.casenotes');  
                      });
                }               
            },
            function(error) {

                console.log(error);

            });
           
        }; // login END 
      }
       

 
    }
});