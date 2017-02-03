app.service("ResetPasswordService",function($http,API_BASE){
	var user={};
		return {
			reset:function(params){
				return $http({
					method:"post",
					url:API_BASE.toString()+"api/user/reset",
					data:params, 
            		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				});
			}


		}; 

});