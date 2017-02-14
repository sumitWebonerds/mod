app.service("LoginService",function($http,API_BASE){
	var user={};
		return {
			login:function(params){
				return $http({
					method:"post",
					url:API_BASE.toString()+"api/user/login",
					data:params, 
				});
			}


		}; 

});