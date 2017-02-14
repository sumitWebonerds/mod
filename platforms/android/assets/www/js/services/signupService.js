app.service("SignupService",function($http,API_BASE){
	var user={};
		return {
			signup:function(params){
				return $http({
					method:"post",
					url:API_BASE.toString()+"api/user/register",
					data:params, 
            		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				});
			}


		}; 

});