app.service("CreateCasenoteService",function($http,API_BASE){
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
		}; 

});