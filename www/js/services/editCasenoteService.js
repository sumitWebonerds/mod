app.service("EditCasenoteService",function($http,API_BASE){
	var user={};
		return {
			create:function(params){
				return $http({
					method:"post",
					url:API_BASE.toString()+"api/case-notes/createnew",
					data:params, 
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				});
			},
			fetch:function(params){
				return $http({
					method:"post",
					url:API_BASE.toString()+"api/case-notes/viewnew",
					data:params, 
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				});
			},
			update:function(params){
				return $http({
					method:"post",
					url:API_BASE.toString()+"api/case-notes/updatenew",
					data:params, 
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				});
			}


		}; 

});