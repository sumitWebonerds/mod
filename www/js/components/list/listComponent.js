app.component("list", {

    templateUrl: "js/components/list/list.html",

    controller: function($scope,$state,$ionicListDelegate,NetworkService,$ionicLoading,ListService,sessionService,UpdateRemoteService,$cordovaSQLite,ionicDatePicker,filterFilter) {
    
    function dateFormat(val)
    {
       var d = new Date(val);
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          var date = [year, month, day].join('-');
          return date; 
    }

    //$cordovaSQLite,
    $scope.selectedDate = dateFormat(new Date());
      $scope.prev_date = {
        callback: function (val) { 
         //Mandatory
         $scope.selectedDate = dateFormat(val);
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

    $scope.prev=function(){

      $today = new Date($scope.selectedDate);
      $yesterday = new Date($today);
      
          $scope.selectedDate=new Date($yesterday.setDate($today.getDate() - 1));
    }
    $scope.next=function(){

      $today = new Date($scope.selectedDate);
      $yesterday = new Date($today);
      
          $scope.selectedDate=new Date($yesterday.setDate($today.getDate() + 1));
    }
        $scope.data = [];
        $scope.sqlite = [];
        $scope.msg = [];
        $scope.dateValue = new Date();
        $scope.allSessions=[];     
        var currentUser= {};
        
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

          $state.go('app.detail',{id:item}); 
          console.log(item);
          $ionicListDelegate.closeOptionButtons();  // this closes swipe option buttons after alert
        
        };
        
        $scope.delete = function(item) {

          alert("id "+item)
          $ionicListDelegate.closeOptionButtons();  // this closes swipe option buttons after alert
        
        };
        
        currentUser = sessionService.get("moduser");
        if(currentUser=='none'){
         // navigator.connection.type
           $state.go('app.nointernet');

        }else{
          
          $ionicLoading.show({
            template: '<ion-spinner icon="spiral" class="spinner-positive"></ion-spinner> <br>Loading...',
            noBackdrop: true,
            animation: 'fade-in'
          });

          ListService.list({Authorization:currentUser.authKey}).then(function(res){
             if(res.data.status=='fail'){
                $scope.msg = res.data.msg;
                console.log($scope.msg);

             }else
            {
                $ionicLoading.hide();
                $scope.data = res.data.CaseNotes;

                $scope.sqlite = $scope.data;
                  if(typeof $cordovaSQLite != undefined){
                    for (var i = 0; i < $scope.sqlite.length; i++) {
                        if($scope.sqlite[i].sync == 0){
                          var query = "INSERT INTO casenotes (remote_id, user_id, app_id, court_name, case_number, first_party_name, second_party_name, case_stage, prev_date, next_date, status, created_at, updated_at, created_by, updated_by,is_on_remote) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                          $cordovaSQLite.execute(db, query, [$scope.sqlite[i].id,$scope.sqlite[i].user_id,$scope.sqlite[i].app_id,$scope.sqlite[i].court_name,$scope.sqlite[i].case_number,$scope.sqlite[i].first_party_name,$scope.sqlite[i].second_party_name,$scope.sqlite[i].case_stage,$scope.sqlite[i].prev_date,$scope.sqlite[i].next_date,$scope.sqlite[i].status,$scope.sqlite[i].sync,$scope.sqlite[i].created_at,$scope.sqlite[i].updated_at,$scope.sqlite[i].created_by,$scope.sqlite[i].updated_by]).then(function(res) {
                              console.log("INSERT ID -> " + res.insertId);

                                

                          }, function (err) {
                              console.error(err.message);
                          });
                        }
                      //
                    }

                    UpdateRemoteService.update({Authorization:currentUser.authKey,data:$scope.sqlite}).then(function(res){
                                console.log(res);
                    })

                            $scope.data1=[];
                              var query1 = "SELECT * FROM casenotes";
                              $cordovaSQLite.execute(db, query1).then(function(res) {
                                     //alert(res.rows.item().length)
                                  //alert(res.rows.length);
                                 for (var i = 0; i < res.rows.length; i++) {
                                   
                                 
                                  $scope.data1.push(res.rows.item(i));

                                  $scope.filteredDate = filterFilter($scope.data1, $scope.selectedDate);
                                }
                                         // console.log(details);
                                })

                  }          
 

                  
            }




          }); 
        
        } 

    }
})

.filter('currentDates', function() {

  return function(data1,date) {
    var data_date, filtered_list, i, today;
    filtered_list = [];
    i = 0;

    while (i < data1.length) { 
     //alert(data1.length);
      today = new Date(date);
//     alert(today);
      // alert(new Date(data[i].next_date));
      data_date = new Date(data1[i].next_date);
  //    alert("today->"+today+" date->"+data_date)
      if (today.getTime() == data_date.getTime()) {
 //       alert("hii");
        filtered_list.push(data1[i]);
      }
      i++;
    }
  //  alert(filtered_list);
    return filtered_list;
  };
});

