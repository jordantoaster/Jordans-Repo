/**
 * 
 */

function performAjaxRequestGitHub(url, callback){  
	$.ajax({
	  dataType: 'JSON',
	  type : "GET",
	  url : url,
	  success : function(response) {
		  callback(response);
	  },
	  error: function() {
		            	
	  }
	 });
};

