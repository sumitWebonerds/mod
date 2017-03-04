app.component("createCasenote", {
    templateUrl: "js/components/createcasenote/createcasenote.html",
    controller: function($scope,$state,$ionicPopup,$ionicLoading,CreateCasenoteService,sessionService,ionicDatePicker,$ionicHistory,$cordovaSQLite) {

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
      console.log(currentUser.id)
        $scope.casenote = function(frm) {
   
        if (frm.$valid) {
          $ionicLoading.show({
          template: '<ion-spinner icon="spiral" class="spinner-positive"></ion-spinner> <br>Loading...',
          noBackdrop: true,
          animation: 'fade-in'
        });     
        // console.log($scope.data.prev_date,$scope.data.court_name,$scope.data.case_number,$scope.data.first_party_name,$scope.data.second_party_name,$scope.data.case_stage,$scope.data.next_date);
        // if(typeof $cordovaSQLite != undefined){
        //     var query1 = "INSERT INTO casenotes (remote_id, user_id, app_id, court_name, case_number, first_party_name, second_party_name, case_stage, prev_date, next_date, status, created_at, updated_at, created_by, updated_by,is_on_remote) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";                                                       
        //                               //(remote_id, user_id, app_id, court_name, case_number, first_party_name, second_party_name, case_stage, prev_date, next_date, status, created_at, updated_at, created_by, updated_by) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9],[value-10],[value-11],[value-12],[value-13],[value-14],[value-15])
        //     $cordovaSQLite.execute(db, query1, [0,currentUser.id,0,$scope.data.court_name,$scope.data.case_number,$scope.data.first_party_name,$scope.data.second_party_name,$scope.data.case_stage,$scope.data.prev_date,$scope.data.next_date,1, "0000-00-00","NULL",currentUser.id, currentUser.id,0]).then(function(res) {
        //                                  console.log("");
        //                   $ionicLoading.hide();
        //                   $scope.msg = "Case Note Created";
                           
        //                    var alertPopup = $ionicPopup.alert({
        //                      title: 'Success',
        //                      template: $scope.msg
        //                    });
        //                     $state.reload();
        //                   alertPopup.then(function(res) {
        //                      $ionicHistory.nextViewOptions({
        //                         disableBack: true
        //                       });

        //                       $state.go('app.casenotes'); 
        //                                 }, function (err) {
        //                                   console.error("eer"+err);
        //                                 });
        //   })
        // }

        
        CreateCasenoteService.create({Authorization:currentUser.authKey,data:$scope.data}).then(
            function(res) {
                if(res.data.status=='fail'){
                   
                     console.log(res);
                
                }else{
                      $ionicLoading.hide();
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