/**
 * 
 */

var darwin = darwin || {};

darwin.serverModule = (function() {
    return {
    	send: function (action, callback, type, input) {
    		$.ajax({
    			  type : type,
    			  url : 'http://localhost:8080/GitHubRepositoryEvolutionWorkBench/Service',
    		      data : { 
    		      	action: action,
    		      	input: input,
    		      },
    			  success : function(response) {
    				  callback(response);
    			  },
    			  error: function() {
    			       	$('#ajaxGetUserServletResponse').text("An error occured when connecting to the Server");
    			      	$("#ajaxGetUserServletResponse").css({"opacity":"1"});	 
    			  }
    		 });
        }
    };
})();