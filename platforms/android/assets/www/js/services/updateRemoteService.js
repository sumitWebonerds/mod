app.service("UpdateRemoteService",function($http,API_BASE){
	var user={};
		return {
			update:function(params){
				return $http({
					method:"post",
					url:API_BASE.toString()+"api/sync/updatenew",
					data:params, 
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				});
			},
		}; 

});