app.component("edit", {
    templateUrl: "js/components/edit/edit.html",
    controller: function($scope,$state,$ionicPopup,$ionicLoading,$cordovaSQLite,EditCasenoteService,NetworkService,sessionService,ionicDatePicker,UpdateRemoteService) {

        $scope.data = [];      
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
        if(typeof $cordovaSQLite != undefined){
                              $scope.data=[];
                              var query = "SELECT * FROM casenotes WHERE id="+$state.params.id;
                              $cordovaSQLite.execute(db, query).then(function(res) {
                                    console.log(res.rows.item(0).id);     
                                          $ionicLoading.hide();  
                                          $scope.data={
                                            id:res.rows.item(0).id,
                                            remote_id:res.rows.item(0).remote_id,
                                            user_id:res.rows.item(0).user_id,
                                            app_id:res.rows.item(0).app_id,
                                            court_name:res.rows.item(0).court_name,
                                            case_number:res.rows.item(0).case_number,
                                            first_party_name:res.rows.item(0).first_party_name,
                                            second_party_name:res.rows.item(0).second_party_name,
                                            case_stage:res.rows.item(0).case_stage,
                                            prev_date:res.rows.item(0).prev_date,
                                            next_date:res.rows.item(0).next_date,
                                            status:res.rows.item(0).status,
                                            created_at:res.rows.item(0).created_at,
                                            updated_at:res.rows.item(0).updated_at,
                                            created_by:res.rows.item(0).created_by,
                                            updated_by:res.rows.item(0).updated_by,
                                            is_on_remote:res.rows.item(0).is_on_remote
                                          };
                                         // console.log(details);
                                })
                            }      
        // EditCasenoteService.fetch({Authorization:currentUser.authKey,id: $state.params.id }).then(
        //     function(res) {
        //         if(res.data.status=='fail'){

        //         }else{
        //             $scope.data = res.data.CaseNotes;
        //            // console.log($scope.details);
        //         }               
        //     },
        //     function(error) {

        //         console.log(error);

        //     });

           $scope.login = function(frm) {
    //       console.log($scope.user); 
            // If Form Valid 
        if (frm.$valid) {
            //console.log($scope.data);

        $ionicLoading.show({
          template: '<ion-spinner icon="spiral" class="spinner-positive"></ion-spinner> <br>Loading...',
          noBackdrop: true,
          animation: 'fade-in'
        });      
//         UPDATE table_name SET court_name=$scope.data.court_name, case_number=$scope.data.case_number, first_party_name=$scope.data.first_party_name, second_party_name=$scope.data.second_party_name, case_stage=$scope.data.case_stage, prev_date=$scope.data.prev_date, next_date=$scope.data.next_date WHERE id=++$state.params.id;  
             if(typeof $cordovaSQLite != undefined){
                             // $scope.data=[];
                             console.log("id "+$state.params.id);
                              var query = "UPDATE casenotes SET court_name='"+$scope.data.court_name+"', case_number="+$scope.data.case_number+", first_party_name='"+$scope.data.first_party_name+"', second_party_name='"+$scope.data.second_party_name+"', case_stage='"+$scope.data.case_stage+"', prev_date='"+$scope.data.prev_date+"', next_date='"+$scope.data.next_date +"',is_on_remote=0 WHERE id="+$state.params.id;
                              console.log(query);
                              $cordovaSQLite.execute(db, query).then(function(res) {
                                  $ionicLoading.hide();
                                  if(navigator.connection.type != 'none'){
                                        UpdateRemoteService.update({Authorization:currentUser.authKey,data:$scope.data}).then(function(res){
                                          alert(res.data);
                                          console.log(res);

                                  })        
                                  }
                                  var alertPopup = $ionicPopup.alert({
                                       title: 'Success',
                                       template: 'Casenote Updated Successfully'
                                     });

                                    alertPopup.then(function(res) {
                                     $state.go('app.casenotes');  
                                    });     
                                },function (err) {
                                          console.error("eer"+ err.message);
                                        });
                            }


        // EditCasenoteService.update({Authorization:currentUser.authKey,data:$scope.data }).then(
        //     function(res) {
        //         if(res.data.status=='fail'){
                   
        //              console.log(res);
                
        //         }else{
        //               $ionicLoading.hide();
        //               $scope.msg = res.data.msg;
                       
        //                var alertPopup = $ionicPopup.alert({
        //                  title: 'Success',
        //                  template: $scope.msg
        //                });

        //               alertPopup.then(function(res) {
        //                $state.go('app.casenotes');  
        //               });
        //         }               
        //     },
        //     function(error) {

        //         console.log(error);

        //     });
           
        }; // login END 
      }
    }
});