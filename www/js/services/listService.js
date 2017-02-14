app.service("ListService",function($http,API_BASE){
	var user={};
		return {
			list:function(params){
				return $http({
					method:"post",
					url:API_BASE.toString()+"api/case-notes/list",
					data:params, 
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				});
			}


		}; 

});