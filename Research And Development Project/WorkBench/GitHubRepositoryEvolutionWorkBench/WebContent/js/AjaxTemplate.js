/**
 * 
 */

$(document).ready(function(){  
	//sends the object as a json string, retrieves a json object and performs actions based on input
	  $.ajax({
		  type : 'post',
		  url : 'http://localhost:8080/GitHubRepositoryEvolutionWorkBench/Service',
		  data : {
			action : "login"  
		  },
		  success : function(response) {

		  },
		  error: function() {
		            	
		  }
		 });
	  });

