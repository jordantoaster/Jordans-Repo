/**
 * 
 */

function performAjaxRequest(action, data, type, url, callback){  
	$.ajax({
	  type : type,
	  url : url,
	  data : {
	    action : action,
	    data : data
       },
	  success : function(response) {
		  //callback();
	  },
	  error: function() {
		            	
	  }
	 });
};

