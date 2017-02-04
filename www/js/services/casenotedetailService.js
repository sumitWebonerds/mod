app.service("CaseNoteDetailsService",function($http,API_BASE){
		return {
			find:function(params){
				return $http({
					method:"get",
					url:API_BASE.toString()+"case-note/casenote-details",
					params:params

				});
			}


		}; 

});