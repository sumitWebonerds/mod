app.service("CaseNoteDetailsService",function($http,API_BASE){
		return {
			find:function(params){
				return $http({
					method:"post",
					url:API_BASE.toString()+"api/case-notes/viewnew",
					data:params, 
            		headers: {'Content-Type': 'application/x-www-form-urlencoded'},

				});
			}


		}; 

});