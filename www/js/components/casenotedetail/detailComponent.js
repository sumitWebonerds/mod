app.component("casenoteDetails", {
   
    templateUrl: "js/components/casenotedetail/detail.html",
    controller: function($scope, $state,$ionicLoading,sessionService,CaseNoteDetailsService, IMG_BASE,$cordovaSocialSharing,$cordovaSQLite) {

        var self = this;
        $scope.title = $state.name;
        $scope.IMG_BASE = IMG_BASE;
        $scope.details = [];
        var currentUser= {};
        currentUser = sessionService.get("moduser");
        var rate = 2;
        $scope.share = function(first_party,second_party,caseno,courtname,casestage,prev_date,next_date) {
           var title = 'Shared By :'+currentUser.first_name+'\n First Party : '+first_party+'\n Second Party : '+second_party+'\n Case No. : '+caseno+'\n Court Name : '+courtname+'\n Case Stage : '+casestage+'\n Previous Date : '+prev_date+'\n Next Date : '+next_date;
           var image = IMG_BASE+ionic.png;
           var link = '\n www.myofficediary.org';
            $cordovaSocialSharing.share(title,'My Office Diary','', link).then(function(result) {
                console.log(JSON.parse(result));
            }, function(err) {
               console.log(err);
            });
        };
        $scope.isEmpty = function(obj) {
            for (var i in obj)
                if (obj.hasOwnProperty(i)) return false;
            return true;
        };
        
        $ionicLoading.show({
          template: '<ion-spinner icon="spiral" class="spinner-positive"></ion-spinner> <br>Loading...',
          noBackdrop: true,
          animation: 'fade-in'
        });     
        if(typeof $cordovaSQLite != undefined){
                              $scope.data=[];
                              var query = "SELECT * FROM casenotes WHERE id="+$state.params.id;
                              $cordovaSQLite.execute(db, query).then(function(res) {
                                    console.log(res.rows.item(0).id);     
                                          $ionicLoading.hide();  
                                          $scope.details={
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
        // CaseNoteDetailsService.find({Authorization:currentUser.authKey,id: $state.params.id }).then(
        //     function(res) {
        //         if(res.data.status=='fail'){

        //         }else{
        //             $ionicLoading.hide();
        //             $scope.details = res.data.CaseNotes;
        //         }    
        //     },
        //     function(error) {

        //         console.log(error);

        //     });
    }
});