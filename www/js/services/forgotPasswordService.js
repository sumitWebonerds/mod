app.service("ForgotPasswordService",function($http,API_BASE){
	var user={};
		return {
			forgot:function(params){
				return $http({
					method:"post",
					url:API_BASE.toString()+"api/user/forgot",
					data:params, 
            		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				});
			}


		}; 

});